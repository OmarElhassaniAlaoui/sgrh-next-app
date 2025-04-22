import {
  PrismaClient,
  LeaveRequest,
  LeaveType,
  LeaveStatus,
} from "../app/generated/prisma";
import { calculateWorkingDays } from "@/utils/date-utils";

const prisma = new PrismaClient();

export const LeaveService = {
  async getAllLeaveRequests() {
    try {
      return await prisma.leaveRequest.findMany({
        include: {
          employee: true,
          replacementEmployee: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } finally {
      await prisma.$disconnect();
    }
  },

  async getLeaveRequestById(id: string) {
    try {
      const leave = await prisma.leaveRequest.findUnique({
        where: { id },
        include: {
          employee: true,
          replacementEmployee: true,
        },
      });
      if (!leave) throw new Error("Leave request not found");
      return leave;
    } finally {
      await prisma.$disconnect();
    }
  },

  async getEmployeeLeaves(employeeId: string) {
    try {
      return await prisma.leaveRequest.findMany({
        where: { employeeId },
        include: {
          employee: true,
          replacementEmployee: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } finally {
      await prisma.$disconnect();
    }
  },

  async createLeaveRequest(data: {
    employeeId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    reason?: string;
    notes?: string;
    replacementId?: string;
  }) {
    try {
      const {
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
        notes,
        replacementId,
      } = data;

      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        throw new Error("Start date cannot be after end date");
      }

      // Calculate duration (excluding weekends)
      const duration = calculateWorkingDays(startDate, endDate);

      // Check leave balance
      const balance = await prisma.annualLeaveBalance.findUnique({
        where: { employeeId },
      });
      if (!balance) throw new Error("Leave balance not found for employee");

      if (leaveType === "ANNUAL") {
        const totalAvailable =
          balance.currentYearBalance + balance.previousYearBalance;
        if (duration > totalAvailable) {
          throw new Error("Insufficient annual leave balance");
        }
      } else if (leaveType === "SPECIAL_PERMISSION") {
        if (duration > balance.specialPermissions) {
          throw new Error("Insufficient special permission balance");
        }
      }

      // Create leave request
      const leave = await prisma.leaveRequest.create({
        data: {
          employeeId,
          leaveType,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          duration,
          status: "PENDING",
          reason,
          notes,
          replacementId,
        },
        include: {
          employee: true,
          replacementEmployee: true,
        },
      });

      return leave;
    } catch (error) {
      console.error("Error creating leave:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },

  async updateLeaveRequest(
    id: string,
    data: Partial<{
      leaveType: LeaveType;
      startDate: Date;
      endDate: Date;
      reason: string;
      notes: string;
      replacementId: string;
      status: LeaveStatus;
      approvedBy: string;
    }>
  ) {
    try {
      const { status, startDate, endDate, ...otherData } = data;

      // If updating dates, recalculate duration
      let duration = undefined;
      if (startDate && endDate) {
        if (new Date(startDate) > new Date(endDate)) {
          throw new Error("Start date cannot be after end date");
        }
        duration = calculateWorkingDays(startDate, endDate);
      }

      // If approving, update balance
      if (status === "APPROVED") {
        const leave = await prisma.leaveRequest.findUnique({
          where: { id },
          include: { employee: { include: { annualLeaveBalance: true } } },
        });
        if (!leave || !leave.employee.annualLeaveBalance) {
          throw new Error("Leave or balance not found");
        }

        if (leave.leaveType === "ANNUAL") {
          let remainingDuration = duration || leave.duration;
          let { previousYearBalance, currentYearBalance } =
            leave.employee.annualLeaveBalance;

          // Use previous year balance first
          if (remainingDuration <= previousYearBalance) {
            previousYearBalance -= remainingDuration;
            remainingDuration = 0;
          } else {
            remainingDuration -= previousYearBalance;
            previousYearBalance = 0;
            currentYearBalance -= remainingDuration;
          }

          await prisma.annualLeaveBalance.update({
            where: { employeeId: leave.employeeId },
            data: { previousYearBalance, currentYearBalance },
          });
        } else if (leave.leaveType === "SPECIAL_PERMISSION") {
          await prisma.annualLeaveBalance.update({
            where: { employeeId: leave.employeeId },
            data: {
              specialPermissions: { decrement: duration || leave.duration },
            },
          });
        }
      }

      const updatedLeave = await prisma.leaveRequest.update({
        where: { id },
        data: {
          ...otherData,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          duration,
          status,
          approvedBy: status === "APPROVED" ? data.approvedBy : undefined,
          approvedAt: status === "APPROVED" ? new Date() : undefined,
        },
        include: {
          employee: true,
          replacementEmployee: true,
        },
      });

      return updatedLeave;
    } catch (error) {
      console.error("Error updating leave:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },

  async deleteLeaveRequest(id: string) {
    try {
      await prisma.leaveRequest.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting leave:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};

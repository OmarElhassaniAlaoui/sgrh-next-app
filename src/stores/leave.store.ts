import { create } from "zustand";
import { LeaveRequest, LeaveStatus, LeaveType } from "@prisma/client";
import { calculateWorkingDays } from "@/utils/date-utils";

interface LeaveState {
  leaveRequests: LeaveRequest[];
  isLoading: boolean;
  error: string | null;
  fetchLeaveRequests: () => Promise<void>;
  createLeaveRequest: (leave: {
    employeeId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    reason?: string;
    notes?: string;
    replacementId?: string;
  }) => Promise<LeaveRequest>;
  updateLeaveStatus: (
    id: string,
    status: LeaveStatus,
    approvedBy?: string
  ) => Promise<LeaveRequest>;
  deleteLeaveRequest: (id: string) => Promise<void>;
  getEmployeeLeaves: (employeeId: string) => LeaveRequest[];
  calculateLeaveDuration: (startDate: Date, endDate: Date) => number;
  getDashboardStats: (
    filterType: "month" | "year" | "custom",
    startDate?: Date,
    endDate?: Date
  ) => {
    total: number;
    approved: number;
    rejected: number;
    cancelled: number;
    monthlyData: { month: string; count: number }[];
  };
}

export const useLeaveStore = create<LeaveState>()((set, get) => ({
  leaveRequests: [],
  isLoading: false,
  error: null,

  fetchLeaveRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/leaves");
      if (!response.ok) throw new Error("Failed to fetch leave requests");
      const leaves = await response.json();
      set({ leaveRequests: leaves, isLoading: false });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch leave requests";
      set({ error: message, isLoading: false });
    }
  },

  createLeaveRequest: async (leave) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create leave request");
      }

      const createdLeave = await response.json();
      set((state) => ({
        leaveRequests: [...state.leaveRequests, createdLeave],
        isLoading: false,
      }));

      return createdLeave;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create leave request";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  updateLeaveStatus: async (id, status, approvedBy) => {
    set({ isLoading: true, error: null });
    try {
      const updatedData: any = { status };
      if (status === "APPROVED" && approvedBy) {
        updatedData.approvedBy = approvedBy;
      }

      const response = await fetch(`/api/leaves/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update leave status");
      }

      const updatedLeave = await response.json();
      set((state) => ({
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === id ? updatedLeave : leave
        ),
        isLoading: false,
      }));

      return updatedLeave;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update leave status";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  deleteLeaveRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete leave request");
      }

      set((state) => ({
        leaveRequests: state.leaveRequests.filter((leave) => leave.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete leave request";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  getEmployeeLeaves: (employeeId) => {
    return get().leaveRequests.filter(
      (leave) => leave.employeeId === employeeId
    );
  },

  calculateLeaveDuration: (startDate, endDate) => {
    return calculateWorkingDays(startDate, endDate);
  },

  getDashboardStats: (filterType, startDate, endDate) => {
    const leaves = get().leaveRequests;
    let filteredLeaves = [...leaves];
    const now = new Date();

    if (filterType === "month") {
      filteredLeaves = leaves.filter((leave) => {
        const leaveDate = new Date(leave.createdAt);
        return (
          leaveDate.getMonth() === now.getMonth() &&
          leaveDate.getFullYear() === now.getFullYear()
        );
      });
    } else if (filterType === "year") {
      filteredLeaves = leaves.filter((leave) => {
        const leaveDate = new Date(leave.createdAt);
        return leaveDate.getFullYear() === now.getFullYear();
      });
    } else if (filterType === "custom" && startDate && endDate) {
      filteredLeaves = leaves.filter((leave) => {
        const leaveDate = new Date(leave.createdAt);
        return leaveDate >= startDate && leaveDate <= endDate;
      });
    }

    const total = filteredLeaves.length;
    const approved = filteredLeaves.filter(
      (leave) => leave.status === "APPROVED"
    ).length;
    const rejected = filteredLeaves.filter(
      (leave) => leave.status === "REJECTED"
    ).length;
    const cancelled = filteredLeaves.filter(
      (leave) => leave.status === "CANCELLED"
    ).length;

    const monthlyData: { month: string; count: number }[] = [];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      const monthLeaves = leaves.filter((leave) => {
        const leaveDate = new Date(leave.createdAt);
        return (
          leaveDate.getMonth() === i &&
          leaveDate.getFullYear() === now.getFullYear()
        );
      });
      monthlyData.push({ month: months[i], count: monthLeaves.length });
    }

    return { total, approved, rejected, cancelled, monthlyData };
  },
}));

import { create } from "zustand";
import { LeaveRequest, LeaveStatus } from "@prisma/client";

interface LeaveState {
  leaveRequests: LeaveRequest[];
  isLoading: boolean;
  error: string | null;
  fetchLeaveRequests: () => Promise<void>;
  createLeaveRequest: (
    leave: Omit<
      LeaveRequest,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "status"
      | "approvedById"
      | "approvedBy"
      | "approvedAt"
    >
  ) => Promise<LeaveRequest>;
  updateLeaveStatus: (
    id: string,
    status: LeaveStatus,
    approvedBy?: string
  ) => Promise<LeaveRequest>;
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
      const leaves = await fetch("/api/leaves").then((res) => res.json());
      set({ leaveRequests: leaves, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch leave requests", isLoading: false });
    }
  },

  createLeaveRequest: async (leave) => {
    set({ isLoading: true, error: null });
    try {
      const duration = get().calculateLeaveDuration(
        leave.startDate,
        leave.endDate
      );
      const newLeave = {
        ...leave,
        duration,
        status: "PENDING" as LeaveStatus,
      };

      const createdLeave = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeave),
      }).then((res) => res.json());

      set((state) => ({
        leaveRequests: [...state.leaveRequests, createdLeave],
        isLoading: false,
      }));

      return createdLeave;
    } catch (error) {
      set({ error: "Failed to create leave request", isLoading: false });
      throw error;
    }
  },

  updateLeaveStatus: async (id, status, approvedBy) => {
    set({ isLoading: true, error: null });
    try {
      const updatedData: any = { status };
      if (status === "APPROVED" && approvedBy) {
        updatedData.approvedBy = approvedBy;
        updatedData.approvedAt = new Date();
      }

      const updatedLeave = await fetch(`/api/leaves/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }).then((res) => res.json());

      set((state) => ({
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === id ? updatedLeave : leave
        ),
        isLoading: false,
      }));

      return updatedLeave;
    } catch (error) {
      set({ error: "Failed to update leave status", isLoading: false });
      throw error;
    }
  },

  getEmployeeLeaves: (employeeId) => {
    return get().leaveRequests.filter(
      (leave) => leave.employeeId === employeeId
    );
  },

  calculateLeaveDuration: (startDate, endDate) => {
    let duration = 0;
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) duration++;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return duration;
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

      monthlyData.push({
        month: months[i],
        count: monthLeaves.length,
      });
    }

    return { total, approved, rejected, cancelled, monthlyData };
  },
}));

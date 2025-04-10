// src/types/employee-types.ts
import {
  Employee as PrismaEmployee,
  LeaveRequest,
  AnnualLeaveBalance,
} from "@prisma/client";

// Base employee type extending Prisma model
export type Employee = PrismaEmployee & {
  leaveRequests?: LeaveRequest[];
  replacementFor?: LeaveRequest[];
  annualLeaveBalance?: AnnualLeaveBalance;
};

// Type for creating new employees (without auto-generated fields)
export type EmployeeCreateData = Omit<
  PrismaEmployee,
  "id" | "createdAt" | "updatedAt"
>;

// Type for updating employees (all fields optional except id)
export type EmployeeUpdateData = Partial<EmployeeCreateData>;

// Filter type for employee searches
export type EmployeeFilters = {
  grade?: string;
  division?: string;
  service?: string;
  ladder?: string;
};

// Type for employee search results
export type EmployeeSearchResult = Pick<
  Employee,
  "id" | "firstName" | "lastName" | "cin" | "ppr" | "grade" | "division"
>;

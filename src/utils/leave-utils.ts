import { LeaveRequest, LeaveType as PrismaLeaveType } from "../../src/app/generated/prisma";

/**
 * Get a user-friendly name for a leave type
 */
export const getLeaveTypeName = (type: PrismaLeaveType): string => {
  const leaveTypes = {
    ANNUAL: "Congé annuel",
    SPECIAL_PERMISSION: "Permission Spéciale",
    SICK: "Congé de Maladie",
    MATERNITY: "Congé de Maternité",
    HAJJ: "Congé du pèlerinage",
    MARRIAGE: "Congé de Marriage",
    BEREAVEMENT: "Décès d'un proche",
  };

  return leaveTypes[type] || type;
};

/**
 * Calculate the remaining leave balance for an employee
 */
export const calculateRemainingLeave = (
  currentYearBalance: number,
  previousYearBalance: number,
  specialPermissions: number,
  usedLeaves: LeaveRequest[]
): { annual: number; previousYear: number; special: number } => {
  // Filter annual leaves for the current year
  const usedAnnual = usedLeaves
    .filter(
      (leave) => leave.leaveType === "ANNUAL" && leave.status === "APPROVED"
    )
    .reduce((total, leave) => total + leave.duration, 0);

  // Filter special permissions
  const usedSpecial = usedLeaves
    .filter(
      (leave) =>
        leave.leaveType === "SPECIAL_PERMISSION" && leave.status === "APPROVED"
    )
    .reduce((total, leave) => total + leave.duration, 0);

  // Always use previous year balance first
  let remainingPreviousYear = previousYearBalance;
  let remainingAnnual = currentYearBalance;

  if (usedAnnual <= previousYearBalance) {
    remainingPreviousYear = previousYearBalance - usedAnnual;
  } else {
    remainingPreviousYear = 0;
    remainingAnnual = currentYearBalance - (usedAnnual - previousYearBalance);
  }

  return {
    annual: Math.max(0, remainingAnnual),
    previousYear: Math.max(0, remainingPreviousYear),
    special: Math.max(0, specialPermissions - usedSpecial),
  };
};

// Form-specific leave type (for the UI form)
export type FormLeaveType =
  | "annual"
  | "special"
  | "sick"
  | "maternity"
  | "hajj"
  | "marriage"
  | "bereavement";

// Map for leave type translation (for the form)
export const leaveTypeMap: Record<FormLeaveType, string> = {
  annual: 'Congé annuel',
  special: 'Permission Spéciale',
  sick: 'Congé de Maladie',
  maternity: 'Congé de Maternité',
  hajj: 'Congé du pèlerinage',
  marriage: 'Congé de Marriage',
  bereavement: 'Décès d\'un proche',
};

// Get leave type label for the form
export const getLeaveTypeLabel = (type: FormLeaveType): string => {
  return leaveTypeMap[type] || type;
};

// Get leave types as options for select inputs
export const getLeaveTypeOptions = (): { value: FormLeaveType; label: string }[] => {
  return Object.entries(leaveTypeMap).map(([value, label]) => ({
    value: value as FormLeaveType,
    label,
  }));
};

// Calculate how much leave an employee has taken in a year (for the form)
export const calculateLeaveTaken = (
  leaveHistory: { duration: number; type: FormLeaveType }[],
  leaveType: FormLeaveType = 'annual'
): number => {
  return leaveHistory
    .filter((leave) => leave.type === leaveType)
    .reduce((total, leave) => total + leave.duration, 0);
};

// Calculate remaining leave balance (for the form)
export const calculateLeaveBalance = (
  totalAllowance: number,
  leaveHistory: { duration: number; type: FormLeaveType }[]
): number => {
  const leaveTaken = calculateLeaveTaken(leaveHistory);
  return Math.max(0, totalAllowance - leaveTaken);
};

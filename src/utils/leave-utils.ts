import { LeaveRequest, LeaveType } from "@prisma/client";

/**
 * Get a user-friendly name for a leave type
 */
export const getLeaveTypeName = (type: LeaveType): string => {
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

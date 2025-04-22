// Form-specific leave type for the UI form
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
// utils/date-utils.ts
import { format, differenceInDays, addDays, isWeekend } from "date-fns";

/**
 * Format a date to display format (e.g., "Jan 15, 2023")
 */
export const formatDate = (date: Date | string): string => {
  return format(new Date(date), "MMM dd, yyyy");
};

/**
 * Format a date to ISO format for inputs (e.g., "2023-01-15")
 */
export const formatDateForInput = (date: Date | string): string => {
  return format(new Date(date), "yyyy-MM-dd");
};

/**
 * Calculate the number of working days between two dates (excluding weekends)
 */
export const calculateWorkingDays = (
  startDate: Date | string,
  endDate: Date | string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let workingDays = 0;
  let currentDate = new Date(start);

  while (currentDate <= end) {
    if (!isWeekend(currentDate)) {
      workingDays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return workingDays;
};

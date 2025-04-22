// utils/date-utils.ts
import { addDays, format, isWeekend, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Format a date to display format (e.g., "Jan 15, 2023")
 * If includeTime is true, it will include the time (e.g., "Jan 15, 2023 14:30")
 */
export const formatDate = (date: string | Date, includeTime: boolean = false): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return includeTime 
    ? format(dateObj, 'dd/MM/yyyy HH:mm') 
    : format(dateObj, 'dd/MM/yyyy');
};

/**
 * Format a date to ISO format for inputs (e.g., "2023-01-15")
 */
export const formatDateForInput = (date: Date | string): string => {
  return format(new Date(date), "yyyy-MM-dd");
};

/**
 * Format a date to display format (e.g., "15 January 2023")
 */
export const formatDateLong = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd MMMM yyyy', { locale: fr });
};

/**
 * Parse a date from ISO format (e.g., "2023-01-15")
 */
export const parseISODate = (date: string): Date => {
  if (!date) return new Date();
  return parse(date, 'yyyy-MM-dd', new Date());
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

/**
 * Calculate leave duration excluding weekends
 */
export const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Skip Saturday (6) and Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    currentDate = addDays(currentDate, 1);
  }
  
  return count;
};

/**
 * Calculate the return date (end date + 1 business day)
 */
export const calculateReturnDate = (endDate: Date): Date => {
  let returnDate = addDays(endDate, 1);
  
  // If return date is a weekend, move to Monday
  while (isWeekend(returnDate)) {
    returnDate = addDays(returnDate, 1);
  }
  
  return returnDate;
};

/**
 * Get the month name in French
 */
export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return format(date, 'MMMM', { locale: fr });
};

/**
 * Convert a date to yyyy-MM-dd format
 */
export const toISODateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

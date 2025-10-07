/**
 * Date preset utilities for date range filtering
 * Pure utility functions with no side effects
 */

export type DatePreset = "thisMonth" | "lastMonth" | "thisYear" | "custom";

export interface DateRangeWithPreset {
  from: Date;
  to: Date;
  preset: DatePreset;
}

/**
 * Get the first day of the current month and today
 */
export function getThisMonth(): DateRangeWithPreset {
  const now = new Date();
  return {
    from: new Date(now.getFullYear(), now.getMonth(), 1),
    to: new Date(),
    preset: "thisMonth",
  };
}

/**
 * Get the first and last day of the previous month
 */
export function getLastMonth(): DateRangeWithPreset {
  const now = new Date();
  return {
    from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
    to: new Date(now.getFullYear(), now.getMonth(), 0), // Last day of previous month
    preset: "lastMonth",
  };
}

/**
 * Get the first day of the current year and today
 */
export function getThisYear(): DateRangeWithPreset {
  const now = new Date();
  return {
    from: new Date(now.getFullYear(), 0, 1),
    to: new Date(),
    preset: "thisYear",
  };
}

/**
 * Get a date range for the last N months (inclusive of current month)
 * Used for trend charts
 */
export function getLastNMonths(months: number): { from: Date; to: Date } {
  const now = new Date();
  return {
    from: new Date(now.getFullYear(), now.getMonth() - (months - 1), 1), // First day of N-1 months ago
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0), // Last day of current month
  };
}

/**
 * Create a custom date range with preset type
 */
export function createCustomRange(from: Date, to: Date): DateRangeWithPreset {
  return {
    from,
    to,
    preset: "custom",
  };
}

/**
 * All date presets as an object for easy access
 */
export const datePresets = {
  thisMonth: getThisMonth,
  lastMonth: getLastMonth,
  thisYear: getThisYear,
} as const;

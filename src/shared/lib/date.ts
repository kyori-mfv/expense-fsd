import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

// Cache to prevent unnecessary object recreation and re-renders
let cachedMonthRange: DateRange | null = null;
let cachedMonthKey: string | null = null;

/**
 * Get the start and end dates for the current month
 * Returns the same object reference when still in the same month to prevent unnecessary re-renders
 */
export function getCurrentMonthRange(): DateRange {
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth()}`;

  // Return cached value if we're still in the same month
  if (cachedMonthKey === monthKey && cachedMonthRange) {
    return cachedMonthRange;
  }

  // Create new range for new month
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  cachedMonthRange = { from, to };
  cachedMonthKey = monthKey;

  return cachedMonthRange;
}

/**
 * Format date range for display
 * Pure utility function - no business logic
 *
 * @param dateRange - Date range to format
 * @param placeholder - Placeholder text if no date
 * @returns Formatted date range string
 *
 * Examples:
 * - No dates: "Chọn khoảng ngày"
 * - Single date: "15/01/2024"
 * - Date range: "15/01/2024 - 20/01/2024"
 */
export function formatDateRange(dateRange: DateRange | undefined, placeholder: string): string {
  if (!dateRange?.from) return placeholder;

  const fromFormatted = format(dateRange.from, "dd/MM/yyyy", { locale: vi });

  if (dateRange.to && dateRange.to.getTime() !== dateRange.from.getTime()) {
    const toFormatted = format(dateRange.to, "dd/MM/yyyy", { locale: vi });
    return `${fromFormatted} - ${toFormatted}`;
  }

  return fromFormatted;
}

/**
 * Format a single date for display
 * Pure utility function
 *
 * @param date - Date string (ISO format) to format
 * @returns Formatted date string or null
 */
export function formatDateString(date: string | undefined): string | null {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy", { locale: vi });
}

// ============================================================================
// Date Presets
// ============================================================================

/**
 * Date preset types for filtering
 */
export type DatePreset = "thisMonth" | "lastMonth" | "thisYear" | "custom";

/**
 * Date range with associated preset type
 */
export interface DateRangeWithPreset {
  from: Date;
  to: Date;
  preset: DatePreset;
}

/**
 * Get the first day of the current month and today
 *
 * @returns Date range for this month with preset type
 *
 * @example
 * const range = getThisMonth();
 * // { from: 2024-01-01, to: 2024-01-26, preset: 'thisMonth' }
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
 *
 * @returns Date range for last month with preset type
 *
 * @example
 * const range = getLastMonth();
 * // { from: 2023-12-01, to: 2023-12-31, preset: 'lastMonth' }
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
 *
 * @returns Date range for this year with preset type
 *
 * @example
 * const range = getThisYear();
 * // { from: 2024-01-01, to: 2024-01-26, preset: 'thisYear' }
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
 * Used for trend charts and analytics
 *
 * @param months - Number of months to include
 * @returns Date range covering N months
 *
 * @example
 * const range = getLastNMonths(6);
 * // { from: 2023-08-01, to: 2024-01-31 }
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
 *
 * @param from - Start date
 * @param to - End date
 * @returns Date range with custom preset type
 *
 * @example
 * const range = createCustomRange(new Date('2024-01-15'), new Date('2024-01-20'));
 * // { from: 2024-01-15, to: 2024-01-20, preset: 'custom' }
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
 *
 * @example
 * const thisMonthRange = datePresets.thisMonth();
 * const lastMonthRange = datePresets.lastMonth();
 */
export const datePresets = {
  thisMonth: getThisMonth,
  lastMonth: getLastMonth,
  thisYear: getThisYear,
} as const;

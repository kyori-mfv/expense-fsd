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

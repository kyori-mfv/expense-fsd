/**
 * Number and date formatting utilities
 * Pure functions with no side effects
 */

/**
 * Format number with Vietnamese locale
 *
 * @param num - Number to format
 * @returns Formatted number string with thousand separators
 *
 * @example
 * formatNumber(1234);      // "1.234"
 * formatNumber(1234567);   // "1.234.567"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("vi-VN").format(num);
}

/**
 * Format date with Vietnamese locale
 *
 * @param date - Date to format (Date object or ISO string)
 * @param format - Format style ('short' or 'long')
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date('2024-01-15'), 'short');  // "15/01/2024"
 * formatDate(new Date('2024-01-15'), 'long');   // "15 tháng 1, 2024"
 */
export function formatDate(date: Date | string, format: "short" | "long" = "short"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (format === "long") {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}

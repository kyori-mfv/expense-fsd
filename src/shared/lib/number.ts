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

/**
 * Format number input with thousand separators for user input
 * Only keeps digits and formats with commas
 *
 * @param value - String value from input field
 * @returns Formatted string with thousand separators
 *
 * @example
 * formatNumberInput("100");      // "100"
 * formatNumberInput("1000");     // "1,000"
 * formatNumberInput("10000");    // "10,000"
 * formatNumberInput("1,000");    // "1,000" (already formatted)
 * formatNumberInput("abc123");   // "123"
 */
export function formatNumberInput(value: string): string {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, "");

  // Return empty string if no digits
  if (!digitsOnly) {
    return "";
  }

  // Convert to number and format with commas
  const number = Number.parseInt(digitsOnly, 10);
  return number.toLocaleString("en-US");
}

/**
 * Parse formatted number string back to raw number
 * Removes all separators and converts to number
 *
 * @param value - Formatted string with separators
 * @returns Parsed number
 *
 * @example
 * parseNumberInput("100");       // 100
 * parseNumberInput("1,000");     // 1000
 * parseNumberInput("10,000");    // 10000
 * parseNumberInput("");          // 0
 */
export function parseNumberInput(value: string): number {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, "");

  // Return 0 if no digits
  if (!digitsOnly) {
    return 0;
  }

  return Number.parseInt(digitsOnly, 10);
}

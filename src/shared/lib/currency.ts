/**
 * Currency formatting utilities
 * Pure functions for Vietnamese Dong (VND) formatting
 */

/**
 * Format amount as Vietnamese currency
 *
 * @param amount - Amount to format
 * @param locale - Locale string (default: vi-VN)
 * @returns Formatted currency string
 *
 * @example
 * formatAmount(50000);        // "₫50.000"
 * formatAmount(1000000);      // "₫1.000.000"
 * formatAmount(50000, 'en-US'); // "$50,000.00"
 */
export function formatAmount(amount: number, locale = "vi-VN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

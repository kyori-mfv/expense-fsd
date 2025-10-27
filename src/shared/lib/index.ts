/**
 * Shared library utilities - Public API
 * Re-exports all utility functions for convenient imports
 */

// Currency formatting
export { formatAmount } from "./currency";

// Number and date formatting
export { formatNumber, formatDate, formatNumberInput, parseNumberInput } from "./number";

// Class name utilities
export { cn } from "./class-names";

// ID generation
export { generateUUID } from "./generator";

// Date utilities
export {
  getCurrentMonthRange,
  formatDateRange,
  formatDateString,
  getThisMonth,
  getLastMonth,
  getThisYear,
  getLastNMonths,
  createCustomRange,
  datePresets,
  type DatePreset,
  type DateRangeWithPreset,
} from "./date";

// Statistics
export {
  calculateFinancialStats,
  calculateExpenseCategoryStats,
  calculateIncomeCategoryStats,
  calculateMonthlyTrends,
  type FinancialStats,
  type CategoryStats,
  type MonthlyStats,
} from "./stats";

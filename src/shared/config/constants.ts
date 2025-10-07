/**
 * Application-wide constants
 */

export const DISPLAY_LIMITS = {
  RECENT_ITEMS: 5,
  ITEMS_PER_PAGE: 5,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  EXPENSE_LIST_PAGE_SIZE: 5,
  INCOME_LIST_PAGE_SIZE: 5,
} as const;

export const STORAGE_KEYS = {
  API_KEY: "gemini-api-key",
  THEME: "theme-preference",
} as const;

export const API_ENDPOINTS = {
  GEMINI_API_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
} as const;

import type { ExpenseRecord } from "@/shared/contract";
import { useLiveQuery } from "dexie-react-hooks";
import { expenseService } from "../api/expense.service";

interface ExpenseQueryParams {
  category?: string;
  dateFrom: Date;
  dateTo: Date;
  searchText?: string;
}

interface ExpenseListParams extends ExpenseQueryParams {
  page: number;
  limit: number;
}

interface ExpenseListResult {
  items: ExpenseRecord[];
  total: number;
}

/**
 * Expense query hooks at entity level
 */

export function useRecentExpenses(limit = 5): ExpenseRecord[] {
  return useLiveQuery(() => expenseService.getRecent(limit), [limit]) ?? [];
}

// Query all expenses (no pagination)
export function useExpensesAll({
  category,
  dateFrom,
  dateTo,
  searchText,
}: ExpenseQueryParams): ExpenseRecord[] {
  return (
    useLiveQuery(
      () =>
        expenseService.queryExpensesAll({
          category,
          dateFrom,
          dateTo,
          searchText,
        }),
      [category, dateFrom, dateTo, searchText]
    ) ?? []
  );
}

// Query expenses with pagination
export function useExpenseListData({
  category,
  dateFrom,
  dateTo,
  searchText,
  page,
  limit,
}: ExpenseListParams): ExpenseListResult {
  return (
    useLiveQuery(
      () =>
        expenseService.queryExpensesPaginated({
          category,
          dateFrom,
          dateTo,
          searchText,
          page,
          limit,
        }),
      [category, dateFrom, dateTo, searchText, page, limit]
    ) ?? { items: [], total: 0 }
  );
}

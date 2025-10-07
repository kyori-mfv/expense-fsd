import type { ExpenseRecord } from "@/shared/types";
import { useLiveQuery } from "dexie-react-hooks";
import { expenseService } from "../api/expense.service";

interface ExpenseListParams {
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchText?: string;
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
        expenseService.queryExpenses({
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

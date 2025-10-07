import { expenseService } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/types";
import { useLiveQuery } from "dexie-react-hooks";

/**
 * Widget-specific data fetching hook
 * Combines filtering, pagination, and search for expense list
 */

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

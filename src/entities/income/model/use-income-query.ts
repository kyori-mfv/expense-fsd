import type { IncomeRecord } from "@/shared/types";
import { useLiveQuery } from "dexie-react-hooks";
import { incomeService } from "../api/income.service";

interface IncomeQueryParams {
  category?: string;
  dateFrom: Date;
  dateTo: Date;
  searchText?: string;
}

interface IncomeListParams extends IncomeQueryParams {
  page: number;
  limit: number;
}

interface IncomeListResult {
  items: IncomeRecord[];
  total: number;
}

/**
 * Income query hooks at entity level
 */

export function useRecentIncomes(limit = 5): IncomeRecord[] {
  return useLiveQuery(() => incomeService.getRecent(limit), [limit]) ?? [];
}

// Query all incomes (no pagination)
export function useIncomesAll({
  category,
  dateFrom,
  dateTo,
  searchText,
}: IncomeQueryParams): IncomeRecord[] {
  return (
    useLiveQuery(
      () =>
        incomeService.queryIncomesAll({
          category,
          dateFrom,
          dateTo,
          searchText,
        }),
      [category, dateFrom, dateTo, searchText]
    ) ?? []
  );
}

// Query incomes with pagination
export function useIncomeListData({
  category,
  dateFrom,
  dateTo,
  searchText,
  page,
  limit,
}: IncomeListParams): IncomeListResult {
  return (
    useLiveQuery(
      () =>
        incomeService.queryIncomesPaginated({
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

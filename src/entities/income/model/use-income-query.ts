import type { IncomeRecord } from "@/shared/types";
import { useLiveQuery } from "dexie-react-hooks";
import { incomeService } from "../api/income.service";

interface IncomeListParams {
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchText?: string;
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
        incomeService.queryIncomes({
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

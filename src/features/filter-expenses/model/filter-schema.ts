import { getCurrentMonthRange } from "@/shared/lib/date";
import type { DateRange } from "react-day-picker";

export interface ExpenseFilterValues {
  search: string;
  category: string;
  dateRange: DateRange | undefined;
}

export const DEFAULT_FILTER_VALUES: ExpenseFilterValues = {
  search: "",
  category: "all",
  dateRange: getCurrentMonthRange(),
};

export const SEARCH_DEBOUNCE_MS = 300;

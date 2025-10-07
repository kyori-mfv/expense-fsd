import { getCurrentMonthRange } from "@/shared/lib/date-utils";
import type { DateRange } from "react-day-picker";

export interface IncomeFilterValues {
  search: string;
  category: string;
  dateRange: DateRange | undefined;
}

export const DEFAULT_FILTER_VALUES: IncomeFilterValues = {
  search: "",
  category: "all",
  dateRange: getCurrentMonthRange(),
};

export const SEARCH_DEBOUNCE_MS = 300;

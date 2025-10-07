import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import {
  DEFAULT_FILTER_VALUES,
  type IncomeFilterValues,
  SEARCH_DEBOUNCE_MS,
} from "./filter-schema";

export function useIncomeFilter() {
  const form = useForm<IncomeFilterValues>({
    defaultValues: DEFAULT_FILTER_VALUES,
  });

  const searchValue = form.watch("search");
  const categoryValue = form.watch("category");
  const dateRangeValue = form.watch("dateRange");

  const [debouncedSearch] = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);

  const handleReset = () => {
    form.reset(DEFAULT_FILTER_VALUES);
  };

  return {
    form,
    filters: {
      search: searchValue,
      category: categoryValue,
      dateRange: dateRangeValue,
    },
    debouncedSearch,
    handleReset,
  };
}

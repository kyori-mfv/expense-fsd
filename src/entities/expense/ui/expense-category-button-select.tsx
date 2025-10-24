import { IonicCategoryButtonSelect } from "@/shared/composite";
import { EXPENSE_CATEGORIES } from "@/shared/config";

interface ExpenseCategoryButtonSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  includeAllOption?: boolean;
  className?: string;
}

/**
 * ExpenseCategoryButtonSelect - Button-style category selector for expense filters
 *
 * Displays as an outline button (matching DateRangePicker style) that opens
 * an action sheet for category selection.
 *
 * Use this in filter forms where button-style inputs are preferred.
 * For form inputs with floating labels, use ExpenseCategorySelect instead.
 */
export function ExpenseCategoryButtonSelect(props: ExpenseCategoryButtonSelectProps) {
  return <IonicCategoryButtonSelect {...props} categories={EXPENSE_CATEGORIES} />;
}

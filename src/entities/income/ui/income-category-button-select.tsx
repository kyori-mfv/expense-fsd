import { CategoryButtonSelect } from "@/shared/composite";
import { INCOME_CATEGORIES } from "@/shared/config";

interface IncomeCategoryButtonSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  includeAllOption?: boolean;
  className?: string;
}

/**
 * IncomeCategoryButtonSelect - Button-style category selector for income filters
 *
 * Displays as an outline button (matching DateRangePicker style) that opens
 * an action sheet for category selection.
 *
 * Use this in filter forms where button-style inputs are preferred.
 * For form inputs with floating labels, use IncomeCategorySelect instead.
 */
export function IncomeCategoryButtonSelect(props: IncomeCategoryButtonSelectProps) {
  return <CategoryButtonSelect {...props} categories={INCOME_CATEGORIES} />;
}

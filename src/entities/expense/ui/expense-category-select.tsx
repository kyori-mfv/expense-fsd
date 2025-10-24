import { CategorySelect } from "@/shared/composite";
import { EXPENSE_CATEGORIES } from "@/shared/config";

interface ExpenseCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  includeAllOption?: boolean;
  label?: string;
}

export function ExpenseCategorySelect({
  label = "Danh mục",
  ...props
}: ExpenseCategorySelectProps) {
  return <CategorySelect {...props} label={label} categories={EXPENSE_CATEGORIES} />;
}

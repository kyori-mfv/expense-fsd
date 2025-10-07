import { CategorySelect } from "@/shared/components/category-select";
import { EXPENSE_CATEGORIES } from "@/shared/config/categories";

interface ExpenseCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  showIcons?: boolean;
  includeAllOption?: boolean;
  className?: string;
}

export function ExpenseCategorySelect(props: ExpenseCategorySelectProps) {
  return <CategorySelect {...props} categories={EXPENSE_CATEGORIES} />;
}

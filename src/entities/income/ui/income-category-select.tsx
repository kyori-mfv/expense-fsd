import { CategorySelect } from "@/shared/composite";
import { INCOME_CATEGORIES } from "@/shared/config";

interface IncomeCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  showIcons?: boolean;
  includeAllOption?: boolean;
  className?: string;
}

export function IncomeCategorySelect(props: IncomeCategorySelectProps) {
  return <CategorySelect {...props} categories={INCOME_CATEGORIES} />;
}

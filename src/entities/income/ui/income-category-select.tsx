import { IonicCategorySelect } from "@/shared/composite";
import { INCOME_CATEGORIES } from "@/shared/config";

interface IncomeCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  includeAllOption?: boolean;
  label?: string;
}

export function IncomeCategorySelect({ label = "Danh mục", ...props }: IncomeCategorySelectProps) {
  return <IonicCategorySelect {...props} label={label} categories={INCOME_CATEGORIES} />;
}

import { CategoryBadge } from "@/shared/composite";
import { EXPENSE_CATEGORIES } from "@/shared/config";

interface ExpenseCategoryBadgeProps {
  categoryName: string;
  iconSize?: number;
  color?: string;
  className?: string;
}

export function ExpenseCategoryBadge(props: ExpenseCategoryBadgeProps) {
  return <CategoryBadge {...props} categories={EXPENSE_CATEGORIES} />;
}

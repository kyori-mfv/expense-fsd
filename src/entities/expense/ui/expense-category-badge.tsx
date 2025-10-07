import { CategoryBadge } from "@/shared/components/category-badge";
import { EXPENSE_CATEGORIES } from "@/shared/config/categories";
import type { badgeVariants } from "@/shared/ui/badge";
import type { VariantProps } from "class-variance-authority";

interface ExpenseCategoryBadgeProps {
  categoryName: string;
  iconSize?: number;
  variant?: VariantProps<typeof badgeVariants>["variant"];
  className?: string;
}

export function ExpenseCategoryBadge(props: ExpenseCategoryBadgeProps) {
  return <CategoryBadge {...props} categories={EXPENSE_CATEGORIES} />;
}

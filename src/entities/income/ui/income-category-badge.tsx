import { CategoryBadge } from "@/shared/composite";
import { INCOME_CATEGORIES } from "@/shared/config";

interface IncomeCategoryBadgeProps {
  categoryName: string;
  iconSize?: number;
  color?: string;
  className?: string;
}

export function IncomeCategoryBadge(props: IncomeCategoryBadgeProps) {
  return <CategoryBadge {...props} categories={INCOME_CATEGORIES} />;
}

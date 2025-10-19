import { CategoryBadge } from "@/shared/composite";
import { INCOME_CATEGORIES } from "@/shared/config";
import type { badgeVariants } from "@/shared/ui/badge";
import type { VariantProps } from "class-variance-authority";

interface IncomeCategoryBadgeProps {
  categoryName: string;
  iconSize?: number;
  variant?: VariantProps<typeof badgeVariants>["variant"];
  className?: string;
}

export function IncomeCategoryBadge(props: IncomeCategoryBadgeProps) {
  return <CategoryBadge {...props} categories={INCOME_CATEGORIES} />;
}

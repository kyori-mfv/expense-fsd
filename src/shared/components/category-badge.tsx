import { CategoryIcon } from "@/shared/components/category-icon";
import { Badge, type badgeVariants } from "@/shared/ui/badge";
import type { VariantProps } from "class-variance-authority";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryBadgeProps {
  categoryName: string;
  categories: readonly CategoryItem[];
  iconSize?: number;
  variant?: VariantProps<typeof badgeVariants>["variant"];
  className?: string;
}

export function CategoryBadge({
  categoryName,
  categories,
  iconSize = 12,
  variant = "default",
  className = "text-xs px-2 py-0.5",
}: CategoryBadgeProps) {
  const category = categories.find((cat) => cat.name === categoryName);

  return (
    <Badge variant={variant} className={className}>
      <CategoryIcon iconName={category?.icon ?? ""} size={iconSize} />
      {categoryName}
    </Badge>
  );
}

import { CategoryIcon } from "@/shared/composite/category-icon";
import { IonBadge } from "@ionic/react";

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
  color?: string;
  className?: string;
}

export function CategoryBadge({
  categoryName,
  categories,
  iconSize = 12,
  color = "primary",
  className = "",
}: CategoryBadgeProps) {
  const category = categories.find((cat) => cat.name === categoryName);

  return (
    <IonBadge
      color={color}
      className={`inline-flex h-6 items-center shrink-0 gap-1 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap w-auto ${className}`}
    >
      <CategoryIcon iconName={category?.icon ?? ""} size={iconSize} />
      <span>{categoryName}</span>
    </IonBadge>
  );
}

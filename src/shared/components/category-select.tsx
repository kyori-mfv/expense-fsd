import { CategoryIcon } from "@/shared/components/category-icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: readonly CategoryItem[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  showIcons?: boolean;
  includeAllOption?: boolean;
  className?: string;
}

export function CategorySelect({
  value,
  onValueChange,
  categories,
  disabled = false,
  required = false,
  placeholder = "Chọn danh mục",
  showIcons = false,
  includeAllOption = false,
  className = "w-full",
}: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled} required={required}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAllOption && <SelectItem value="all">Tất cả danh mục</SelectItem>}
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.name}>
            {showIcons ? (
              <div className="flex items-center gap-2">
                <CategoryIcon iconName={cat.icon} size={16} />
                <span>{cat.name}</span>
              </div>
            ) : (
              cat.name
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

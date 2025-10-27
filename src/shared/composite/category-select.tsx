import { IonSelect, IonSelectOption } from "@ionic/react";
import type { SelectCustomEvent } from "@ionic/react";
import { useRef } from "react";

interface CategoryItem {
  id: string;
  name: string;
}

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: readonly CategoryItem[];
  disabled?: boolean;
  placeholder?: string;
  label: string;
  includeAllOption?: boolean;
  className?: string;
}

/**
 * CategorySelect - Category select component without IonItem wrapper
 *
 * This component should be wrapped in IonItem when used in forms with IonList.
 * Example:
 * <IonList>
 *   <IonItem>
 *     <CategorySelect label="Category" value={category} onValueChange={setCategory} categories={CATEGORIES} />
 *   </IonItem>
 * </IonList>
 */
export function CategorySelect({
  value,
  onValueChange,
  categories,
  disabled = false,
  placeholder = "Chọn danh mục",
  label,
  includeAllOption = false,
  className,
}: CategorySelectProps) {
  const selectRef = useRef<HTMLIonSelectElement>(null);

  const handleChange = (e: SelectCustomEvent) => {
    onValueChange(e.detail.value as string);
  };

  const handleDismiss = () => {
    // Blur the select when action sheet closes to drop label back down
    if (selectRef.current && !selectRef.current.value) {
      // Force blur by focusing body then blurring
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 0);
    }
  };

  // Convert empty string to undefined for proper placeholder/label behavior
  const selectValue = value === "" ? undefined : value;

  return (
    <IonSelect
      ref={selectRef}
      label={label}
      labelPlacement="end"
      value={selectValue}
      onIonChange={handleChange}
      onIonDismiss={handleDismiss}
      interface="action-sheet"
      cancelText="Hủy"
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    >
      {includeAllOption && <IonSelectOption value="all">Tất cả danh mục</IonSelectOption>}
      {categories.map((cat) => (
        <IonSelectOption key={cat.id} value={cat.name}>
          {cat.name}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}

import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import type { SelectCustomEvent } from "@ionic/react";
import { useRef } from "react";

interface CategoryItem {
  id: string;
  name: string;
}

interface IonicCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: readonly CategoryItem[];
  disabled?: boolean;
  placeholder?: string;
  label: string;
  includeAllOption?: boolean;
  className?: string;
}

export function IonicCategorySelect({
  value,
  onValueChange,
  categories,
  disabled = false,
  placeholder = "Chọn danh mục",
  label,
  includeAllOption = false,
  className,
}: IonicCategorySelectProps) {
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
    <IonItem className={className} lines="full">
      <IonSelect
        ref={selectRef}
        label={label}
        labelPlacement="floating"
        value={selectValue}
        onIonChange={handleChange}
        onIonDismiss={handleDismiss}
        interface="action-sheet"
        placeholder={placeholder}
        disabled={disabled}
      >
        {includeAllOption && <IonSelectOption value="all">Tất cả danh mục</IonSelectOption>}
        {categories.map((cat) => (
          <IonSelectOption key={cat.id} value={cat.name}>
            {cat.name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}

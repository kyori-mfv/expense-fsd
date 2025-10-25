import { IonActionSheet, IonButton, IonIcon } from "@ionic/react";
import { layersOutline } from "ionicons/icons";
import { useState } from "react";

interface CategoryItem {
  id: string;
  name: string;
}

interface CategoryButtonSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: readonly CategoryItem[];
  disabled?: boolean;
  placeholder?: string;
  includeAllOption?: boolean;
  className?: string;
}

/**
 * CategoryButtonSelect - Button-style category selector with action sheet
 *
 * Displays as an IonButton (outline) that opens an IonActionSheet for selection.
 * Matches the design pattern of DateRangePicker in filter forms.
 *
 * Features:
 * - Button-outline style (consistent with DateRangePicker)
 * - Icon on the left
 * - Centered text
 * - Opens action sheet for selection
 * - Optional "All categories" option
 */
export function CategoryButtonSelect({
  value,
  onValueChange,
  categories,
  disabled = false,
  placeholder = "Chọn danh mục",
  includeAllOption = false,
  className = "",
}: CategoryButtonSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Find the display name for the current value
  const getDisplayName = () => {
    if (!value || value === "") {
      return placeholder;
    }
    if (value === "all") {
      return "Tất cả danh mục";
    }
    const category = categories.find((cat) => cat.name === value);
    return category ? category.name : placeholder;
  };

  // Build action sheet buttons
  const buttons = [
    ...(includeAllOption
      ? [
          {
            text: "Tất cả danh mục",
            handler: () => {
              onValueChange("all");
            },
          },
        ]
      : []),
    ...categories.map((cat) => ({
      text: cat.name,
      handler: () => {
        onValueChange(cat.name);
      },
    })),
    {
      text: "Hủy",
      role: "cancel",
    },
  ];

  const isPlaceholder = !value || value === "";

  return (
    <>
      <IonButton
        expand="block"
        fill="outline"
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`space-x-3 ${className}`}
      >
        <IonIcon slot="start" icon={layersOutline} className="text-xl" />
        <span className={isPlaceholder ? "text-[var(--ion-color-medium)]" : ""}>
          {getDisplayName()}
        </span>
      </IonButton>

      <IonActionSheet isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} buttons={buttons} />
    </>
  );
}

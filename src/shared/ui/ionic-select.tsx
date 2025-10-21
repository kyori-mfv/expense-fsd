import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import type { SelectCustomEvent } from "@ionic/react";
import { useRef } from "react";

export interface IonicSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IonicSelectProps {
  label: string;
  value: string | string[] | undefined;
  onValueChange: (value: string | string[]) => void;
  options: IonicSelectOption[];

  // Select attributes
  multiple?: boolean;
  disabled?: boolean;

  // Interface
  interface?: "action-sheet" | "popover" | "alert";
  interfaceOptions?: object;

  // Placeholder
  placeholder?: string;

  // Other
  className?: string;
}

export function IonicSelect({
  label,
  value,
  onValueChange,
  options,
  interface: interfaceType = "action-sheet",
  placeholder = "Chọn...",
  className,
  ...selectProps
}: IonicSelectProps) {
  const selectRef = useRef<HTMLIonSelectElement>(null);

  const handleChange = (e: SelectCustomEvent) => {
    onValueChange(e.detail.value as string | string[]);
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
        interface={interfaceType}
        placeholder={placeholder}
        {...selectProps}
      >
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}

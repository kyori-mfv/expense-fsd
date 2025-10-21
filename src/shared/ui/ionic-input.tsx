import type { InputInputEventDetail } from "@ionic/core";
import { IonIcon, IonInput, IonItem, IonNote } from "@ionic/react";
import type { InputCustomEvent } from "@ionic/react";
import { forwardRef } from "react";

export interface IonicInputProps {
  label: string;
  value: string | number | null | undefined;
  onValueChange: (value: string) => void;

  // Input attributes
  type?: "text" | "email" | "number" | "password" | "search" | "tel" | "url";
  inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearInput?: boolean;

  // Validation
  error?: string;
  helperText?: string;

  // Icons
  startIcon?: string; // Ionicon name
  endIcon?: string;

  // Other
  className?: string;
}

export const IonicInput = forwardRef<HTMLIonInputElement, IonicInputProps>(
  (
    {
      label,
      value,
      onValueChange,
      error,
      helperText,
      startIcon,
      endIcon,
      className,
      clearInput = true,
      ...inputProps
    },
    ref
  ) => {
    const handleInput = (e: InputCustomEvent<InputInputEventDetail>) => {
      onValueChange(e.detail.value || "");
    };

    return (
      <IonItem className={error ? "ion-invalid" : className} lines="full">
        {startIcon && <IonIcon icon={startIcon} slot="start" />}

        <IonInput
          ref={ref}
          label={label}
          labelPlacement="floating"
          value={value}
          onIonInput={handleInput}
          clearInput={clearInput}
          {...inputProps}
        />

        {endIcon && <IonIcon icon={endIcon} slot="end" />}

        {helperText && !error && <IonNote slot="helper">{helperText}</IonNote>}

        {error && <IonNote slot="error">{error}</IonNote>}
      </IonItem>
    );
  }
);

IonicInput.displayName = "IonicInput";

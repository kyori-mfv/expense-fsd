import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

export interface DatePickerProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  presentation?: "date" | "date-time" | "time" | "month" | "year" | "month-year";
  className?: string;
}

/**
 * DatePicker - Date picker component without IonItem wrapper
 *
 * This component should be wrapped in IonItem when used in forms with IonList.
 * The IonItem should have button prop to enable click interaction.
 * Example:
 * <IonList>
 *   <IonItem button>
 *     <DatePicker label="Date" date={date} onDateChange={setDate} />
 *   </IonItem>
 * </IonList>
 */
export function DatePicker({
  label,
  date,
  onDateChange,
  disabled = false,
  placeholder = "Chọn ngày...",
  presentation = "date",
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string | string[] | null | undefined) => {
    if (value && typeof value === "string") {
      onDateChange(new Date(value));
      // Auto-close modal after selecting a date
      setIsOpen(false);
    } else if (value === null) {
      onDateChange(undefined);
    }
  };

  const formattedDate = date ? format(date, "dd/MM/yyyy", { locale: vi }) : "";

  return (
    <>
      <IonInput
        label={label}
        labelPlacement="end"
        value={formattedDate}
        readonly
        placeholder={placeholder}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(true)}
        className={className}
      />

      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        breakpoints={[0, 0.6, 1]}
        initialBreakpoint={0.6}
        className="date-picker-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Hủy</IonButton>
            </IonButtons>
            <IonTitle>{label}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)} strong>
                Xong
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
          <IonDatetime
            value={date?.toISOString()}
            onIonChange={(e) => handleChange(e.detail.value)}
            presentation={presentation}
            locale="vi-VN"
            firstDayOfWeek={1}
            size="cover"
          />
          <style>
            {`
              ion-datetime::part(month-year-button) {
                text-transform: capitalize;
              }
            `}
          </style>
        </IonContent>
      </IonModal>
    </>
  );
}

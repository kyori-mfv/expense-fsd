import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

export interface IonicDatePickerProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  presentation?: "date" | "date-time" | "time" | "month" | "year" | "month-year";
  className?: string;
}

export function IonicDatePicker({
  label,
  date,
  onDateChange,
  disabled = false,
  placeholder = "Chọn ngày...",
  presentation = "date",
  className,
}: IonicDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string | string[] | null | undefined) => {
    if (value && typeof value === "string") {
      onDateChange(new Date(value));
    } else if (value === null) {
      onDateChange(undefined);
    }
  };

  const formattedDate = date ? format(date, "dd/MM/yyyy", { locale: vi }) : "";

  return (
    <>
      <IonItem
        button
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={className}
        lines="full"
      >
        <IonInput
          label={label}
          labelPlacement="floating"
          value={formattedDate}
          readonly
          placeholder={placeholder}
        />
      </IonItem>

      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        breakpoints={[0, 0.5, 1]}
        initialBreakpoint={0.5}
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
            preferWheel
            size="cover"
          />
        </IonContent>
      </IonModal>
    </>
  );
}

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DateRangeContent } from "./date-range-content";
import { DateRangeHeader } from "./date-range-header";

interface DateRangeModalProps {
  isOpen: boolean;
  step: "start" | "end";
  startDate: string | undefined;
  endDate: string | undefined;
  isPending: boolean;
  modalDateDisplay: {
    start: string | null;
    end: string | null;
  };
  onStartDateChange: (e: CustomEvent) => void;
  onEndDateChange: (e: CustomEvent) => void;
  onNext: () => void;
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * DateRangeModal - Modal container for date range picker
 *
 * Pure presentational component - no business logic
 * Orchestrates header, toolbar, and content components
 */
export function DateRangeModal({
  isOpen,
  step,
  startDate,
  endDate,
  isPending,
  modalDateDisplay,
  onStartDateChange,
  onEndDateChange,
  onNext,
  onBack,
  onConfirm,
  onCancel,
}: DateRangeModalProps) {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onCancel}
      breakpoints={[0, 0.7, 1]}
      initialBreakpoint={0.7}
      className="date-picker-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {step === "end" ? (
              <IonButton onClick={onBack}>Quay lại</IonButton>
            ) : (
              <IonButton onClick={onCancel}>Hủy</IonButton>
            )}
          </IonButtons>
          <IonTitle>{step === "start" ? "Chọn ngày bắt đầu" : "Chọn ngày kết thúc"}</IonTitle>
          <IonButtons slot="end">
            {step === "start" ? (
              <IonButton strong onClick={onNext} disabled={!startDate || isPending}>
                Tiếp
              </IonButton>
            ) : (
              <IonButton strong onClick={onConfirm} disabled={!endDate || isPending}>
                Xong
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <DateRangeHeader
          step={step}
          startDate={modalDateDisplay.start}
          endDate={modalDateDisplay.end}
        />

        <DateRangeContent
          step={step}
          startDate={startDate}
          endDate={endDate}
          isPending={isPending}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </IonContent>
    </IonModal>
  );
}

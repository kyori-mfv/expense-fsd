import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { calendarOutline } from "ionicons/icons";
import * as React from "react";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * DateRangePicker - Two-step Ionic date picker
 *
 * A composite component that uses IonDatetime in a two-step process:
 * 1. Select start date
 * 2. Select end date
 */
export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled,
  placeholder = "Chọn khoảng ngày",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState<"start" | "end">("start");
  const [startDate, setStartDate] = React.useState<string | undefined>(
    dateRange?.from?.toISOString()
  );
  const [endDate, setEndDate] = React.useState<string | undefined>(dateRange?.to?.toISOString());

  // Update dates when external value changes
  React.useEffect(() => {
    if (!isOpen) {
      setStartDate(dateRange?.from?.toISOString());
      setEndDate(dateRange?.to?.toISOString());
      setStep("start");
    }
  }, [dateRange, isOpen]);

  const handleStartDateChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setStartDate(value);
    setStep("end");
  };

  const handleEndDateChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    setEndDate(value);
    if (startDate) {
      const from = new Date(startDate);
      const to = new Date(value);
      onDateRangeChange({ from, to });
      setIsOpen(false);
    }
  };

  const handleNext = () => {
    if (step === "start" && startDate) {
      setStep("end");
    }
  };

  const handleBack = () => {
    setStep("start");
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      const from = new Date(startDate);
      const to = new Date(endDate);
      onDateRangeChange({ from, to });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setStartDate(dateRange?.from?.toISOString());
    setEndDate(dateRange?.to?.toISOString());
    setStep("start");
    setIsOpen(false);
  };

  const formatDateDisplay = () => {
    if (dateRange?.from) {
      if (dateRange.to && dateRange.to !== dateRange.from) {
        return `${format(dateRange.from, "dd/MM/yyyy", { locale: vi })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: vi })}`;
      }
      return format(dateRange.from, "dd/MM/yyyy", { locale: vi });
    }
    return placeholder;
  };

  return (
    <>
      <IonButton
        expand="block"
        fill="outline"
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className="space-x-3"
      >
        <IonIcon slot="start" icon={calendarOutline} className="text-xl" />
        <span className={!dateRange?.from ? "text-[var(--ion-color-medium)]" : ""}>
          {formatDateDisplay()}
        </span>
      </IonButton>

      <IonModal
        isOpen={isOpen}
        onDidDismiss={handleCancel}
        breakpoints={[0, 0.7, 1]}
        initialBreakpoint={0.7}
        className="date-picker-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {step === "end" ? (
                <IonButton onClick={handleBack}>Quay lại</IonButton>
              ) : (
                <IonButton onClick={handleCancel}>Hủy</IonButton>
              )}
            </IonButtons>
            <IonTitle>{step === "start" ? "Chọn ngày bắt đầu" : "Chọn ngày kết thúc"}</IonTitle>
            <IonButtons slot="end">
              {step === "start" ? (
                <IonButton strong onClick={handleNext} disabled={!startDate}>
                  Tiếp
                </IonButton>
              ) : (
                <IonButton strong onClick={handleConfirm} disabled={!endDate}>
                  Xong
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Display selected dates */}
          {(startDate || endDate) && (
            <div className="p-4 mb-5 text-center">
              <IonText color="medium">
                <p className="text-xs uppercase tracking-wider font-medium mb-2">
                  {step === "start" ? "Ngày bắt đầu" : "Khoảng ngày"}
                </p>
              </IonText>
              <IonText color="primary">
                <h3 className="text-xl font-bold tracking-tight m-0">
                  {startDate && format(new Date(startDate), "dd/MM/yyyy", { locale: vi })}
                  {startDate && endDate && step === "end" && " → "}
                  {endDate &&
                    step === "end" &&
                    format(new Date(endDate), "dd/MM/yyyy", { locale: vi })}
                </h3>
              </IonText>
            </div>
          )}

          <IonDatetime
            presentation="date"
            value={step === "start" ? startDate : endDate}
            onIonChange={step === "start" ? handleStartDateChange : handleEndDateChange}
            locale="vi-VN"
            firstDayOfWeek={1}
            preferWheel={false}
            size="cover"
            min={step === "end" && startDate ? startDate : undefined}
          />
          <style>{`
            ion-datetime::part(month-year-button) {
              text-transform: capitalize;
            }
          `}</style>
        </IonContent>
      </IonModal>
    </>
  );
}

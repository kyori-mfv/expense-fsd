import { IonDatetime } from "@ionic/react";
import { DATE_PICKER_ANIMATIONS, STEP_TRANSITION_STYLE } from "./date-range-animations";

interface DateRangeContentProps {
  step: "start" | "end";
  startDate: string | undefined;
  endDate: string | undefined;
  isPending: boolean;
  onStartDateChange: (e: CustomEvent) => void;
  onEndDateChange: (e: CustomEvent) => void;
}

/**
 * DateRangeContent - IonDatetime wrapper with animations
 *
 * Pure presentational component - no business logic
 */
export function DateRangeContent({
  step,
  startDate,
  endDate,
  isPending,
  onStartDateChange,
  onEndDateChange,
}: DateRangeContentProps) {
  return (
    <>
      <div key={step} style={STEP_TRANSITION_STYLE}>
        <IonDatetime
          presentation="date"
          value={step === "start" ? startDate : endDate}
          onIonChange={step === "start" ? onStartDateChange : onEndDateChange}
          locale="vi-VN"
          firstDayOfWeek={1}
          preferWheel={false}
          size="cover"
          min={step === "end" && startDate ? startDate : undefined}
          disabled={isPending}
        />
      </div>
      <style>{DATE_PICKER_ANIMATIONS}</style>
    </>
  );
}

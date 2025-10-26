import { IonText } from "@ionic/react";
import { HEADER_CONTAINER_STYLE, HEADER_TRANSITION_STYLE } from "./date-range-animations";

interface DateRangeHeaderProps {
  step: "start" | "end";
  startDate: string | null;
  endDate: string | null;
}

/**
 * DateRangeHeader - Display selected dates in modal header
 *
 * Pure presentational component - no business logic
 */
export function DateRangeHeader({ step, startDate, endDate }: DateRangeHeaderProps) {
  if (!startDate && !endDate) return null;

  return (
    <div className="p-4 mb-5 text-center" style={HEADER_CONTAINER_STYLE}>
      <IonText color="medium">
        <p className="text-xs uppercase tracking-wider font-medium mb-2">
          {step === "start" ? "Ngày bắt đầu" : "Khoảng ngày"}
        </p>
      </IonText>
      <IonText color="primary">
        <h3 className="text-xl font-bold tracking-tight m-0" style={HEADER_TRANSITION_STYLE}>
          {startDate}
          {startDate && endDate && step === "end" && " → "}
          {endDate && step === "end" && endDate}
        </h3>
      </IonText>
    </div>
  );
}

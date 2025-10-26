import { IonButton, IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import type { DateRange } from "react-day-picker";

interface DateRangeButtonProps {
  dateRange?: DateRange;
  dateDisplay: string;
  disabled?: boolean;
  onClick: () => void;
}

/**
 * DateRangeButton - Trigger button for date range picker
 *
 * Pure presentational component - no business logic
 */
export function DateRangeButton({
  dateRange,
  dateDisplay,
  disabled,
  onClick,
}: DateRangeButtonProps) {
  return (
    <IonButton
      expand="block"
      fill="outline"
      onClick={onClick}
      disabled={disabled}
      className="space-x-3"
    >
      <IonIcon slot="start" icon={calendarOutline} className="text-xl" />
      <span className={!dateRange?.from ? "text-[var(--ion-color-medium)]" : ""}>
        {dateDisplay}
      </span>
    </IonButton>
  );
}

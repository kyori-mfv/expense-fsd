import type { DateRange } from "react-day-picker";
import { DateRangeButton } from "./date-range-button";
import { DateRangeModal } from "./date-range-modal";
import { useDateRangePicker } from "./use-date-range-picker";

export interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * DateRangePicker - Two-step Ionic date picker (FSD-Compliant)
 *
 * A composite component that uses IonDatetime in a two-step process:
 * 1. Select start date
 * 2. Select end date
 *
 * FSD Architecture:
 * - model/ - Business logic (useDate RangePicker hook, reducer)
 * - ui/ - Presentation components (button, modal, header, content)
 * - lib/ - Utilities (animations, constants)
 *
 * React 19.2 Enhancements:
 * - useReducer for unified state management
 * - useTransition for smooth, non-blocking transitions
 * - React Compiler auto-memoization
 * - Custom hooks for logic extraction
 *
 * This component is purely for orchestration - all logic is in the custom hook,
 * all presentation is in child components.
 */
export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled,
  placeholder = "Chọn khoảng ngày",
}: DateRangePickerProps) {
  // All business logic delegated to custom hook
  const {
    state,
    isPending,
    dateDisplay,
    modalDateDisplay,
    handleOpen,
    handleStartDateChange,
    handleEndDateChange,
    handleNext,
    handleBack,
    handleConfirm,
    handleCancel,
  } = useDateRangePicker({ dateRange, onDateRangeChange, placeholder });

  return (
    <>
      <DateRangeButton
        dateRange={dateRange}
        dateDisplay={dateDisplay}
        disabled={disabled}
        onClick={handleOpen}
      />

      <DateRangeModal
        isOpen={state.isOpen}
        step={state.step}
        startDate={state.startDate}
        endDate={state.endDate}
        isPending={isPending}
        modalDateDisplay={modalDateDisplay}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onNext={handleNext}
        onBack={handleBack}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

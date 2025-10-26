import { formatDateRange, formatDateString } from "@/shared/lib/date";
import { useMemo, useReducer, useTransition } from "react";
import type { DateRange } from "react-day-picker";
import {
  type DatePickerState,
  datePickerReducer,
  initializeDatePickerState,
} from "./date-range-reducer";

export interface UseDateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  placeholder?: string;
}

export interface UseDateRangePickerReturn {
  // State
  state: DatePickerState;
  isPending: boolean;

  // Computed values
  dateDisplay: string;
  modalDateDisplay: {
    start: string | null;
    end: string | null;
  };

  // Actions
  handleOpen: () => void;
  handleStartDateChange: (e: CustomEvent) => void;
  handleEndDateChange: (e: CustomEvent) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

/**
 * Custom hook for date range picker business logic
 * React 19.2 Enhancement: Extract business logic to custom hook
 *
 * This hook encapsulates all state management and event handling logic,
 * keeping the UI components pure and focused on presentation.
 *
 * @param props - Hook props
 * @returns State, computed values, and action handlers
 */
export function useDateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Chọn khoảng ngày",
}: UseDateRangePickerProps): UseDateRangePickerReturn {
  // React 19.2: useReducer for complex state management
  const [state, dispatch] = useReducer(datePickerReducer, dateRange, initializeDatePickerState);

  // React 19.2: useTransition for non-blocking UI updates
  const [isPending, startTransition] = useTransition();

  // Computed: Date display for main button
  const dateDisplay = useMemo(
    () => formatDateRange(dateRange, placeholder),
    [dateRange, placeholder]
  );

  // Computed: Modal date display (React Compiler auto-memoizes)
  const modalDateDisplay = {
    start: formatDateString(state.startDate),
    end: formatDateString(state.endDate),
  };

  // Event handlers (React Compiler auto-memoizes)
  const handleOpen = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const handleStartDateChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    // Set end date to same as start date initially (will show correct month in step 2)
    dispatch({ type: "SET_START_DATE", payload: value });
    if (!state.endDate) {
      dispatch({ type: "SET_END_DATE", payload: value });
    }
  };

  const handleEndDateChange = (e: CustomEvent) => {
    const value = e.detail.value as string;
    dispatch({ type: "SET_END_DATE", payload: value });

    if (state.startDate) {
      const from = new Date(state.startDate);
      const to = new Date(value);
      const newRange = { from, to };

      // Update parent in transition for smooth UX
      startTransition(() => {
        onDateRangeChange(newRange);
        dispatch({ type: "CLOSE_MODAL" });
      });
    }
  };

  const handleNext = () => {
    startTransition(() => {
      dispatch({ type: "NEXT_STEP" });
    });
  };

  const handleBack = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const handleConfirm = () => {
    if (state.startDate && state.endDate) {
      const from = new Date(state.startDate);
      const to = new Date(state.endDate);
      const newRange = { from, to };

      startTransition(() => {
        onDateRangeChange(newRange);
        dispatch({ type: "CLOSE_MODAL" });
      });
    }
  };

  const handleCancel = () => {
    dispatch({
      type: "RESET",
      payload: { from: dateRange?.from, to: dateRange?.to },
    });
    dispatch({ type: "CLOSE_MODAL" });
  };

  return {
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
  };
}

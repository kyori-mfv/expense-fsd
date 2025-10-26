import type { DateRange } from "react-day-picker";

/**
 * Internal state for date picker modal
 */
export interface DatePickerState {
  isOpen: boolean;
  step: "start" | "end";
  startDate: string | undefined;
  endDate: string | undefined;
}

/**
 * Actions for date picker state reducer
 */
export type DatePickerAction =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_START_DATE"; payload: string }
  | { type: "SET_END_DATE"; payload: string }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "RESET"; payload: { from?: Date; to?: Date } };

/**
 * Reducer for managing date picker state
 * React 19.2 Enhancement: Unified state management with useReducer
 *
 * Pure function - no side effects
 */
export function datePickerReducer(
  state: DatePickerState,
  action: DatePickerAction
): DatePickerState {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false, step: "start" };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload, step: "end" };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "NEXT_STEP":
      return state.step === "start" && state.startDate ? { ...state, step: "end" } : state;
    case "PREVIOUS_STEP":
      return { ...state, step: "start" };
    case "RESET":
      return {
        ...state,
        startDate: action.payload.from?.toISOString(),
        endDate: action.payload.to?.toISOString(),
        step: "start",
      };
    default:
      return state;
  }
}

/**
 * Initialize state from props
 * Pure function - no side effects
 */
export function initializeDatePickerState(dateRange?: DateRange): DatePickerState {
  return {
    isOpen: false,
    step: "start",
    startDate: dateRange?.from?.toISOString(),
    endDate: dateRange?.to?.toISOString(),
  };
}

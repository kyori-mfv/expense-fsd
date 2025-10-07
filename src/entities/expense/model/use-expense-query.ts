import type { ExpenseRecord } from "@/shared/types";
import { useLiveQuery } from "dexie-react-hooks";
import { expenseService } from "../api/expense.service";

/**
 * Generic expense query hooks at entity level
 * Use these for simple, reusable data fetching
 */

export function useRecentExpenses(limit = 5): ExpenseRecord[] {
  return useLiveQuery(() => expenseService.getRecent(limit), [limit]) ?? [];
}

export function useAllExpenses(): ExpenseRecord[] {
  return useLiveQuery(() => expenseService.getAll(), []) ?? [];
}

export function useExpenseById(id: string): ExpenseRecord | undefined {
  return useLiveQuery(() => expenseService.getById(id), [id]);
}

export function useExpenseCount(): number {
  return useLiveQuery(() => expenseService.count(), []) ?? 0;
}

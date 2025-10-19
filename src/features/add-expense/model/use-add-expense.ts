import { expenseService } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import { useState } from "react";

export function useAddExpense() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addExpense = async (
    expenseData: Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">
  ): Promise<ExpenseRecord | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newExpense = await expenseService.add(expenseData);
      // No need to update store - useLiveQuery will auto-update!
      return newExpense;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add expense";
      setError(errorMessage);
      console.error("Error adding expense:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addExpense,
    isLoading,
    error,
  };
}

import { expenseService } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import { useState } from "react";

export function useEditExpense() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editExpense = async (
    id: string,
    updates: Partial<Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">>
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await expenseService.update(id, updates);
      // No need to update store - useLiveQuery will auto-update!
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update expense";
      setError(errorMessage);
      console.error("Error updating expense:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editExpense,
    isLoading,
    error,
  };
}

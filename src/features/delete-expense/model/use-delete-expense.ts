import { expenseService } from "@/entities/expense";
import { useState } from "react";

export function useDeleteExpense() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteExpense = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await expenseService.delete(id);
      // No need to update store - useLiveQuery will auto-update!
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete expense";
      setError(errorMessage);
      console.error("Error deleting expense:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteExpense,
    isLoading,
    error,
  };
}

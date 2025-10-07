import { incomeService } from "@/entities/income";
import { useState } from "react";

export function useDeleteIncome() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteIncome = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await incomeService.delete(id);
      // No need to update store - useLiveQuery will auto-update!
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete income";
      setError(errorMessage);
      console.error("Error deleting income:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteIncome,
    isLoading,
    error,
  };
}

import { incomeService } from "@/entities/income";
import type { IncomeRecord } from "@/shared/types";
import { useState } from "react";

export function useEditIncome() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editIncome = async (
    id: string,
    updates: Partial<Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">>
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await incomeService.update(id, updates);
      // No need to update store - useLiveQuery will auto-update!
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update income";
      setError(errorMessage);
      console.error("Error updating income:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editIncome,
    isLoading,
    error,
  };
}

import { incomeService } from "@/entities/income";
import type { IncomeRecord } from "@/shared/types";
import { useState } from "react";

export function useAddIncome() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIncome = async (
    incomeData: Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">
  ): Promise<IncomeRecord | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newIncome = await incomeService.add(incomeData);
      // No need to update store - useLiveQuery will auto-update!
      return newIncome;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add income";
      setError(errorMessage);
      console.error("Error adding income:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addIncome,
    isLoading,
    error,
  };
}

import { incomeService } from "@/entities/income";
import type { IncomeRecord } from "@/shared/types";
import { useState } from "react";

interface ImportResult {
  success: number;
  failed: number;
  total: number;
}

interface RawIncomeItem {
  amount: number | string;
  category: string;
  description: string;
  date: string;
  originalInput?: string;
}

export function useImportIncomes() {
  const [isImporting, setIsImporting] = useState(false);

  const importFromJSON = async (file: File): Promise<ImportResult> => {
    try {
      setIsImporting(true);

      // Read file
      const text = await file.text();
      const data = JSON.parse(text);

      // Extract incomes array from data
      const rawIncomes: RawIncomeItem[] = data.incomes ?? (Array.isArray(data) ? data : null);

      if (!rawIncomes || !Array.isArray(rawIncomes)) {
        throw new Error("File không đúng định dạng (cần {incomes: [...]} hoặc [...])");
      }

      // Validate and transform all incomes
      const validIncomes: Omit<IncomeRecord, "id" | "createdAt" | "updatedAt">[] = rawIncomes
        .filter((item) => item.amount && item.category && item.description && item.date)
        .map((item) => ({
          amount: Number(item.amount),
          category: item.category,
          description: item.description,
          date: new Date(item.date),
        }));

      // Bulk add all valid incomes in one transaction
      const success = validIncomes.length;
      await incomeService.bulkAdd(validIncomes);

      return {
        success,
        failed: rawIncomes.length - success,
        total: rawIncomes.length,
      };
    } catch (error) {
      console.error("Import failed:", error);
      throw error;
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importFromJSON,
    isImporting,
  };
}

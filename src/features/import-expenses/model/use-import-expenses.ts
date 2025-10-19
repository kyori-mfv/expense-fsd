import { expenseService } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import { useState } from "react";

interface ImportResult {
  success: number;
  failed: number;
  total: number;
}

interface RawExpenseItem {
  amount: number | string;
  category: string;
  description: string;
  date: string;
  originalInput?: string;
}

export function useImportExpenses() {
  const [isImporting, setIsImporting] = useState(false);

  const importFromJSON = async (file: File): Promise<ImportResult> => {
    try {
      setIsImporting(true);

      // Read file
      const text = await file.text();
      const data = JSON.parse(text);

      // Extract expenses array from data
      const rawExpenses: RawExpenseItem[] = data.expenses ?? (Array.isArray(data) ? data : null);

      if (!rawExpenses || !Array.isArray(rawExpenses)) {
        throw new Error("File không đúng định dạng (cần {expenses: [...]} hoặc [...])");
      }

      // Validate and transform all expenses
      const validExpenses: Omit<ExpenseRecord, "id" | "createdAt" | "updatedAt">[] = rawExpenses
        .filter((item) => item.amount && item.category && item.description && item.date)
        .map((item) => ({
          amount: Number(item.amount),
          category: item.category,
          description: item.description,
          date: new Date(item.date),
        }));

      // Bulk add all valid expenses in one transaction
      const success = validExpenses.length;
      await expenseService.bulkAdd(validExpenses);

      return {
        success,
        failed: rawExpenses.length - success,
        total: rawExpenses.length,
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

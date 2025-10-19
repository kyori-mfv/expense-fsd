import { expenseService } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import { useState } from "react";

export function useExportExpenses() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToJSON = async () => {
    try {
      setIsExporting(true);

      // Get all expenses from database
      const expenses = await expenseService.getAll();

      if (expenses.length === 0) {
        throw new Error("Không có dữ liệu để xuất");
      }

      // Wrap in expenses object for standard format
      const exportData = {
        expenses: expenses,
      };

      // Convert to JSON
      const jsonData = JSON.stringify(exportData, null, 2);

      // Create blob and download
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `expenses_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true, count: expenses.length };
    } catch (error) {
      console.error("Export failed:", error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToJSON,
    isExporting,
  };
}

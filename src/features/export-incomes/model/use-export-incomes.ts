import { incomeService } from "@/entities/income";
import type { IncomeRecord } from "@/shared/types";
import { useState } from "react";

export function useExportIncomes() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToJSON = async () => {
    try {
      setIsExporting(true);

      // Get all incomes from database
      const incomes = await incomeService.getAll();

      if (incomes.length === 0) {
        throw new Error("Không có dữ liệu để xuất");
      }

      // Wrap in incomes object for standard format
      const exportData = {
        incomes: incomes,
      };

      // Convert to JSON
      const jsonData = JSON.stringify(exportData, null, 2);

      // Create blob and download
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `incomes_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true, count: incomes.length };
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

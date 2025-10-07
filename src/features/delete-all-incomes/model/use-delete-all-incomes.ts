import { incomeService } from "@/entities/income";
import { useState } from "react";

export function useDeleteAllIncomes() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAll = async () => {
    try {
      setIsDeleting(true);

      // Get count before deleting
      const count = await incomeService.count();

      if (count === 0) {
        throw new Error("Không có dữ liệu để xóa");
      }

      // Delete all incomes
      await incomeService.deleteAll();

      return { success: true, count };
    } catch (error) {
      console.error("Delete all failed:", error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteAll,
    isDeleting,
  };
}

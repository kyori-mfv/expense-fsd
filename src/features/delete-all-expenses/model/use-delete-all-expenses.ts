import { expenseService } from "@/entities/expense";
import { useState } from "react";

export function useDeleteAllExpenses() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAll = async () => {
    try {
      setIsDeleting(true);

      // Get count before deleting
      const count = await expenseService.count();

      if (count === 0) {
        throw new Error("Không có dữ liệu để xóa");
      }

      // Delete all expenses
      await expenseService.deleteAll();

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

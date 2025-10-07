import { ConfirmationDialog } from "@/shared/components/confirmation-dialog";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteExpense } from "../model/use-delete-expense";

interface DeleteExpenseButtonProps {
  expenseId: string;
  expenseDescription?: string;
}

export function DeleteExpenseButton({ expenseId, expenseDescription }: DeleteExpenseButtonProps) {
  const [open, setOpen] = useState(false);
  const { deleteExpense, isLoading } = useDeleteExpense();

  const handleConfirm = async () => {
    const success = await deleteExpense(expenseId);

    if (success) {
      setOpen(false);
      toast.success("Đã xóa chi tiêu");
    } else {
      toast.error("Không thể xóa chi tiêu");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={14} />
      </Button>

      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Xác nhận xóa chi tiêu"
        description={
          expenseDescription
            ? `Bạn có chắc chắn muốn xóa chi tiêu "${expenseDescription}"? Hành động này không thể hoàn tác.`
            : "Bạn có chắc chắn muốn xóa chi tiêu này? Hành động này không thể hoàn tác."
        }
        confirmLabel="Xóa"
        variant="destructive"
        isLoading={isLoading}
        loadingText="Đang xóa..."
        onConfirm={handleConfirm}
      />
    </>
  );
}

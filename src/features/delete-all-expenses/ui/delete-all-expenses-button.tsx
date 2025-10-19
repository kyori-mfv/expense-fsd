import { ConfirmationDialog } from "@/shared/composite";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteAllExpenses } from "../model/use-delete-all-expenses";

export function DeleteAllExpensesButton() {
  const [open, setOpen] = useState(false);
  const { deleteAll, isDeleting } = useDeleteAllExpenses();

  const handleConfirm = async () => {
    try {
      const result = await deleteAll();
      setOpen(false);
      toast.success(`Đã xóa ${result.count} chi tiêu`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Xóa dữ liệu thất bại");
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)} disabled={isDeleting}>
        <Trash2 className="h-4 w-4" />
      </Button>

      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Xác nhận xóa tất cả?"
        description="Hành động này không thể hoàn tác. Tất cả chi tiêu của bạn sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu."
        confirmLabel="Xóa tất cả"
        variant="destructive"
        isLoading={isDeleting}
        loadingText="Đang xóa..."
        onConfirm={handleConfirm}
      />
    </>
  );
}

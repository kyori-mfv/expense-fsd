import { ConfirmationDialog } from "@/shared/components/confirmation-dialog";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteAllIncomes } from "../model/use-delete-all-incomes";

export function DeleteAllIncomesButton() {
  const [open, setOpen] = useState(false);
  const { deleteAll, isDeleting } = useDeleteAllIncomes();

  const handleConfirm = async () => {
    try {
      const result = await deleteAll();
      setOpen(false);
      toast.success(`Đã xóa ${result.count} thu nhập`);
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
        description="Hành động này không thể hoàn tác. Tất cả thu nhập của bạn sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu."
        confirmLabel="Xóa tất cả"
        variant="destructive"
        isLoading={isDeleting}
        loadingText="Đang xóa..."
        onConfirm={handleConfirm}
      />
    </>
  );
}

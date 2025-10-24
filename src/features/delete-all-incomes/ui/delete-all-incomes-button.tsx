import { ConfirmationDialog } from "@/shared/composite";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
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
      <IonButton color="danger" onClick={() => setOpen(true)} disabled={isDeleting}>
        <IonIcon icon={trashOutline} slot="icon-only" />
      </IonButton>

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

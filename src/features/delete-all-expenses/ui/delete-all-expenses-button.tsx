import { ConfirmationDialog } from "@/shared/composite";
import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";
import { useDeleteAllExpenses } from "../model/use-delete-all-expenses";

export function DeleteAllExpensesButton() {
  const toast = useToast();
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
      <IonButton color="danger" onClick={() => setOpen(true)} disabled={isDeleting}>
        <IonIcon icon={trashOutline} slot="icon-only" />
      </IonButton>

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

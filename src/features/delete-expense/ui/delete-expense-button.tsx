import { ConfirmationDialog } from "@/shared/composite";
import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";
import { useDeleteExpense } from "../model/use-delete-expense";

interface DeleteExpenseButtonProps {
  /** The ID of the expense to delete */
  expenseId: string;
  /** Optional description to show in confirmation dialog */
  expenseDescription?: string;
}

/**
 * Mobile-first delete button with Ionic design
 * Displays icon-only button optimized for swipe actions
 */
export function DeleteExpenseButton({ expenseId, expenseDescription }: DeleteExpenseButtonProps) {
  const toast = useToast();
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
      <IonButton
        fill="clear"
        color="danger"
        onClick={() => setOpen(true)}
        className="ion-no-margin h-14 min-w-[56px] text-2xl px-3"
      >
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>

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

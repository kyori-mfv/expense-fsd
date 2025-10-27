import { ConfirmationDialog } from "@/shared/composite";
import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useState } from "react";
import { useDeleteIncome } from "../model/use-delete-income";

interface DeleteIncomeButtonProps {
  /** The ID of the income to delete */
  incomeId: string;
  /** Optional description to show in confirmation dialog */
  incomeDescription?: string;
}

/**
 * Mobile-first delete button with Ionic design
 * Displays icon-only button optimized for swipe actions
 */
export function DeleteIncomeButton({ incomeId, incomeDescription }: DeleteIncomeButtonProps) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const { deleteIncome } = useDeleteIncome();

  const handleConfirm = async () => {
    const success = await deleteIncome(incomeId);

    if (success) {
      setOpen(false);
      toast.success("Đã xóa thu nhập");
    } else {
      toast.error("Không thể xóa thu nhập");
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
        title="Xác nhận xóa thu nhập"
        description={
          incomeDescription
            ? `Bạn có chắc chắn muốn xóa thu nhập "${incomeDescription}"? Hành động này không thể hoàn tác.`
            : "Bạn có chắc chắn muốn xóa thu nhập này? Hành động này không thể hoàn tác."
        }
        confirmLabel="Xóa"
        variant="destructive"
        onConfirm={handleConfirm}
      />
    </>
  );
}

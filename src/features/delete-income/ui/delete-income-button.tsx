import { ConfirmationDialog } from "@/shared/composite";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteIncome } from "../model/use-delete-income";

interface DeleteIncomeButtonProps {
  incomeId: string;
  incomeDescription?: string;
}

export function DeleteIncomeButton({ incomeId, incomeDescription }: DeleteIncomeButtonProps) {
  const [open, setOpen] = useState(false);
  const { deleteIncome, isLoading } = useDeleteIncome();

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
        title="Xác nhận xóa thu nhập"
        description={
          incomeDescription
            ? `Bạn có chắc chắn muốn xóa thu nhập "${incomeDescription}"? Hành động này không thể hoàn tác.`
            : "Bạn có chắc chắn muốn xóa thu nhập này? Hành động này không thể hoàn tác."
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

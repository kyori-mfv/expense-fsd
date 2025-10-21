import { ExpenseFormFields } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useEditExpense } from "../model/use-edit-expense";

interface ExpenseEditDialogProps {
  expense: ExpenseRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onError?: (error: string) => void;
}

export function ExpenseEditDialog({
  expense,
  open,
  onOpenChange,
  onError,
}: ExpenseEditDialogProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { editExpense, isLoading } = useEditExpense();

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(new Date(expense.date));
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expense || !amount || !category || !description || !date) {
      onError?.("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const success = await editExpense(expense.id, {
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    });

    if (success) {
      onOpenChange(false);
      // No need for onSuccess - useLiveQuery will auto-update!
    } else {
      onError?.("Không thể cập nhật chi tiêu");
    }
  };

  return (
    <IonModal
      isOpen={open}
      onDidDismiss={() => onOpenChange(false)}
      breakpoints={[0, 0.5, 1]}
      initialBreakpoint={0.5}
      className="expense-edit-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onOpenChange(false)}>Hủy</IonButton>
          </IonButtons>
          <IonTitle>Chỉnh sửa chi tiêu</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit} strong disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <ExpenseFormFields
            amount={amount}
            onAmountChange={setAmount}
            category={category}
            onCategoryChange={setCategory}
            description={description}
            onDescriptionChange={setDescription}
            date={date}
            onDateChange={setDate}
            disabled={isLoading}
          />
        </form>
      </IonContent>
    </IonModal>
  );
}

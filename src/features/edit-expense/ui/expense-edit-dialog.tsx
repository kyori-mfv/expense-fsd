import { ExpenseFormFields } from "@/entities/expense";
import type { ExpenseRecord } from "@/shared/contract";
import { useToast } from "@/shared/react";
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
}

export function ExpenseEditDialog({ expense, open, onOpenChange }: ExpenseEditDialogProps) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const toast = useToast();
  const { editExpense } = useEditExpense();

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(new Date(expense.date));
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expense || !amount || !category || !description || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const success = await editExpense(expense.id, {
      amount,
      category,
      description,
      date,
    });

    if (success) {
      onOpenChange(false);
      toast.success("Đã cập nhật chi tiêu");
    } else {
      toast.error("Không thể cập nhật chi tiêu");
    }
  };

  return (
    <IonModal
      isOpen={open}
      onDidDismiss={() => onOpenChange(false)}
      breakpoints={[0, 0.8, 1]}
      initialBreakpoint={0.8}
      className="expense-edit-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onOpenChange(false)}>Hủy</IonButton>
          </IonButtons>
          <IonTitle>Chỉnh sửa chi tiêu</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit} strong>
              Lưu
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
            autoFocusAmount={open}
          />
        </form>
      </IonContent>
    </IonModal>
  );
}

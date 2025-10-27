import { IncomeFormFields } from "@/entities/income";
import type { IncomeRecord } from "@/shared/contract";
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
import { useEditIncome } from "../model/use-edit-income";

interface IncomeEditDialogProps {
  income: IncomeRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IncomeEditDialog({ income, open, onOpenChange }: IncomeEditDialogProps) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const toast = useToast();
  const { editIncome, isLoading } = useEditIncome();

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setCategory(income.category);
      setDescription(income.description);
      setDate(new Date(income.date));
    }
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!income || !amount || !category || !description || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const success = await editIncome(income.id, {
      amount,
      category,
      description,
      date,
    });

    if (success) {
      onOpenChange(false);
      toast.success("Đã cập nhật thu nhập");
    } else {
      toast.error("Không thể cập nhật thu nhập");
    }
  };

  return (
    <IonModal
      isOpen={open}
      onDidDismiss={() => onOpenChange(false)}
      breakpoints={[0, 0.5, 1]}
      initialBreakpoint={0.5}
      className="income-edit-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onOpenChange(false)}>Hủy</IonButton>
          </IonButtons>
          <IonTitle>Chỉnh sửa thu nhập</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit} strong disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IncomeFormFields
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

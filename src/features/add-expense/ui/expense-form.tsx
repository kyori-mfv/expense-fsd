import { ExpenseFormFields } from "@/entities/expense";
import { SectionHeader } from "@/shared/composite";
import { useToast } from "@/shared/react";
import { IonButton, IonLabel, IonListHeader } from "@ionic/react";
import { useState } from "react";
import { useAddExpense } from "../model/use-add-expense";

export function ExpenseForm() {
  const toast = useToast();
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addExpense, isLoading } = useAddExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const result = await addExpense({
      amount,
      category,
      description,
      date,
    });

    if (result) {
      // Reset form
      setAmount(0);
      setCategory("");
      setDescription("");
      setDate(new Date());
      // Show success feedback
      toast.success("Đã thêm chi tiêu");
    } else {
      toast.error("Không thể thêm chi tiêu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <SectionHeader title="Thêm chi tiêu mới" description="Nhập thông tin giao dịch chi tiêu" />
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
        className="rounded-sm"
      />

      <div className="px-4 pb-4">
        <IonButton expand="block" type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm chi tiêu"}
        </IonButton>
      </div>
    </form>
  );
}

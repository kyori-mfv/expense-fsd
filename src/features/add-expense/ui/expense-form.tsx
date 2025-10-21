import { ExpenseFormFields } from "@/entities/expense";
import { IonButton } from "@ionic/react";
import { useState } from "react";
import { useAddExpense } from "../model/use-add-expense";

interface ExpenseFormProps {
  onError?: (error: string) => void;
  inset?: boolean;
}

export function ExpenseForm({ onError, inset = false }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addExpense, isLoading } = useAddExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description || !date) {
      onError?.("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const result = await addExpense({
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    });

    if (result) {
      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(new Date());
      // No need for onSuccess - useLiveQuery will auto-update!
    } else {
      onError?.("Không thể thêm chi tiêu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
        inset={inset}
      />

      <div className="px-4 mt-4">
        <IonButton expand="block" type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm chi tiêu"}
        </IonButton>
      </div>
    </form>
  );
}

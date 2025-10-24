import { IncomeFormFields } from "@/entities/income";
import { IonButton, IonLabel, IonListHeader } from "@ionic/react";
import { useState } from "react";
import { useAddIncome } from "../model/use-add-income";

interface IncomeFormProps {
  onError?: (error: string) => void;
}

export function IncomeForm({ onError }: IncomeFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addIncome, isLoading } = useAddIncome();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description || !date) {
      onError?.("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const result = await addIncome({
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
      onError?.("Không thể thêm thu nhập");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonListHeader>
        <IonLabel>
          <h2 className="text-base font-semibold">Thêm thu nhập mới</h2>
          <p className="text-sm text-muted-foreground">Nhập thông tin giao dịch thu nhập</p>
        </IonLabel>
      </IonListHeader>

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
        inset={true}
      />

      <div className="px-4 pb-4">
        <IonButton expand="block" type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm thu nhập"}
        </IonButton>
      </div>
    </form>
  );
}

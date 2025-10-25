import { IncomeFormFields } from "@/entities/income";
import { SectionHeader } from "@/shared/composite";
import { useToast } from "@/shared/react";
import { IonButton, IonLabel, IonListHeader } from "@ionic/react";
import { useState } from "react";
import { useAddIncome } from "../model/use-add-income";

export function IncomeForm() {
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { addIncome, isLoading } = useAddIncome();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin");
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
      // Show success feedback
      toast.success("Đã thêm thu nhập");
    } else {
      toast.error("Không thể thêm thu nhập");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <SectionHeader title="Thêm thu nhập mới" description="Nhập thông tin giao dịch thu nhập" />

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
        className="rounded-sm"
      />

      <div className="px-4 pb-4">
        <IonButton expand="block" type="submit" disabled={isLoading}>
          {isLoading ? "Đang thêm..." : "Thêm thu nhập"}
        </IonButton>
      </div>
    </form>
  );
}

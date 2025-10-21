import { IonicDatePicker } from "@/shared/composite";
import { IonicInput } from "@/shared/ui/ionic-input";
import { IonList } from "@ionic/react";
import { ExpenseCategorySelect } from "./expense-category-select";

interface ExpenseFormFieldsProps {
  amount: string;
  onAmountChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
  inset?: boolean;
}

export function ExpenseFormFields({
  amount,
  onAmountChange,
  category,
  onCategoryChange,
  description,
  onDescriptionChange,
  date,
  onDateChange,
  disabled = false,
  inset = false,
}: ExpenseFormFieldsProps) {
  return (
    <IonList inset={inset}>
      <IonicInput
        label="Số tiền (VNĐ)"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        value={amount}
        onValueChange={onAmountChange}
        placeholder="100000"
        disabled={disabled}
        required
      />

      <ExpenseCategorySelect
        value={category}
        onValueChange={onCategoryChange}
        disabled={disabled}
        required
      />

      <IonicInput
        label="Mô tả"
        type="text"
        value={description}
        onValueChange={onDescriptionChange}
        placeholder="Mô tả chi tiêu..."
        disabled={disabled}
        required
      />

      <IonicDatePicker label="Ngày" date={date} onDateChange={onDateChange} disabled={disabled} />
    </IonList>
  );
}

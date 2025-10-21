import { IonicDatePicker } from "@/shared/composite";
import { IonicInput } from "@/shared/ui/ionic-input";
import { IonList } from "@ionic/react";
import { IncomeCategorySelect } from "./income-category-select";

interface IncomeFormFieldsProps {
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

export function IncomeFormFields({
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
}: IncomeFormFieldsProps) {
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

      <IncomeCategorySelect
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
        placeholder="Mô tả thu nhập..."
        disabled={disabled}
        required
      />

      <IonicDatePicker label="Ngày" date={date} onDateChange={onDateChange} disabled={disabled} />
    </IonList>
  );
}

import { DatePicker } from "@/shared/composite";
import { IonInput, IonItem, IonList } from "@ionic/react";
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
  className?: string;
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
  className,
}: IncomeFormFieldsProps) {
  return (
    <IonList className={className}>
      <IonItem lines="full">
        <IonInput
          label="Số tiền (VNĐ)"
          labelPlacement="floating"
          type="text"
          inputmode="numeric"
          value={amount}
          onIonInput={(e) => onAmountChange(e.detail.value || "")}
          placeholder="100000"
          disabled={disabled}
          required
          clearInput
        />
      </IonItem>

      <IonItem lines="full">
        <IncomeCategorySelect
          value={category}
          onValueChange={onCategoryChange}
          disabled={disabled}
          required
        />
      </IonItem>

      <IonItem lines="full">
        <IonInput
          label="Mô tả"
          labelPlacement="floating"
          type="text"
          value={description}
          onIonInput={(e) => onDescriptionChange(e.detail.value || "")}
          placeholder="Mô tả thu nhập..."
          disabled={disabled}
          required
          clearInput
        />
      </IonItem>

      <IonItem button lines="full">
        <DatePicker label="Ngày" date={date} onDateChange={onDateChange} disabled={disabled} />
      </IonItem>
    </IonList>
  );
}

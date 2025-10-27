import { DatePicker } from "@/shared/composite";
import { formatNumberInput, parseNumberInput } from "@/shared/lib";
import { IonInput, IonItem, IonList } from "@ionic/react";
import { useEffect, useState } from "react";
import { IncomeCategorySelect } from "./income-category-select";

interface IncomeFormFieldsProps {
  amount: number;
  onAmountChange: (value: number) => void;
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
  // Internal state for formatted display value
  const [displayValue, setDisplayValue] = useState("");

  // Sync display value when amount prop changes (e.g., from parent reset or edit)
  useEffect(() => {
    setDisplayValue(amount ? formatNumberInput(amount.toString()) : "");
  }, [amount]);

  const handleAmountChange = (value: string) => {
    // Format the input with thousand separators for display
    const formatted = formatNumberInput(value);
    setDisplayValue(formatted);

    // Parse and send raw number to parent
    const parsedNumber = parseNumberInput(formatted);
    onAmountChange(parsedNumber);
  };

  return (
    <IonList className={className}>
      <IonItem lines="full">
        <IonInput
          label="Số tiền (VNĐ)"
          labelPlacement="end"
          type="text"
          inputmode="numeric"
          value={displayValue}
          onIonInput={(e) => handleAmountChange(e.detail.value || "")}
          placeholder="100,000"
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
          labelPlacement="end"
          type="text"
          value={description}
          onIonInput={(e) => onDescriptionChange(e.detail.value || "")}
          placeholder="Mô tả thu nhập..."
          disabled={disabled}
          required
          clearInput
        />
      </IonItem>

      <IonItem lines="full" button detail={false}>
        <DatePicker label="Ngày" date={date} onDateChange={onDateChange} disabled={disabled} />
      </IonItem>
    </IonList>
  );
}

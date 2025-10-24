import { IncomeCategoryButtonSelect } from "@/entities/income";
import { DateRangePicker } from "@/shared/composite";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { IonButton, IonIcon, IonInput } from "@ionic/react";
import { closeOutline, searchOutline } from "ionicons/icons";
import type { UseFormReturn } from "react-hook-form";
import type { IncomeFilterValues } from "../model/filter-schema";

interface IncomeFilterFormProps {
  form: UseFormReturn<IncomeFilterValues>;
  onReset: () => void;
  onFilterChange?: () => void;
}

export function IncomeFilterForm({ form, onReset, onFilterChange }: IncomeFilterFormProps) {
  const handleFieldChange = () => {
    onFilterChange?.();
  };

  return (
    <Form {...form}>
      <form className="space-y-3 grid grid-cols-[minmax(0,30rem)] justify-center">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateRangePicker
                  dateRange={field.value}
                  onDateRangeChange={(range) => {
                    field.onChange(range);
                    handleFieldChange();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IncomeCategoryButtonSelect
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleFieldChange();
                  }}
                  placeholder="Lọc theo danh mục"
                  includeAllOption={true}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IonInput
                  type="text"
                  placeholder="Tìm kiếm theo mô tả..."
                  value={field.value}
                  onIonInput={(e) => {
                    field.onChange(e.detail.value);
                    handleFieldChange();
                  }}
                  clearInput
                  className="ion-input-filter-button w-full border-1 border-primary rounded-lg px-4 py-2.5 text-center min-h-[44px]"
                >
                  <IonIcon slot="start" icon={searchOutline} className="text-xl" />
                </IonInput>
              </FormControl>
            </FormItem>
          )}
        />

        <IonButton type="button" fill="clear" onClick={onReset} expand="block">
          <IonIcon icon={closeOutline} slot="start" className="text-base" />
          Xóa bộ lọc
        </IonButton>
      </form>
    </Form>
  );
}

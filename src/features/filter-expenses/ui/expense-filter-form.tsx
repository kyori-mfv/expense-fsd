import { ExpenseCategoryButtonSelect } from "@/entities/expense";
import { DateRangePicker } from "@/shared/composite";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { IonIcon, IonInput } from "@ionic/react";
import { closeOutline, searchOutline } from "ionicons/icons";
import type { UseFormReturn } from "react-hook-form";
import type { ExpenseFilterValues } from "../model/filter-schema";

interface ExpenseFilterFormProps {
  form: UseFormReturn<ExpenseFilterValues>;
  onReset: () => void;
  onFilterChange?: () => void;
}

export function ExpenseFilterForm({ form, onReset, onFilterChange }: ExpenseFilterFormProps) {
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
                <ExpenseCategoryButtonSelect
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

        <Button type="button" variant="link" onClick={onReset} className="w-full">
          <IonIcon icon={closeOutline} className="text-base mr-2" />
          Xóa bộ lọc
        </Button>
      </form>
    </Form>
  );
}

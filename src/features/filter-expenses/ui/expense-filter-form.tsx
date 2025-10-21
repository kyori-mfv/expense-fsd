import { ExpenseCategorySelect } from "@/entities/expense";
import { DateRangePicker } from "@/shared/composite";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Search, X } from "lucide-react";
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
                <ExpenseCategorySelect
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo mô tả..."
                    className="pl-9"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange();
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="button" variant="link" onClick={onReset} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </form>
    </Form>
  );
}

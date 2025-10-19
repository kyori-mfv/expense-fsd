import { ExpenseCategorySelect } from "@/entities/expense";
import { DatePicker } from "@/shared/composite";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useState } from "react";
import { useAddExpense } from "../model/use-add-expense";

interface ExpenseFormProps {
  onError?: (error: string) => void;
}

export function ExpenseForm({ onError }: ExpenseFormProps) {
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
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Số tiền (VNĐ)</Label>
          <Input
            id="amount"
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100000"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <ExpenseCategorySelect
            value={category}
            onValueChange={setCategory}
            disabled={isLoading}
            required
            showIcons={true}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả chi tiêu..."
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Ngày</Label>
          <DatePicker date={date} onDateChange={setDate} disabled={isLoading} />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Đang thêm..." : "Thêm chi tiêu"}
        </Button>
      </form>
    </Card>
  );
}

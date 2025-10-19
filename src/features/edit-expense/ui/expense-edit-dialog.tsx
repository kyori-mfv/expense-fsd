import { ExpenseCategorySelect } from "@/entities/expense";
import { DatePicker } from "@/shared/composite";
import type { ExpenseRecord } from "@/shared/contract";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useEffect, useState } from "react";
import { useEditExpense } from "../model/use-edit-expense";

interface ExpenseEditDialogProps {
  expense: ExpenseRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onError?: (error: string) => void;
}

export function ExpenseEditDialog({
  expense,
  open,
  onOpenChange,
  onError,
}: ExpenseEditDialogProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { editExpense, isLoading } = useEditExpense();

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(new Date(expense.date));
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expense || !amount || !category || !description || !date) {
      onError?.("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const success = await editExpense(expense.id, {
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    });

    if (success) {
      onOpenChange(false);
      // No need for onSuccess - useLiveQuery will auto-update!
    } else {
      onError?.("Không thể cập nhật chi tiêu");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa chi tiêu</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-amount">Số tiền (VNĐ)</Label>
            <Input
              id="edit-amount"
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
            <Label htmlFor="edit-category">Danh mục</Label>
            <ExpenseCategorySelect
              value={category}
              onValueChange={setCategory}
              disabled={isLoading}
              required
              showIcons={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Mô tả</Label>
            <Input
              id="edit-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiêu..."
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Ngày</Label>
            <DatePicker date={date} onDateChange={setDate} disabled={isLoading} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

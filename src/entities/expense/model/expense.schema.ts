import { z } from "zod";

export const expenseSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive("Số tiền phải lớn hơn 0"),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

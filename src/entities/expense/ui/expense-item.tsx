import type { ExpenseRecord } from "@/shared/contract";
import { formatAmount, formatDate } from "@/shared/lib/format";
import { Card } from "@/shared/ui/card";
import { Calendar } from "lucide-react";
import { ExpenseCategoryBadge } from "./expense-category-badge";

interface ExpenseItemProps {
  expense: ExpenseRecord;
  actions?: React.ReactNode;
}

export function ExpenseItem({ expense, actions }: ExpenseItemProps) {
  return (
    <Card className="px-4 py-3 hover:shadow-lg transition-all hover:border-primary/20 border-2">
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-md text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(expense.date)}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-lg font-bold text-expense-foreground">
              - {formatAmount(expense.amount)}
            </span>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </div>
        <div className="flex gap-2 justify-between text-right">
          <ExpenseCategoryBadge categoryName={expense.category} />
          <p className="text-sm font-medium text-foreground">{expense.description}</p>
        </div>
      </div>
    </Card>
  );
}

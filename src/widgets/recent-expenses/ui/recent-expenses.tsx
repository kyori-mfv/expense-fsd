import { ExpenseItem, useRecentExpenses } from "@/entities/expense";
import { EmptyState } from "@/shared/components/empty-state";
import { DISPLAY_LIMITS } from "@/shared/config/constants";
import { ReceiptText } from "lucide-react";

export function RecentExpenses() {
  const recentExpenses = useRecentExpenses(DISPLAY_LIMITS.RECENT_ITEMS);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Chi tiêu gần đây</h3>
        <p className="text-sm text-muted-foreground mt-1">5 chi tiêu được thêm gần nhất</p>
      </div>
      {recentExpenses.length === 0 ? (
        <EmptyState icon={ReceiptText} description="Chưa có chi tiêu nào" />
      ) : (
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}

import { ExpenseCard, useRecentExpenses } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/delete-expense";
import { EditExpenseButton } from "@/features/edit-expense";
import { EmptyState } from "@/shared/composite";
import { DISPLAY_LIMITS } from "@/shared/config";
import { TransparentList } from "@/shared/ui/transparent-list";
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
        <TransparentList>
          {recentExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              actions={
                <>
                  <EditExpenseButton expense={expense} />
                  <DeleteExpenseButton
                    expenseId={expense.id}
                    expenseDescription={expense.description}
                  />
                </>
              }
            />
          ))}
        </TransparentList>
      )}
    </div>
  );
}

import { ExpenseCard, useRecentExpenses } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/delete-expense";
import { EditExpenseButton } from "@/features/edit-expense";
import { EmptyState, SectionHeader } from "@/shared/composite";
import { DISPLAY_LIMITS } from "@/shared/config";
import { IonList } from "@ionic/react";
import { ReceiptText } from "lucide-react";

export function RecentExpenses() {
  const recentExpenses = useRecentExpenses(DISPLAY_LIMITS.RECENT_ITEMS);

  return (
    <div className="space-y-4">
      <SectionHeader title="Chi tiêu gần đây" description="5 chi tiêu được thêm gần nhất" />

      {recentExpenses.length === 0 ? (
        <EmptyState icon={ReceiptText} description="Chưa có chi tiêu nào" />
      ) : (
        <IonList className="ion-no-padding">
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
        </IonList>
      )}
    </div>
  );
}

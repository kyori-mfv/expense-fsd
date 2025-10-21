import type { ExpenseRecord } from "@/shared/contract";
import { formatAmount, formatDate } from "@/shared/lib/format";
import { IonIcon, IonItem } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { ExpenseCategoryBadge } from "./expense-category-badge";

interface ExpenseCardProps {
  expense: ExpenseRecord;
}

/**
 * Read-only expense card
 * Used in: Recent expenses widget, dashboard
 * Also reused by ExpenseCardActions for interactive lists
 */
export function ExpenseCard({ expense }: ExpenseCardProps) {
  return (
    <IonItem
      button={false}
      detail={false}
      lines="none"
      className="ion-no-padding mb-3 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow bg-card"
    >
      <div className="w-full px-4 py-3">
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between gap-2">
            <span className="text-md text-muted-foreground flex items-center gap-1">
              <IonIcon icon={calendarOutline} style={{ fontSize: "12px" }} />
              {formatDate(expense.date)}
            </span>
            <span className="text-lg font-bold text-expense-foreground">
              - {formatAmount(expense.amount)}
            </span>
          </div>
          <div className="flex gap-2 justify-between text-right">
            <ExpenseCategoryBadge categoryName={expense.category} />
            <p className="text-sm font-medium text-foreground">{expense.description}</p>
          </div>
        </div>
      </div>
    </IonItem>
  );
}

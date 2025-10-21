import type { ExpenseRecord } from "@/shared/contract";
import { IonItemOptions, IonItemSliding } from "@ionic/react";
import { ExpenseCard } from "./expense-card";

interface ExpenseCardSwipeableProps {
  expense: ExpenseRecord;
  actions: React.ReactNode;
}

/**
 * Swipeable expense card with reveal actions
 * Used in: Expense list page (with edit/delete capabilities)
 */
export function ExpenseCardSwipeable({ expense, actions }: ExpenseCardSwipeableProps) {
  return (
    <IonItemSliding>
      <ExpenseCard expense={expense} />
      <IonItemOptions side="end" className="flex gap-1 items-center px-2">
        {actions}
      </IonItemOptions>
    </IonItemSliding>
  );
}

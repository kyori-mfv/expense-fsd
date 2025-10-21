import type { IncomeRecord } from "@/shared/contract";
import { IonItemOptions, IonItemSliding } from "@ionic/react";
import { IncomeCard } from "./income-card";

interface IncomeCardSwipeableProps {
  income: IncomeRecord;
  actions: React.ReactNode;
}

/**
 * Swipeable income card with reveal actions
 * Used in: Income list page (with edit/delete capabilities)
 */
export function IncomeCardSwipeable({ income, actions }: IncomeCardSwipeableProps) {
  return (
    <IonItemSliding>
      <IncomeCard income={income} />
      <IonItemOptions side="end" className="flex gap-1 items-center px-2">
        {actions}
      </IonItemOptions>
    </IonItemSliding>
  );
}

import type { ExpenseRecord } from "@/shared/contract";
import { IonButton, IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { useState } from "react";
import { ExpenseEditDialog } from "./expense-edit-dialog";

interface EditExpenseButtonProps {
  /** The expense record to edit */
  expense: ExpenseRecord;
  /** Optional error handler callback */
  onError?: (error: string) => void;
}

/**
 * Mobile-first edit button with Ionic design
 * Displays icon-only button optimized for swipe actions
 */
export function EditExpenseButton({ expense, onError }: EditExpenseButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <IonButton
        fill="clear"
        color="primary"
        onClick={() => setDialogOpen(true)}
        className="ion-no-margin h-14 min-w-[56px] text-2xl px-3"
      >
        <IonIcon slot="icon-only" icon={createOutline} />
      </IonButton>

      <ExpenseEditDialog
        expense={expense}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onError={onError}
      />
    </>
  );
}

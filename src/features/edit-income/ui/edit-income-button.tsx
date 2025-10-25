import type { IncomeRecord } from "@/shared/contract";
import { IonButton, IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { useState } from "react";
import { IncomeEditDialog } from "./income-edit-dialog";

interface EditIncomeButtonProps {
  /** The income record to edit */
  income: IncomeRecord;
}

/**
 * Mobile-first edit button with Ionic design
 * Displays icon-only button optimized for swipe actions
 */
export function EditIncomeButton({ income }: EditIncomeButtonProps) {
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

      <IncomeEditDialog income={income} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

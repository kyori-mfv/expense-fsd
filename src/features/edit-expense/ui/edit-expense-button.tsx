import type { ExpenseRecord } from "@/shared/contract";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ExpenseEditDialog } from "./expense-edit-dialog";

interface EditExpenseButtonProps {
  expense: ExpenseRecord;
  onError?: (error: string) => void;
}

export function EditExpenseButton({ expense, onError }: EditExpenseButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="h-7 px-2">
        <Pencil size={14} />
      </Button>

      <ExpenseEditDialog
        expense={expense}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onError={onError}
      />
    </>
  );
}

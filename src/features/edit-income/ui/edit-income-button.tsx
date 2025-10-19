import type { IncomeRecord } from "@/shared/contract";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { IncomeEditDialog } from "./income-edit-dialog";

interface EditIncomeButtonProps {
  income: IncomeRecord;
  onError?: (error: string) => void;
}

export function EditIncomeButton({ income, onError }: EditIncomeButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} className="h-7 px-2">
        <Pencil size={14} />
      </Button>

      <IncomeEditDialog
        income={income}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onError={onError}
      />
    </>
  );
}

import type { IncomeRecord } from "@/shared/contract";
import { formatAmount, formatDate } from "@/shared/lib/format";
import { Card } from "@/shared/ui/card";
import { Calendar } from "lucide-react";
import { IncomeCategoryBadge } from "./income-category-badge";

interface IncomeItemProps {
  income: IncomeRecord;
  actions?: React.ReactNode;
}

export function IncomeItem({ income, actions }: IncomeItemProps) {
  return (
    <Card className="px-4 py-3 hover:shadow-lg transition-all hover:border-primary/20 border-2">
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-md text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(income.date)}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-lg font-bold text-income-foreground">
              + {formatAmount(income.amount)}
            </span>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </div>
        <div className="flex gap-2 justify-between text-right">
          <IncomeCategoryBadge categoryName={income.category} />
          <p className="text-sm font-medium text-foreground">{income.description}</p>
        </div>
      </div>
    </Card>
  );
}

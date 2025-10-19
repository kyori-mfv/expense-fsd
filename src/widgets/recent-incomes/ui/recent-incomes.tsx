import { IncomeItem, useRecentIncomes } from "@/entities/income";
import { EmptyState } from "@/shared/composite";
import { DISPLAY_LIMITS } from "@/shared/config";
import { ReceiptText } from "lucide-react";

export function RecentIncomes() {
  const recentIncomes = useRecentIncomes(DISPLAY_LIMITS.RECENT_ITEMS);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Thu nhập gần đây</h3>
        <p className="text-sm text-muted-foreground mt-1">5 thu nhập được thêm gần nhất</p>
      </div>
      {recentIncomes.length === 0 ? (
        <EmptyState icon={ReceiptText} description="Chưa có thu nhập nào" />
      ) : (
        <div className="space-y-3">
          {recentIncomes.map((income) => (
            <IncomeItem key={income.id} income={income} />
          ))}
        </div>
      )}
    </div>
  );
}

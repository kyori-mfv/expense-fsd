import { EXPENSE_CATEGORY_MAP } from "@/shared/config/categories";
import type { CategoryStats } from "@/shared/lib/calculate-stats";
import { PieChartCard, type PieChartData } from "@/shared/ui/pie-chart-card";
import { useMemo } from "react";

interface ExpenseCategoryChartProps {
  categoryStats: CategoryStats[];
}

export function ExpenseCategoryChart({ categoryStats }: ExpenseCategoryChartProps) {
  // Map category stats to chart data with colors - memoized for performance
  const chartData: PieChartData[] = useMemo(
    () =>
      categoryStats.map((stat) => {
        const category = EXPENSE_CATEGORY_MAP.get(stat.category);
        return {
          name: stat.category,
          value: stat.amount,
          color: category?.color || "#6b7280",
          count: stat.count,
          percentage: stat.percentage,
        };
      }),
    [categoryStats]
  );

  return (
    <PieChartCard
      title="Chi tiêu theo danh mục"
      subtitle="Phân bổ chi tiêu"
      data={chartData}
      valueColor="text-expense-foreground"
      valuePrefix="-"
      emptyMessage="Chưa có dữ liệu chi tiêu"
      tooltipLabel="tổng chi tiêu"
    />
  );
}

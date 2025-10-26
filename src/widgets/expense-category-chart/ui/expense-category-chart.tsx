import { PieChartCard, type PieChartData } from "@/shared/composite";
import { EXPENSE_CATEGORY_MAP } from "@/shared/config";
import type { CategoryStats } from "@/shared/lib/stats";

interface ExpenseCategoryChartProps {
  categoryStats: CategoryStats[];
}

export function ExpenseCategoryChart({ categoryStats }: ExpenseCategoryChartProps) {
  // Map category stats to chart data with colors
  const chartData: PieChartData[] = categoryStats.map((stat) => {
    const category = EXPENSE_CATEGORY_MAP.get(stat.category);
    return {
      name: stat.category,
      value: stat.amount,
      color: category?.color || "#6b7280",
      count: stat.count,
      percentage: stat.percentage,
    };
  });

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

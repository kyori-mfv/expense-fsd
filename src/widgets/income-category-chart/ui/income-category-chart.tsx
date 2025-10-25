import { PieChartCard, type PieChartData } from "@/shared/composite";
import { INCOME_CATEGORY_MAP } from "@/shared/config";
import type { CategoryStats } from "@/shared/lib/calculate-stats";

interface IncomeCategoryChartProps {
  categoryStats: CategoryStats[];
}

export function IncomeCategoryChart({ categoryStats }: IncomeCategoryChartProps) {
  // Map category stats to chart data with colors
  const chartData: PieChartData[] = categoryStats.map((stat) => {
    const category = INCOME_CATEGORY_MAP.get(stat.category);
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
      title="Thu nhập theo danh mục"
      subtitle="Phân bổ thu nhập"
      data={chartData}
      valueColor="text-income-foreground"
      valuePrefix="+"
      emptyMessage="Chưa có dữ liệu thu nhập"
      tooltipLabel="tổng thu nhập"
    />
  );
}

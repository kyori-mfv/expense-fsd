import { INCOME_CATEGORY_MAP } from "@/shared/config/categories";
import type { CategoryStats } from "@/shared/lib/calculate-stats";
import { PieChartCard, type PieChartData } from "@/shared/ui/pie-chart-card";
import { useMemo } from "react";

interface IncomeCategoryChartProps {
  categoryStats: CategoryStats[];
}

export function IncomeCategoryChart({ categoryStats }: IncomeCategoryChartProps) {
  // Map category stats to chart data with colors - memoized for performance
  const chartData: PieChartData[] = useMemo(
    () =>
      categoryStats.map((stat) => {
        const category = INCOME_CATEGORY_MAP.get(stat.category);
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
      title="Thu nhập theo danh mục"
      subtitle="Phân bổ thu nhập"
      data={chartData}
      valueColor="text-green-600"
      valuePrefix="+"
      emptyMessage="Chưa có dữ liệu thu nhập"
      tooltipLabel="tổng thu nhập"
    />
  );
}

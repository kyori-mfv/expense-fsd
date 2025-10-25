import { formatAmount } from "@/shared/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PieChartIcon } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface PieChartData {
  name: string;
  value: number;
  color: string;
  count: number;
  percentage: number;
}

interface PieChartCardProps {
  title: string;
  subtitle: string;
  data: PieChartData[];
  valueColor: string;
  valuePrefix?: string;
  emptyMessage: string;
  tooltipLabel?: string;
}

export function PieChartCard({
  title,
  subtitle,
  data,
  valueColor,
  valuePrefix = "",
  emptyMessage,
  tooltipLabel = "tổng",
}: PieChartCardProps) {
  // Empty state
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center text-muted-foreground">
            <PieChartIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomLegend = ({ payload }: { payload?: Array<{ color: string; value: string }> }) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload?.map((entry) => (
          <div key={entry.value} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div role="img" aria-label={`${title} - Biểu đồ tròn hiển thị phân bổ theo danh mục`}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const chartData = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-1">{chartData.name}</p>
                        <p className={`text-sm font-semibold ${valueColor}`}>
                          {valuePrefix}
                          {formatAmount(chartData.value)}
                        </p>
                        <p className="text-xs text-muted-foreground">{chartData.count} giao dịch</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {chartData.percentage.toFixed(1)}% {tooltipLabel}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="mt-4 space-y-2">
          {data.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between text-sm py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="text-right ml-4">
                <div className={`font-semibold ${valueColor}`}>
                  {valuePrefix}
                  {formatAmount(category.value)}
                </div>
                <div className="text-xs text-muted-foreground">{category.count} giao dịch</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

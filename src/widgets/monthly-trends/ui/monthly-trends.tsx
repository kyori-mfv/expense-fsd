import type { MonthlyStats } from "@/shared/lib/calculate-stats";
import { formatAmount } from "@/shared/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyTrendsProps {
  monthlyStats: MonthlyStats[];
  showNetLine?: boolean;
}

export function MonthlyTrends({ monthlyStats, showNetLine = true }: MonthlyTrendsProps) {
  if (monthlyStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng 6 tháng gần nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Chưa có dữ liệu
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Xu hướng 6 tháng gần nhất</CardTitle>
        <p className="text-sm text-muted-foreground">Biểu đồ thu chi và số dư ròng theo tháng</p>
      </CardHeader>
      <CardContent>
        <div role="img" aria-label="Biểu đồ xu hướng thu chi 6 tháng gần nhất">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value.toString();
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <p className="font-semibold mb-2">{label}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-green-600">Thu nhập:</span>
                            <span className="font-semibold text-green-600">
                              +{formatAmount(payload[0].value as number)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-red-600">Chi tiêu:</span>
                            <span className="font-semibold text-red-600">
                              -{formatAmount(payload[1].value as number)}
                            </span>
                          </div>
                          {payload[2] && (
                            <div className="flex items-center justify-between gap-4 pt-1 border-t">
                              <span className="text-sm text-blue-600">Số dư:</span>
                              <span className="font-semibold text-blue-600">
                                {(payload[2].value as number) >= 0 ? "+" : ""}
                                {formatAmount(payload[2].value as number)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="income" name="Thu nhập" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Chi tiêu" fill="#ef4444" radius={[4, 4, 0, 0]} />
              {showNetLine && (
                <Line
                  type="monotone"
                  dataKey="net"
                  name="Số dư ròng"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

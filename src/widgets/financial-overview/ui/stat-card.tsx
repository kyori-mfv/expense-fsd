import { formatAmount } from "@/shared/lib/format";
import { Card, CardContent } from "@/shared/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  borderColor: string;
  valueColor: string;
  iconBgColor: string;
  iconColor: string;
  prefix?: string;
  isAmount?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  borderColor,
  valueColor,
  iconBgColor,
  iconColor,
  prefix = "",
  isAmount = true,
}: StatCardProps) {
  const formattedValue = isAmount ? formatAmount(value as number) : value;

  return (
    <Card className={`border-l-4 p-0 ${borderColor}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className={`text-2xl font-bold ${valueColor}`}>
                {prefix}
                {formattedValue}
              </p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className={`rounded-full p-3 ${iconBgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

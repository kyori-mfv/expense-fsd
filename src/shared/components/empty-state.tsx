import { Card } from "@/shared/ui/card";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "p-8 text-center",
}: EmptyStateProps) {
  return (
    <Card className={className}>
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        {Icon && <Icon className="h-12 w-12 mb-4 opacity-50" />}
        {title && <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>}
        {description && <p className="text-sm mb-4">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </Card>
  );
}

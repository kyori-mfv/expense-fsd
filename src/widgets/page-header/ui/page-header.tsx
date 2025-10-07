import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  titleColor?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  iconColor,
  titleColor,
}: PageHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className={`text-2xl font-bold flex items-center gap-2 ${titleColor || ""}`}>
        <Icon size={28} strokeWidth={2.5} className={iconColor || ""} />
        {title}
      </h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

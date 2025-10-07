import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

interface CategoryIconProps {
  iconName: string;
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export function CategoryIcon({ iconName, className, size = 16, style }: CategoryIconProps) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = icons[iconName] || icons.HelpCircle;

  return <IconComponent className={className} size={size} style={style} />;
}

import { ThemeToggle } from "@/shared/composite";
import { IonHeader, IonToolbar } from "@ionic/react";
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
    <>
      <IonHeader className="shadow-md ion-no-border">
        <IonToolbar
          className="min-h-[56px]"
          style={{ paddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))" }}
        >
          <div className="flex flex-col justify-between px-3 py-2">
            <h1 className={`text-xl font-bold flex items-center gap-2 ${titleColor || ""}`}>
              <Icon size={24} strokeWidth={2.5} className={iconColor || ""} />
              {title}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </IonToolbar>
      </IonHeader>
      <ThemeToggle />
    </>
  );
}

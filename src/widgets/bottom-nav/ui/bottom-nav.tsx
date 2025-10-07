import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { LayoutDashboardIcon, TrendingDown, TrendingUp } from "lucide-react";

interface BottomNavProps {
  activeTab: "dashboard" | "expenses" | "income";
  onTabChange: (tab: "dashboard" | "expenses" | "income") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-area-bottom">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-3 h-16">
          {/* Dashboard Tab */}
          <Button
            variant="ghost"
            onClick={() => onTabChange("dashboard")}
            className={cn(
              "flex flex-col items-center justify-center gap-1 h-full rounded-none",
              activeTab === "dashboard"
                ? "text-dashboard-foreground bg-dashboard-foreground/10 hover:bg-dashboard-foreground/20 hover:text-dashboard-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <LayoutDashboardIcon size={24} strokeWidth={activeTab === "dashboard" ? 2.5 : 2} />
            <span
              className={cn("text-xs font-medium", activeTab === "dashboard" && "font-semibold")}
            >
              Tổng quan
            </span>
          </Button>

          {/* Expenses Tab */}
          <Button
            variant="ghost"
            onClick={() => onTabChange("expenses")}
            className={cn(
              "flex flex-col items-center justify-center gap-1 h-full rounded-none",
              activeTab === "expenses"
                ? "text-expense-foreground bg-expense-foreground/10 hover:bg-expense-foreground/20 hover:text-expense-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <TrendingDown size={24} strokeWidth={activeTab === "expenses" ? 2.5 : 2} />
            <span
              className={cn("text-xs font-medium", activeTab === "expenses" && "font-semibold")}
            >
              Chi tiêu
            </span>
          </Button>

          {/* Income Tab */}
          <Button
            variant="ghost"
            onClick={() => onTabChange("income")}
            className={cn(
              "flex flex-col items-center justify-center gap-1 h-full rounded-none",
              activeTab === "income"
                ? "text-income-foreground bg-income-foreground/10 hover:bg-income-foreground/20 hover:text-income-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <TrendingUp size={24} strokeWidth={activeTab === "income" ? 2.5 : 2} />
            <span className={cn("text-xs font-medium", activeTab === "income" && "font-semibold")}>
              Thu nhập
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

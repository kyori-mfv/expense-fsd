import { cn } from "@/shared/lib/utils";
import { LayoutDashboardIcon, TrendingDown, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 safe-area-bottom">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-3 h-16">
          {/* Dashboard Tab */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 h-full rounded-none transition-colors",
                isActive
                  ? "text-dashboard-foreground bg-dashboard-foreground/10 hover:bg-dashboard-foreground/20 hover:text-dashboard-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboardIcon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                  Tổng quan
                </span>
              </>
            )}
          </NavLink>

          {/* Expenses Tab */}
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 h-full rounded-none transition-colors",
                isActive
                  ? "text-expense-foreground bg-expense-foreground/10 hover:bg-expense-foreground/20 hover:text-expense-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            {({ isActive }) => (
              <>
                <TrendingDown size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                  Chi tiêu
                </span>
              </>
            )}
          </NavLink>

          {/* Income Tab */}
          <NavLink
            to="/income"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 h-full rounded-none transition-colors",
                isActive
                  ? "text-income-foreground bg-income-foreground/10 hover:bg-income-foreground/20 hover:text-income-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            {({ isActive }) => (
              <>
                <TrendingUp size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                  Thu nhập
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

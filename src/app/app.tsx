import { DashboardPage } from "@/pages/dashboard-page";
import { ExpensePage } from "@/pages/expense-page";
import { IncomePage } from "@/pages/income-page";
import { BottomNav } from "@/widgets/bottom-nav";
import { useState } from "react";
import { ThemeProvider } from "./providers/theme-provider";

export function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "expenses" | "income">("dashboard");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background pb-16">
        {/* Main Content */}
        <div className="min-h-screen">
          {activeTab === "dashboard" && <DashboardPage />}
          {activeTab === "expenses" && <ExpensePage />}
          {activeTab === "income" && <IncomePage />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ThemeProvider>
  );
}

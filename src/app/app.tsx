import { DashboardPage } from "@/pages/dashboard";
import { ExpensePage } from "@/pages/expenses";
import { IncomePage } from "@/pages/incomes";
import { PageTransition } from "@/shared/composite";
import { BottomNav } from "@/widgets/bottom-nav";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Providers } from "./providers/providers";

/**
 * AppRoutes component - Contains routing logic with animations
 * Must be inside RouterProvider to use useLocation hook
 */
function AppRoutes() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Main Content */}
      <div className="min-h-screen">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <DashboardPage />
                </PageTransition>
              }
            />
            <Route
              path="/expenses"
              element={
                <PageTransition>
                  <ExpensePage />
                </PageTransition>
              }
            />
            <Route
              path="/income"
              element={
                <PageTransition>
                  <IncomePage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

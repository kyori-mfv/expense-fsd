import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { gridOutline, trendingDownOutline, trendingUpOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard";
import { ExpensePage } from "@/pages/expenses";
import { IncomePage } from "@/pages/incomes";

/**
 * AppRoutes component - Application routing structure
 *
 * Responsibilities:
 * - Define all application routes
 * - Configure bottom tab navigation
 * - Handle route redirects
 *
 * Uses Ionic React Router (v5) with:
 * - IonTabs: Tab-based navigation container
 * - IonRouterOutlet: Renders active page with native transitions
 * - IonTabBar: Native-styled bottom navigation
 */
export function AppRoutes() {
  return (
    <IonTabs>
      {/* Router Outlet - renders active page with Ionic transitions */}
      <IonRouterOutlet>
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/expenses" component={ExpensePage} />
        <Route exact path="/income" component={IncomePage} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </IonRouterOutlet>

      {/* Tab Bar - native-styled bottom navigation */}
      <IonTabBar
        slot="bottom"
        className="h-[65px] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <IonTabButton tab="dashboard" href="/dashboard" className="py-2">
          <IonIcon icon={gridOutline} className="text-[28px] mb-1" />
          <IonLabel className="text-[13px] font-medium">Tổng quan</IonLabel>
        </IonTabButton>

        <IonTabButton tab="expenses" href="/expenses" className="py-2">
          <IonIcon icon={trendingDownOutline} className="text-[28px] mb-1" />
          <IonLabel className="text-[13px] font-medium">Chi tiêu</IonLabel>
        </IonTabButton>

        <IonTabButton tab="income" href="/income" className="py-2">
          <IonIcon icon={trendingUpOutline} className="text-[28px] mb-1" />
          <IonLabel className="text-[13px] font-medium">Thu nhập</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

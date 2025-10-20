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
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={gridOutline} />
          <IonLabel>Tổng quan</IonLabel>
        </IonTabButton>

        <IonTabButton tab="expenses" href="/expenses">
          <IonIcon icon={trendingDownOutline} />
          <IonLabel>Chi tiêu</IonLabel>
        </IonTabButton>

        <IonTabButton tab="income" href="/income">
          <IonIcon icon={trendingUpOutline} />
          <IonLabel>Thu nhập</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

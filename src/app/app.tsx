import { useSafeArea } from "@/shared/react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { AppRoutes } from "./app-routes";
import { Providers } from "./providers/providers";

/**
 * Initialize Ionic React
 * Must be called before rendering IonApp components
 */
setupIonicReact({
  mode: "ios", // Use iOS style for native Apple look and feel
});

/**
 * App component - Application root
 *
 * Responsibilities:
 * - Compose application layers (Providers, Router, Routes)
 * - Initialize Ionic App wrapper
 * - Setup routing context
 * - Initialize safe area insets for Android/iOS
 *
 * Architecture:
 * - Providers: Theme, state management, global context
 * - IonApp: Ionic framework initialization
 * - IonReactRouter: Routing system (React Router v5)
 * - AppRoutes: Route definitions and navigation structure
 */
export function App() {
  // Initialize safe area insets (fixes Android status bar overlap)
  useSafeArea();

  return (
    <Providers>
      <IonApp>
        <IonReactRouter>
          <AppRoutes />
        </IonReactRouter>
      </IonApp>
    </Providers>
  );
}

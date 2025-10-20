import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers Component
 *
 * Composes all application-level providers.
 * Provider order matters - outer providers wrap inner ones.
 *
 * Current providers:
 * - ThemeProvider: Dark/light theme management
 *
 * Note: Routing is handled by IonReactRouter in app.tsx
 */
export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

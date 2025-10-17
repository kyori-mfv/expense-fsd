import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
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
 * - BrowserRouter: React Router for URL-based navigation
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
}

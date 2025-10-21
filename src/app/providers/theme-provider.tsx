import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Syncs Ionic's .ion-palette-dark class with next-themes
function IonicThemeSync() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    const isDark = resolvedTheme === "dark";

    // Toggle Ionic's dark mode class
    document.documentElement.classList.toggle("ion-palette-dark", isDark);
  }, [theme, systemTheme]);

  return null;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <IonicThemeSync />
      {children}
    </NextThemesProvider>
  );
};

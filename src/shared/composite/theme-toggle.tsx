import { IonButton, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { moonOutline, sunnyOutline } from "ionicons/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeToggle - Theme switcher with Ionic select
 *
 * A composite component that provides a native mobile picker for switching themes.
 * Uses IonSelect with a custom button trigger that displays only an icon.
 */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: CustomEvent) => {
    setTheme(e.detail.value);
  };

  return mounted ? (
    <div className="relative">
      <IonButton id="theme-toggle-trigger" fill="clear" className="h-10 w-10">
        <IonIcon slot="icon-only" icon={theme === "dark" ? moonOutline : sunnyOutline} />
      </IonButton>

      <IonSelect
        value={theme}
        onIonChange={handleThemeChange}
        interface="action-sheet"
        toggleIcon=""
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        <IonSelectOption value="light">Light</IonSelectOption>
        <IonSelectOption value="dark">Dark</IonSelectOption>
        <IonSelectOption value="system">System</IonSelectOption>
      </IonSelect>
    </div>
  ) : null;
};

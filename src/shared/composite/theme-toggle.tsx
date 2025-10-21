import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { contrastOutline, moonOutline, sunnyOutline } from "ionicons/icons";
import { useTheme } from "next-themes";

/**
 * ThemeToggle - Theme switcher with Ionic FAB and FAB list
 *
 * A composite component that provides an inline FAB menu for switching themes.
 * Uses IonFab without slot="fixed" to position relative to its container.
 */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <IonFab slot="fixed" vertical="top" horizontal="end" className="top-5 right-4">
      <IonFabButton size="small">
        <IonIcon icon={theme === "dark" ? moonOutline : sunnyOutline} />
      </IonFabButton>
      <IonFabList side="bottom" className="top-14 -right-2">
        <IonFabButton onClick={() => setTheme("light")} data-desc="Light">
          <IonIcon icon={sunnyOutline} />
        </IonFabButton>
        <IonFabButton onClick={() => setTheme("dark")} data-desc="Dark">
          <IonIcon icon={moonOutline} />
        </IonFabButton>
        <IonFabButton onClick={() => setTheme("system")} data-desc="System">
          <IonIcon icon={contrastOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

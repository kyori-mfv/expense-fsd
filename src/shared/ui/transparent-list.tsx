import { IonList } from "@ionic/react";
import type { ComponentProps } from "react";

/**
 * IonList with transparent background
 * Overrides Ionic's default white/gray background using CSS variables
 */
export function TransparentList({ className = "", ...props }: ComponentProps<typeof IonList>) {
  return (
    <IonList
      className={`ion-no-padding ${className}`}
      style={
        {
          "--background": "transparent",
          "--ion-item-background": "transparent",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

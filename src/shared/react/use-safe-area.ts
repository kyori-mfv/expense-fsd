import { SafeArea } from "capacitor-plugin-safe-area";
import { useEffect } from "react";

/**
 * Hook to initialize safe area insets for Android/iOS devices
 *
 * This hook solves the Android status bar overlap issue by:
 * 1. Getting actual safe area insets from native code (bypasses WebView bug)
 * 2. Setting CSS variables that can be used throughout the app
 *
 * The CSS variables created:
 * - --safe-area-inset-top: Status bar height
 * - --safe-area-inset-bottom: Navigation bar height
 * - --safe-area-inset-left: Left notch/cutout
 * - --safe-area-inset-right: Right notch/cutout
 *
 * Note: On Android, env(safe-area-inset-*) doesn't work due to Chrome WebView bug.
 * This plugin provides the correct values via native code.
 */
export function useSafeArea() {
  useEffect(() => {
    // Get safe area insets from native device
    SafeArea.getSafeAreaInsets()
      .then(({ insets }) => {
        // Set CSS variables on the root element
        for (const [key, value] of Object.entries(insets)) {
          document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
        }
      })
      .catch((error) => {
        console.error("Failed to get safe area insets:", error);
      });

    // Listen for safe area changes (orientation, keyboard, etc.)
    const listener = SafeArea.addListener("safeAreaChanged", (data) => {
      const { insets } = data;
      for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
      }
    });

    // Cleanup listener on unmount
    return () => {
      listener.then((handle) => handle.remove());
    };
  }, []);
}

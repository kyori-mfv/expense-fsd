import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.expensemanager.fsd",
  appName: "Expense Manager",
  webDir: "dist",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    Keyboard: {
      resize: "ionic",
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
};

export default config;

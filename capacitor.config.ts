import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.expensemanager.fsd",
  appName: "Expense Manager",
  webDir: "dist",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
};

export default config;

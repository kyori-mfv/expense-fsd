import { ExpensePage } from "@/pages/expense-page";
import { ThemeProvider } from "./providers/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <ExpensePage />
      </div>
    </ThemeProvider>
  );
}

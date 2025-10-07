// Public API - only expose what's needed by upper layers
export { expenseService } from "./api/expense.service";
export { ExpenseItem } from "./ui/expense-item";
export { ExpenseCategoryBadge } from "./ui/expense-category-badge";
export { ExpenseCategorySelect } from "./ui/expense-category-select";

// Query hooks
export {
  useRecentExpenses,
  useAllExpenses,
  useExpenseById,
  useExpenseCount,
} from "./model/use-expense-query";

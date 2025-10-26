import type { ExpenseRecord, IncomeRecord } from "../contract";

/**
 * Calculate financial statistics from expense and income data
 * Pure utility functions with no side effects
 */

export interface FinancialStats {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  savingsRate: number;
  incomeCount: number;
  expenseCount: number;
}

export function calculateFinancialStats(
  expenses: ExpenseRecord[],
  incomes: IncomeRecord[]
): FinancialStats {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    savingsRate,
    incomeCount: incomes.length,
    expenseCount: expenses.length,
  };
}

export interface CategoryStats {
  category: string;
  amount: number;
  count: number;
  percentage: number;
}

/**
 * Calculate category statistics for expenses
 * Separate from income to maintain FSD separation principle
 */
export function calculateExpenseCategoryStats(expenses: ExpenseRecord[]): CategoryStats[] {
  const categoryMap = new Map<string, { amount: number; count: number }>();
  let total = 0;

  // Group by category
  for (const expense of expenses) {
    const existing = categoryMap.get(expense.category) || { amount: 0, count: 0 };
    categoryMap.set(expense.category, {
      amount: existing.amount + expense.amount,
      count: existing.count + 1,
    });
    total += expense.amount;
  }

  // Convert to array with percentages
  return Array.from(categoryMap.entries())
    .map(([category, { amount, count }]) => ({
      category,
      amount,
      count,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Calculate category statistics for incomes
 * Separate from expense to maintain FSD separation principle
 */
export function calculateIncomeCategoryStats(incomes: IncomeRecord[]): CategoryStats[] {
  const categoryMap = new Map<string, { amount: number; count: number }>();
  let total = 0;

  // Group by category
  for (const income of incomes) {
    const existing = categoryMap.get(income.category) || { amount: 0, count: 0 };
    categoryMap.set(income.category, {
      amount: existing.amount + income.amount,
      count: existing.count + 1,
    });
    total += income.amount;
  }

  // Convert to array with percentages
  return Array.from(categoryMap.entries())
    .map(([category, { amount, count }]) => ({
      category,
      amount,
      count,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export interface MonthlyStats {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export function calculateMonthlyTrends(
  expenses: ExpenseRecord[],
  incomes: IncomeRecord[],
  months = 6
): MonthlyStats[] {
  const now = new Date();
  const stats: MonthlyStats[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const monthName = targetDate
      .toLocaleDateString("vi-VN", {
        month: "short",
        year: "numeric",
      })
      .replace(/^./, (c) => c.toUpperCase());

    const monthExpenses = expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate.getFullYear() === targetYear && expenseDate.getMonth() === targetMonth;
    });

    const monthIncomes = incomes.filter((i) => {
      const incomeDate = new Date(i.date);
      return incomeDate.getFullYear() === targetYear && incomeDate.getMonth() === targetMonth;
    });

    const expenseTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const incomeTotal = monthIncomes.reduce((sum, i) => sum + i.amount, 0);

    stats.push({
      month: monthName,
      income: incomeTotal,
      expense: expenseTotal,
      net: incomeTotal - expenseTotal,
    });
  }

  return stats;
}

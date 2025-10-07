import { useExpensesAll } from "@/entities/expense/model/use-expense-query";
import { useIncomesAll } from "@/entities/income/model/use-income-query";
import {
  calculateCategoryStats,
  calculateFinancialStats,
  calculateMonthlyTrends,
} from "@/shared/lib/calculate-stats";
import {
  type DatePreset,
  type DateRangeWithPreset,
  createCustomRange,
  datePresets,
  getLastNMonths,
  getThisMonth,
} from "@/shared/lib/date-presets";
import { DateRangeFilter } from "@/widgets/date-range-filter";
import { ExpenseCategoryChart } from "@/widgets/expense-category-chart";
import { FinancialOverview } from "@/widgets/financial-overview";
import { IncomeCategoryChart } from "@/widgets/income-category-chart";
import { MonthlyTrends } from "@/widgets/monthly-trends";
import { ArrowUpDownIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

export function DashboardPage() {
  // Date range for filtering (default to current month)
  const [dateRangeState, setDateRangeState] = useState<DateRangeWithPreset>(getThisMonth);

  // Calculate 6-month date range for trends (independent of filter)
  const trendDateRange = useMemo(() => getLastNMonths(6), []);

  // Query expenses and incomes for dashboard filter (no pagination)
  const expenses = useExpensesAll({
    dateFrom: dateRangeState.from,
    dateTo: dateRangeState.to,
  });

  const incomes = useIncomesAll({
    dateFrom: dateRangeState.from,
    dateTo: dateRangeState.to,
  });

  // Query expenses and incomes for 6-month trends (independent query, no pagination)
  const sixMonthExpenses = useExpensesAll({
    dateFrom: trendDateRange.from,
    dateTo: trendDateRange.to,
  });

  const sixMonthIncomes = useIncomesAll({
    dateFrom: trendDateRange.from,
    dateTo: trendDateRange.to,
  });

  // Calculate statistics for filtered data
  const financialStats = useMemo(
    () => calculateFinancialStats(expenses, incomes),
    [expenses, incomes]
  );

  const expenseCategoryStats = useMemo(() => calculateCategoryStats(expenses), [expenses]);

  const incomeCategoryStats = useMemo(() => calculateCategoryStats(incomes), [incomes]);

  // Calculate monthly trends for 6 months (independent of filter)
  const monthlyStats = useMemo(
    () => calculateMonthlyTrends(sixMonthExpenses, sixMonthIncomes, 6),
    [sixMonthExpenses, sixMonthIncomes]
  );

  // Date range handlers
  const handlePresetChange = useCallback((preset: DatePreset) => {
    if (preset === "custom") return; // Custom is handled by handleCustomRangeChange
    setDateRangeState(datePresets[preset]());
  }, []);

  const handleCustomRangeChange = useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRangeState(createCustomRange(range.from, range.to));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpDownIcon className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Dashboard Tổng quan</h1>
            <p className="text-sm text-muted-foreground">Tổng quan tài chính cá nhân</p>
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart (6 months fixed) */}
      <MonthlyTrends monthlyStats={monthlyStats} showNetLine />

      {/* Date Range Filter */}
      <DateRangeFilter
        dateRange={{ from: dateRangeState.from, to: dateRangeState.to }}
        preset={dateRangeState.preset}
        onPresetChange={handlePresetChange}
        onCustomRangeChange={handleCustomRangeChange}
      />

      {/* Financial Overview Cards */}
      <FinancialOverview
        totalIncome={financialStats.totalIncome}
        totalExpense={financialStats.totalExpense}
        netBalance={financialStats.netBalance}
        savingsRate={financialStats.savingsRate}
        incomeCount={financialStats.incomeCount}
        expenseCount={financialStats.expenseCount}
      />

      {/* Category Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseCategoryChart categoryStats={expenseCategoryStats} />
        <IncomeCategoryChart categoryStats={incomeCategoryStats} />
      </div>
    </div>
  );
}

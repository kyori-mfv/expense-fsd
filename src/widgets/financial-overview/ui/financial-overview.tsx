import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "./stat-card";

interface FinancialOverviewProps {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  savingsRate: number;
  incomeCount: number;
  expenseCount: number;
}

export function FinancialOverview({
  totalIncome,
  totalExpense,
  netBalance,
  savingsRate,
  incomeCount,
  expenseCount,
}: FinancialOverviewProps) {
  const isPositive = netBalance >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Income Card */}
      <StatCard
        title="Tổng thu nhập"
        value={totalIncome}
        subtitle={`${incomeCount} giao dịch`}
        icon={TrendingUp}
        borderColor="border-l-income"
        valueColor="text-income-foreground"
        iconBgColor="bg-income-light"
        iconColor="text-income-foreground"
        prefix="+"
      />

      {/* Total Expense Card */}
      <StatCard
        title="Tổng chi tiêu"
        value={totalExpense}
        subtitle={`${expenseCount} giao dịch`}
        icon={TrendingDown}
        borderColor="border-l-expense"
        valueColor="text-expense-foreground"
        iconBgColor="bg-expense-light"
        iconColor="text-expense-foreground"
        prefix="-"
      />

      {/* Net Balance Card */}
      <StatCard
        title="Số dư ròng"
        value={netBalance}
        subtitle={isPositive ? "Dương" : "Âm"}
        icon={Wallet}
        borderColor={isPositive ? "border-l-net-balance-positive" : "border-l-net-balance-negative"}
        valueColor={isPositive ? "text-net-balance-positive" : "text-net-balance-negative"}
        iconBgColor={isPositive ? "bg-net-balance-positive/10" : "bg-net-balance-negative/10"}
        iconColor={isPositive ? "text-net-balance-positive" : "text-net-balance-negative"}
        prefix={netBalance >= 0 ? "+" : ""}
      />

      {/* Savings Rate Card */}
      <StatCard
        title="Tỷ lệ tiết kiệm"
        value={`${savingsRate.toFixed(1)}%`}
        subtitle={totalIncome > 0 ? (isPositive ? "Tiết kiệm" : "Chi vượt") : "Chưa có thu nhập"}
        icon={PiggyBank}
        borderColor="border-l-savings"
        valueColor="text-savings-foreground"
        iconBgColor="bg-savings/10"
        iconColor="text-savings-foreground"
        isAmount={false}
      />
    </div>
  );
}

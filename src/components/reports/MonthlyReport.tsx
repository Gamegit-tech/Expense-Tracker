import { useState } from "react";
import StatCard from "./StatCard";
import MonthlyReportSelect from "./MonthlyReportSelect";
import MonthlySummaryTable from "./MonthlySummaryTable";
import CategoryBadge from "@/components/expenses/CategoryBadge";
import { useExpenses } from "@/context/ExpenseContext";
import {
  getAvailableReportMonths,
  getCurrentMonthKey,
  getMonthlyReportStats,
} from "@/utils/reportStats";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

export default function MonthlyReport() {
  const { expenses } = useExpenses();
  const availableMonths = getAvailableReportMonths(expenses);
  const defaultMonth =
    availableMonths.find((m) => m.value === getCurrentMonthKey())?.value ??
    availableMonths[0]?.value ??
    getCurrentMonthKey();

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const stats = getMonthlyReportStats(expenses, selectedMonth);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Monthly Report — {stats.monthLabel}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Key statistics for the selected month.
          </p>
        </div>
        <MonthlyReportSelect
          value={selectedMonth}
          onChange={setSelectedMonth}
          months={availableMonths}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          icon="trending-down"
          tone="negative"
        />
        <StatCard
          label="Total Transactions"
          value={String(stats.totalTransactions)}
          subtext="Income & expense entries"
          icon="list"
        />
        <StatCard
          label="Average Expense"
          value={formatCurrency(stats.averageExpense)}
          subtext="Per expense transaction"
          icon="credit-card"
        />
        <StatCard
          label="Largest Expense"
          value={stats.largestExpense ? formatCurrency(stats.largestExpense.amount) : "—"}
          subtext={
            stats.largestExpense
              ? `${stats.largestExpense.title} • ${formatDate(stats.largestExpense.date)}`
              : "No expenses this month"
          }
          icon="wallet"
          tone="negative"
        />
        <StatCard
          label="Highest Spending Category"
          value={stats.topCategory ? formatCurrency(stats.topCategory.amount) : "—"}
          subtext={stats.topCategory ? stats.topCategory.category : "No expenses this month"}
          icon="chart"
        />
        <StatCard
          label="Net Balance"
          value={`${stats.netBalance >= 0 ? "+" : "-"}${formatCurrency(
            Math.abs(stats.netBalance)
          )}`}
          subtext="Income minus expenses"
          icon="trending-up"
          tone={stats.netBalance >= 0 ? "positive" : "negative"}
        />
      </div>

      {stats.topCategory && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Top category this month
          </p>
          <div className="mt-2 flex items-center gap-2">
            <CategoryBadge category={stats.topCategory.category} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatCurrency(stats.topCategory.amount)} spent
            </span>
          </div>
        </div>
      )}

      <MonthlySummaryTable expenses={expenses} />
    </div>
  );
}
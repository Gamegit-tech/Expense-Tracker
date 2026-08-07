import { useMemo } from "react";
import { Expense, SummaryCardData } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { getMonthlyIncomeExpense } from "@/utils/chartData";

function percentChange(current: number, previous: number): { label: string; trend: "up" | "down" | "neutral" } {
  if (previous === 0) {
    if (current === 0) return { label: "0%", trend: "neutral" };
    return { label: "New", trend: "up" };
  }
  const diff = ((current - previous) / previous) * 100;
  const rounded = Math.round(diff * 10) / 10;
  const trend = rounded > 0 ? "up" : rounded < 0 ? "down" : "neutral";
  return { label: `${rounded > 0 ? "+" : ""}${rounded}%`, trend };
}

export function useSummaryData(expenses: Expense[]): SummaryCardData[] {
  return useMemo(() => {
    const totalIncome = expenses
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpenses = expenses
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpenses;

    const monthly = getMonthlyIncomeExpense(expenses).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
    const currentMonth = monthly[monthly.length - 1];
    const previousMonth = monthly[monthly.length - 2];

    const incomeChange = percentChange(
      currentMonth?.income ?? 0,
      previousMonth?.income ?? 0
    );
    const expenseChange = percentChange(
      currentMonth?.expense ?? 0,
      previousMonth?.expense ?? 0
    );

    const currentSavingsRate =
      currentMonth && currentMonth.income > 0
        ? ((currentMonth.income - currentMonth.expense) / currentMonth.income) * 100
        : 0;
    const previousSavingsRate =
      previousMonth && previousMonth.income > 0
        ? ((previousMonth.income - previousMonth.expense) / previousMonth.income) * 100
        : 0;
    const savingsChange = percentChange(currentSavingsRate, previousSavingsRate);

    const data: SummaryCardData[] = [
      {
        id: "balance",
        label: "Total Balance",
        value: formatCurrency(balance),
        icon: "wallet",
      },
      {
        id: "income",
        label: "Total Income",
        value: formatCurrency(totalIncome),
        change: incomeChange.label,
        trend: incomeChange.trend,
        icon: "trending-up",
      },
      {
        id: "expenses",
        label: "Total Expenses",
        value: formatCurrency(totalExpenses),
        change: expenseChange.label,
        trend: expenseChange.trend === "up" ? "down" : expenseChange.trend === "down" ? "up" : "neutral",
        icon: "trending-down",
      },
      {
        id: "savings",
        label: "Savings Rate",
        value: `${Math.round(currentSavingsRate)}%`,
        change: savingsChange.label,
        trend: savingsChange.trend,
        icon: "credit-card",
      },
    ];

    return data;
  }, [expenses]);
}
import { Expense, ExpenseCategory } from "@/types";

export interface CategoryChartDatum {
  category: ExpenseCategory;
  value: number;
}

export interface MonthlyChartDatum {
  month: string;
  monthLabel: string;
  income: number;
  expense: number;
}

export interface TrendChartDatum {
  date: string;
  dateLabel: string;
  balance: number;
}

const categoryColors: Record<ExpenseCategory, string> = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Shopping: "#ec4899",
  Education: "#6366f1",
  Rent: "#14b8a6",
  Utilities: "#f59e0b",
  Entertainment: "#a855f7",
  Health: "#f43f5e",
  Income: "#22c55e",
  Other: "#6b7280",
};

export function getCategoryColor(category: ExpenseCategory): string {
  return categoryColors[category] ?? "#6b7280";
}

export function getCategoryBreakdown(expenses: Expense[]): CategoryChartDatum[] {
  const totals = new Map<ExpenseCategory, number>();

  expenses
    .filter((e) => e.type === "expense")
    .forEach((expense) => {
      totals.set(
        expense.category,
        (totals.get(expense.category) ?? 0) + expense.amount
      );
    });

  return Array.from(totals.entries())
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);
}

export function getMonthlyIncomeExpense(expenses: Expense[]): MonthlyChartDatum[] {
  const monthMap = new Map<string, MonthlyChartDatum>();

  expenses.forEach((expense) => {
    const key = expense.date.slice(0, 7);
    if (!monthMap.has(key)) {
      const date = new Date(`${key}-01T00:00:00`);
      const monthLabel = date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      monthMap.set(key, { month: key, monthLabel, income: 0, expense: 0 });
    }

    const entry = monthMap.get(key)!;
    if (expense.type === "income") {
      entry.income += expense.amount;
    } else {
      entry.expense += expense.amount;
    }
  });

  return Array.from(monthMap.values()).sort((a, b) => a.month.localeCompare(b.month));
}

export function getBalanceTrend(expenses: Expense[]): TrendChartDatum[] {
  const sorted = [...expenses].sort((a, b) => a.date.localeCompare(b.date));

  let runningBalance = 0;
  const dailyMap = new Map<string, number>();

  sorted.forEach((expense) => {
    const delta = expense.type === "income" ? expense.amount : -expense.amount;
    dailyMap.set(expense.date, (dailyMap.get(expense.date) ?? 0) + delta);
  });

  const sortedDates = Array.from(dailyMap.keys()).sort((a, b) => a.localeCompare(b));

  return sortedDates.map((date) => {
    runningBalance += dailyMap.get(date) ?? 0;
    const dateLabel = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return { date, dateLabel, balance: runningBalance };
  });
}
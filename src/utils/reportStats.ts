import { Expense, ExpenseCategory } from "@/types";

export interface MonthlyReportStats {
  month: string;
  monthLabel: string;
  totalExpenses: number;
  totalIncome: number;
  totalTransactions: number;
  averageExpense: number;
  largestExpense: Expense | null;
  topCategory: { category: ExpenseCategory; amount: number } | null;
  netBalance: number;
}

export function getAvailableReportMonths(
  expenses: Expense[]
): { value: string; label: string }[] {
  const monthMap = new Map<string, string>();

  const addMonth = (key: string) => {
    if (!monthMap.has(key)) {
      const date = new Date(`${key}-01T00:00:00`);
      const label = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      monthMap.set(key, label);
    }
  };

  // Every month that actually has a transaction (any year)
  expenses.forEach((expense) => addMonth(expense.date.slice(0, 7)));

  // Determine the year range to fill in completely:
  // earliest transaction year (or current year if no data) through current year
  const currentYear = new Date().getFullYear();
  const transactionYears = expenses.map((e) => Number(e.date.slice(0, 4)));
  const earliestYear =
    transactionYears.length > 0 ? Math.min(...transactionYears) : currentYear;

  for (let year = earliestYear; year <= currentYear; year++) {
    for (let m = 0; m < 12; m++) {
      const date = new Date(year, m, 1);
      const key = date.toISOString().slice(0, 7);
      addMonth(key);
    }
  }

  return Array.from(monthMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => b.value.localeCompare(a.value));
}
export function getMonthlyReportStats(
  expenses: Expense[],
  month: string
): MonthlyReportStats {
  const monthExpenses = expenses.filter((e) => e.date.slice(0, 7) === month);

  const expenseOnly = monthExpenses.filter((e) => e.type === "expense");
  const incomeOnly = monthExpenses.filter((e) => e.type === "income");

  const totalExpenses = expenseOnly.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomeOnly.reduce((sum, e) => sum + e.amount, 0);
  const totalTransactions = monthExpenses.length;

  const averageExpense =
    expenseOnly.length > 0 ? totalExpenses / expenseOnly.length : 0;

  const largestExpense =
    expenseOnly.length > 0
      ? expenseOnly.reduce((max, e) => (e.amount > max.amount ? e : max), expenseOnly[0])
      : null;

  const categoryTotals = new Map<ExpenseCategory, number>();
  expenseOnly.forEach((e) => {
    categoryTotals.set(e.category, (categoryTotals.get(e.category) ?? 0) + e.amount);
  });

  let topCategory: { category: ExpenseCategory; amount: number } | null = null;
  categoryTotals.forEach((amount, category) => {
    if (!topCategory || amount > topCategory.amount) {
      topCategory = { category, amount };
    }
  });

  const date = new Date(`${month}-01T00:00:00`);
  const monthLabel = Number.isNaN(date.getTime())
    ? month
    : date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    month,
    monthLabel,
    totalExpenses,
    totalIncome,
    totalTransactions,
    averageExpense,
    largestExpense,
    topCategory,
    netBalance: totalIncome - totalExpenses,
  };
}

export function getCurrentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}
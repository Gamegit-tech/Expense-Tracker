import { Expense, MonthOption, SortOption } from "@/types";

export interface ExpenseFilterState {
  search: string;
  category: string;
  month: string;
  sort: SortOption;
}

export const defaultFilterState: ExpenseFilterState = {
  search: "",
  category: "all",
  month: "all",
  sort: "date-desc",
};

export function getAvailableMonths(expenses: Expense[]): MonthOption[] {
  const monthMap = new Map<string, MonthOption>();

  expenses.forEach((expense) => {
    const key = expense.date.slice(0, 7);
    if (!monthMap.has(key)) {
      const date = new Date(`${key}-01T00:00:00`);
      const label = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      monthMap.set(key, { value: key, label });
    }
  });

  return Array.from(monthMap.values()).sort((a, b) =>
    b.value.localeCompare(a.value)
  );
}

export function filterAndSortExpenses(
  expenses: Expense[],
  filters: ExpenseFilterState
): Expense[] {
  const query = filters.search.trim().toLowerCase();

  const filtered = expenses.filter((expense) => {
    const matchesSearch =
      !query ||
      [expense.title, expense.category, expense.notes ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      filters.category === "all" || expense.category === filters.category;

    const matchesMonth =
      filters.month === "all" || expense.date.slice(0, 7) === filters.month;

    return matchesSearch && matchesCategory && matchesMonth;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "date-asc":
        return a.date.localeCompare(b.date);
      case "date-desc":
        return b.date.localeCompare(a.date);
      case "amount-asc":
        return a.amount - b.amount;
      case "amount-desc":
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  return sorted;
}
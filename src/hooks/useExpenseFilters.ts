import { useMemo, useState } from "react";
import { Expense, SortOption } from "@/types";
import {
  ExpenseFilterState,
  defaultFilterState,
  filterAndSortExpenses,
  getAvailableMonths,
} from "@/utils/filters";

export function useExpenseFilters(expenses: Expense[]) {
  const [filters, setFilters] = useState<ExpenseFilterState>(defaultFilterState);

  const setSearch = (search: string) => setFilters((prev) => ({ ...prev, search }));
  const setCategory = (category: string) =>
    setFilters((prev) => ({ ...prev, category }));
  const setMonth = (month: string) => setFilters((prev) => ({ ...prev, month }));
  const setSort = (sort: SortOption) => setFilters((prev) => ({ ...prev, sort }));

  const resetFilters = () => setFilters(defaultFilterState);

  const availableMonths = useMemo(() => getAvailableMonths(expenses), [expenses]);

  const filteredExpenses = useMemo(
    () => filterAndSortExpenses(expenses, filters),
    [expenses, filters]
  );

  const isFiltered =
    filters.search.trim() !== "" ||
    filters.category !== "all" ||
    filters.month !== "all";

  return {
    filters,
    setSearch,
    setCategory,
    setMonth,
    setSort,
    resetFilters,
    availableMonths,
    filteredExpenses,
    isFiltered,
  };
}
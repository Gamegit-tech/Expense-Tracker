import { useCallback, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import SearchInput from "@/components/ui/SearchInput";
import EmptyState from "@/components/ui/EmptyState";
import { SkeletonRow } from "@/components/ui/Skeleton";
import ExpenseRow from "./ExpenseRow";
import ExpenseCard from "./ExpenseCard";
import CategoryFilter from "./CategoryFilter";
import MonthFilter from "./MonthFilter";
import SortSelect from "./SortSelect";
import EditExpenseModal from "./EditExpenseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useExpenses } from "@/context/ExpenseContext";
import { useExpenseFilters } from "@/hooks/useExpenseFilters";
import { Expense } from "@/types";

interface ExpenseTableProps {
  isLoading?: boolean;
}

export default function ExpenseTable({ isLoading = false }: ExpenseTableProps) {
  const { expenses } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const {
    filters,
    setSearch,
    setCategory,
    setMonth,
    setSort,
    resetFilters,
    availableMonths,
    filteredExpenses,
    isFiltered,
  } = useExpenseFilters(expenses);

  const handleEdit = useCallback((expense: Expense) => setEditingExpense(expense), []);
  const handleDeleteRequest = useCallback(
    (expense: Expense) => setDeletingExpense(expense),
    []
  );

  const skeletonRows = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              All Transactions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredExpenses.length} transaction
              {filteredExpenses.length === 1 ? "" : "s"}
            </p>
          </div>
          <SearchInput
            value={filters.search}
            onChange={setSearch}
            placeholder="Search by title, category, notes..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <CategoryFilter value={filters.category} onChange={setCategory} />
          <MonthFilter value={filters.month} onChange={setMonth} months={availableMonths} />
          <SortSelect value={filters.sort} onChange={setSort} />

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {skeletonRows.map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        </div>
      ) : filteredExpenses.length === 0 ? (
        <EmptyState
          icon="wallet"
          title={isFiltered ? "No matching transactions" : "No transactions yet"}
          description={
            isFiltered
              ? "Try adjusting your search or filters."
              : "Add your first expense or income to get started."
          }
          action={
            isFiltered ? (
              <button
                onClick={resetFilters}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Clear filters
              </button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60">
                <tr>
                  <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Title
                  </th>
                  <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredExpenses.map((expense) => (
                  <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        </>
      )}

      <EditExpenseModal expense={editingExpense} onClose={() => setEditingExpense(null)} />
      <DeleteConfirmModal expense={deletingExpense} onClose={() => setDeletingExpense(null)} />
    </div>
  );
}
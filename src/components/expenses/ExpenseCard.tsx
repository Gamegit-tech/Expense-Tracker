import { memo } from "react";
import Icon from "@/components/ui/Icon";
import CategoryBadge from "./CategoryBadge";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Expense } from "@/types";

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  const isIncome = expense.type === "income";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900 dark:text-gray-100">
            {expense.title}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {formatDate(expense.date)}
          </p>
        </div>
        <span
          className={`shrink-0 text-sm font-semibold ${
            isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(expense.amount)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <CategoryBadge category={expense.category} />
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(expense)}
            className="rounded-md p-2 text-gray-400 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-500 dark:hover:bg-primary-950 dark:hover:text-primary-400"
            aria-label={`Edit ${expense.title}`}
          >
            <Icon name="settings" className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(expense)}
            className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-950 dark:hover:text-red-400"
            aria-label={`Delete ${expense.title}`}
          >
            <Icon name="trash" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {expense.notes && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{expense.notes}</p>
      )}
    </div>
  );
}

export default memo(ExpenseCard);
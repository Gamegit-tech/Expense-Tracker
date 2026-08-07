import { memo } from "react";
import Icon from "@/components/ui/Icon";
import CategoryBadge from "./CategoryBadge";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Expense } from "@/types";

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

function ExpenseRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  const isIncome = expense.type === "income";

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900 dark:text-gray-100">{expense.title}</p>
        {expense.notes && (
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{expense.notes}</p>
        )}
      </td>
      <td className="px-5 py-4">
        <CategoryBadge category={expense.category} />
      </td>
      <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
        {formatDate(expense.date)}
      </td>
      <td
        className={`px-5 py-4 text-right font-semibold ${
          isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(expense.amount)}
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1">
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
      </td>
    </tr>
  );
}

export default memo(ExpenseRow);
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import { Expense } from "@/types";
import { useExpenses } from "@/context/ExpenseContext";
import { useToast } from "@/context/ToastContext";

interface DeleteConfirmModalProps {
  expense: Expense | null;
  onClose: () => void;
}

export default function DeleteConfirmModal({ expense, onClose }: DeleteConfirmModalProps) {
  const { deleteExpense } = useExpenses();
  const { showToast } = useToast();

  if (!expense) return null;

  const handleDelete = () => {
    deleteExpense(expense.id);
    showToast(`"${expense.title}" was deleted.`, "success");
    onClose();
  };

  return (
    <Modal isOpen={Boolean(expense)} onClose={onClose} title="Delete Expense">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
          <Icon name="alert-circle" className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {expense.title}
          </span>
          ? This action cannot be undone.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
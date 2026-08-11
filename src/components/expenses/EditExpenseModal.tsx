import { FormEvent, useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import FormField from "@/components/ui/FormField";
import { expenseCategories } from "@/data/categories";
import { validateExpense, hasErrors } from "@/utils/validateExpense";
import { useExpenses } from "@/context/ExpenseContext";
import { useToast } from "@/context/ToastContext";
import { Expense, ExpenseFormData, ExpenseFormErrors, ExpenseType } from "@/types";

interface EditExpenseModalProps {
  expense: Expense | null;
  onClose: () => void;
}

function toFormData(expense: Expense): ExpenseFormData {
  return {
    title: expense.title,
    amount: String(expense.amount),
    category: expense.category,
    type: expense.type,
    date: expense.date,
    notes: expense.notes ?? "",
  };
}

export default function EditExpenseModal({ expense, onClose }: EditExpenseModalProps) {
  const { updateExpense } = useExpenses();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ExpenseFormData | null>(
    expense ? toFormData(expense) : null
  );
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (expense) {
      setFormData(toFormData(expense));
      setErrors({});
    }
  }, [expense]);

  if (!expense || !formData) return null;

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (type: ExpenseType) => {
    setFormData((prev) => (prev ? { ...prev, type } : prev));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) return;

    const validationErrors = validateExpense(formData);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) {
      showToast("Please fix the errors before saving.", "error");
      return;
    }

    setIsSubmitting(true);

    const updated: Expense = {
      ...expense,
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category as Expense["category"],
      type: formData.type,
      date: formData.date,
      notes: formData.notes.trim() || undefined,
    };

    try {
      await updateExpense(updated);
      showToast("Changes saved successfully.", "success");
      onClose();
    } catch {
      showToast("Could not save changes. Check your connection and try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 dark:bg-gray-900 dark:text-gray-100 ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-800 dark:focus:ring-red-950"
        : "border-gray-200 focus:border-primary-400 focus:ring-primary-100 dark:border-gray-700 dark:focus:border-primary-500 dark:focus:ring-primary-900"
    }`;

  return (
    <Modal isOpen={Boolean(expense)} onClose={onClose} title="Edit Expense">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div
          role="radiogroup"
          aria-label="Transaction type"
          className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700"
        >
          <button
            type="button"
            role="radio"
            aria-checked={formData.type === "expense"}
            onClick={() => handleTypeChange("expense")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              formData.type === "expense"
                ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={formData.type === "income"}
            onClick={() => handleTypeChange("income")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              formData.type === "income"
                ? "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Income
          </button>
        </div>

        <FormField label="Title" htmlFor="edit-title" error={errors.title} required>
          <input
            id="edit-title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass(Boolean(errors.title))}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Amount" htmlFor="edit-amount" error={errors.amount} required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                ETB
              </span>
              <input
                id="edit-amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={`${inputClass(Boolean(errors.amount))} pl-12`}
              />
            </div>
          </FormField>

          <FormField label="Category" htmlFor="edit-category" error={errors.category} required>
            <select
              id="edit-category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={inputClass(Boolean(errors.category))}
            >
              <option value="">Select a category</option>
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Date" htmlFor="edit-date" error={errors.date} required>
          <input
            id="edit-date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={inputClass(Boolean(errors.date))}
          />
        </FormField>

        <FormField label="Notes" htmlFor="edit-notes" error={errors.notes}>
          <textarea
            id="edit-notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={`${inputClass(Boolean(errors.notes))} resize-none`}
          />
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
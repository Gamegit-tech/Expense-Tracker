import { FormEvent, useState } from "react";
import Icon from "@/components/ui/Icon";
import FormField from "@/components/ui/FormField";
import { expenseCategories } from "@/data/categories";
import { validateExpense, hasErrors } from "@/utils/validateExpense";
import { useExpenses } from "@/context/ExpenseContext";
import { useToast } from "@/context/ToastContext";
import { Expense, ExpenseFormData, ExpenseFormErrors, ExpenseType } from "@/types";

const initialFormData: ExpenseFormData = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};

const inputBaseClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 dark:bg-gray-900 dark:text-gray-100";
const inputValidClass =
  "border-gray-200 focus:border-primary-400 focus:ring-primary-100 dark:border-gray-700 dark:focus:border-primary-500 dark:focus:ring-primary-900";
const inputErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-800 dark:focus:ring-red-950";

function getInputClass(hasError: boolean): string {
  return `${inputBaseClass} ${hasError ? inputErrorClass : inputValidClass}`;
}

export default function ExpenseForm() {
  const { addExpense } = useExpenses();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ExpenseFormData>(initialFormData);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (type: ExpenseType) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateExpense(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    setIsSubmitting(true);

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category as Expense["category"],
      type: formData.type,
      date: formData.date,
      notes: formData.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    addExpense(newExpense);

    setFormData({ ...initialFormData, date: formData.date, type: formData.type });
    setErrors({});
    setIsSubmitting(false);
    showToast(
      formData.type === "income" ? "Income added successfully." : "Expense added successfully.",
      "success"
    );
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
          <Icon name="wallet" className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Add Expense</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Log a new income or expense transaction.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div role="radiogroup" aria-label="Transaction type" className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
          <button
            type="button"
            role="radio"
            aria-checked={formData.type === "expense"}
            onClick={() => handleTypeChange("expense")}
            className={
              formData.type === "expense"
                ? "flex-1 rounded-md py-2 text-sm font-medium transition-colors bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                : "flex-1 rounded-md py-2 text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }
          >
            Expense
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={formData.type === "income"}
            onClick={() => handleTypeChange("income")}
            className={
              formData.type === "income"
                ? "flex-1 rounded-md py-2 text-sm font-medium transition-colors bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                : "flex-1 rounded-md py-2 text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }
          >
            Income
          </button>
        </div>

        <FormField label="Title" htmlFor="title" error={errors.title} required>
          <input
            id="title"
            type="text"
            placeholder="e.g. Grocery shopping"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={getInputClass(Boolean(errors.title))}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Amount" htmlFor="amount" error={errors.amount} required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                ETB
              </span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={`${getInputClass(Boolean(errors.amount))} pl-12`}
              />
            </div>
          </FormField>

          <FormField label="Category" htmlFor="category" error={errors.category} required>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={getInputClass(Boolean(errors.category))}
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

        <FormField label="Date" htmlFor="date" error={errors.date} required>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={getInputClass(Boolean(errors.date))}
          />
        </FormField>

        <FormField label="Notes" htmlFor="notes" error={errors.notes}>
          <textarea
            id="notes"
            rows={3}
            placeholder="Optional notes about this transaction..."
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={`${getInputClass(Boolean(errors.notes))} resize-none`}
          />
          <p className="text-right text-xs text-gray-400 dark:text-gray-500">
            {formData.notes.length}/200
          </p>
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Icon name="wallet" className="h-4 w-4" />
            )}
            {isSubmitting ? "Adding..." : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
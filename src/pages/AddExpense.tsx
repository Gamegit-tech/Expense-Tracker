import ExpenseForm from "@/components/expenses/ExpenseForm";

export default function AddExpense() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Expense and Income</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Record a new expense or income entry to keep your budget accurate.
        </p>
      </div>

      <div className="max-w-2xl">
        <ExpenseForm />
      </div>
    </div>
  );
}
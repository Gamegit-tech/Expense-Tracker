import ExpenseTable from "@/components/expenses/ExpenseTable";

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search, filter, sort, edit, or delete any income or expense entry.
        </p>
      </div>

      <ExpenseTable />
    </div>
  );
}
import { useMemo } from "react";
import SummaryCard from "@/components/ui/SummaryCard";
import EmptyState from "@/components/ui/EmptyState";
import { useExpenses } from "@/context/ExpenseContext";
import { useSummaryData } from "@/hooks/useSummaryData";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Dashboard() {
  const { expenses } = useExpenses();
  const summaryData = useSummaryData(expenses);
  const recentTransactions = useMemo(() => expenses.slice(0, 6), [expenses]);
  const hasTransactions = recentTransactions.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of your income, expenses, and balance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryData.map((item) => (
          <SummaryCard key={item.id} data={item} />
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Recent Transactions
          </h2>
        </div>

        {!hasTransactions && (
          <div className="p-6">
            <EmptyState
              icon="wallet"
              title="No transactions yet"
              description="Add your first expense or income to see it here."
            />
          </div>
        )}

        {hasTransactions && (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentTransactions.map((tx) => {
              const isIncome = tx.type === "income";
              return (
                <li key={tx.id} className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {tx.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tx.category} • {tx.date}
                    </p>
                  </div>
                  <span
                    className={
                      isIncome
                        ? "text-sm font-semibold text-green-600 dark:text-green-400"
                        : "text-sm font-semibold text-red-600 dark:text-red-400"
                    }
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
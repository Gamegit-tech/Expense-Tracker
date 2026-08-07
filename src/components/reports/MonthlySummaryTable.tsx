import EmptyState from "@/components/ui/EmptyState";
import { getMonthlyIncomeExpense } from "@/utils/chartData";
import { formatCurrency } from "@/utils/formatCurrency";
import { Expense } from "@/types";

interface MonthlySummaryTableProps {
  expenses: Expense[];
}

export default function MonthlySummaryTable({ expenses }: MonthlySummaryTableProps) {
  const monthlyData = [...getMonthlyIncomeExpense(expenses)].sort((a, b) =>
    b.month.localeCompare(a.month)
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-100 p-5 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Monthly Summary
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Income, expenses, and net balance by month.
        </p>
      </div>

      {monthlyData.length === 0 ? (
        <div className="p-6">
          <EmptyState icon="chart" title="No transactions yet" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Month
                </th>
                <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Income
                </th>
                <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Expenses
                </th>
                <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Net
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {monthlyData.map((row) => {
                const net = row.income - row.expense;
                return (
                  <tr key={row.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-gray-100">
                      {row.monthLabel}
                    </td>
                    <td className="px-5 py-3.5 text-right text-green-600 dark:text-green-400">
                      +{formatCurrency(row.income)}
                    </td>
                    <td className="px-5 py-3.5 text-right text-red-600 dark:text-red-400">
                      -{formatCurrency(row.expense)}
                    </td>
                    <td
                      className={`px-5 py-3.5 text-right font-semibold ${
                        net >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {net >= 0 ? "+" : "-"}
                      {formatCurrency(Math.abs(net))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
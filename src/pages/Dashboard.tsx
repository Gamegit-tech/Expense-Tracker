import SummaryCard from "@/components/ui/SummaryCard";
import { summaryData } from "@/data/summary";
import { Transaction } from "@/types";

const recentTransactions: Transaction[] = [
  { id: "1", title: "Grocery Store", category: "Food", amount: -84.5, type: "expense", date: "Aug 5, 2026" },
  { id: "2", title: "Freelance Payment", category: "Income", amount: 1200, type: "income", date: "Aug 3, 2026" },
  { id: "3", title: "Electric Bill", category: "Utilities", amount: -62.3, type: "expense", date: "Aug 2, 2026" },
  { id: "4", title: "Gym Membership", category: "Health", amount: -45, type: "expense", date: "Aug 1, 2026" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your income, expenses, and balance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryData.map((item) => (
          <SummaryCard key={item.id} data={item} />
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Transactions
          </h2>
          <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all
          </a>
        </div>

        <ul className="divide-y divide-gray-100">
          {recentTransactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-gray-900">{tx.title}</p>
                <p className="text-xs text-gray-500">
                  {tx.category} • {tx.date}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  tx.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}$
                {Math.abs(tx.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
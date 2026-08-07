import CategoryPieChart from "@/components/charts/CategoryPieChart";
import IncomeExpenseBarChart from "@/components/charts/IncomeExpenseBarChart";
import BalanceLineChart from "@/components/charts/BalanceLineChart";
import MonthlyReport from "@/components/reports/MonthlyReport";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visual breakdown of your income, expenses, and balance over time.
        </p>
      </div>

      <MonthlyReport />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CategoryPieChart />
        <IncomeExpenseBarChart />
      </div>

      <BalanceLineChart />
    </div>
  );
}
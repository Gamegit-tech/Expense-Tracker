import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartCard from "./ChartCard";
import { useExpenses } from "@/context/ExpenseContext";
import { getCategoryBreakdown, getCategoryColor } from "@/utils/chartData";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CategoryPieChart() {
  const { expenses } = useExpenses();
  const data = getCategoryBreakdown(expenses);

  return (
    <ChartCard
      title="Spending by Category"
      subtitle="Breakdown of expenses across categories"
      isEmpty={data.length === 0}
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={getCategoryColor(entry.category)} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
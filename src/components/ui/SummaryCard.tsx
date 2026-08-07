import { memo } from "react";
import Icon from "./Icon";
import { SummaryCardData } from "@/types";

interface SummaryCardProps {
  data: SummaryCardData;
}

const iconStyles: Record<SummaryCardData["icon"], string> = {
  wallet: "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400",
  "trending-up": "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  "trending-down": "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  "credit-card": "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
};

const trendStyles: Record<NonNullable<SummaryCardData["trend"]>, string> = {
  up: "text-green-600 dark:text-green-400",
  down: "text-red-600 dark:text-red-400",
  neutral: "text-gray-500 dark:text-gray-400",
};

function SummaryCard({ data }: SummaryCardProps) {
  const { label, value, change, trend, icon } = data;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconStyles[icon]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>

      {change && trend && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium">
          <Icon
            name={trend === "down" ? "trending-down" : "trending-up"}
            className={`h-3.5 w-3.5 ${trendStyles[trend]}`}
          />
          <span className={trendStyles[trend]}>{change}</span>
          <span className="text-gray-400 dark:text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
}

export default memo(SummaryCard);
import { ReactNode } from "react";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isEmpty?: boolean;
  isLoading?: boolean;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  isEmpty,
  isLoading,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : isEmpty ? (
        <EmptyState icon="chart" title="No data to display yet" />
      ) : (
        children
      )}
    </div>
  );
}
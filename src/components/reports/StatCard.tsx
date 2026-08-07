import Icon, { IconName } from "@/components/ui/Icon";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: IconName;
  tone?: "default" | "positive" | "negative";
}

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400",
  positive: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  negative: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
};

export default function StatCard({
  label,
  value,
  subtext,
  icon,
  tone = "default",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 truncate text-xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {subtext && (
            <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">{subtext}</p>
          )}
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneStyles[tone]}`}
        >
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
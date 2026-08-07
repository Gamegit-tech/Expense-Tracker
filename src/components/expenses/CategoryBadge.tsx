import { memo } from "react";
import { ExpenseCategory } from "@/types";

const categoryStyles: Record<ExpenseCategory, string> = {
  Food: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Transport: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Shopping: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  Education: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Rent: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  Utilities: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Entertainment: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Health: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  Other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

interface CategoryBadgeProps {
  category: ExpenseCategory;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}

export default memo(CategoryBadge);
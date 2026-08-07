export type View = "dashboard" | "add-expense" | "transactions" | "reports";

export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Education"
  | "Rent"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Other";

export type ExpenseType = "income" | "expense";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  type: ExpenseType;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  category: ExpenseCategory | "";
  type: ExpenseType;
  date: string;
  notes: string;
}

export type ExpenseFormErrors = Partial<Record<keyof ExpenseFormData, string>>;

export type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export interface MonthOption {
  value: string;
  label: string;
}

export type SummaryIcon = "wallet" | "trending-up" | "trending-down" | "credit-card";

export interface SummaryCardData {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: SummaryIcon;
}
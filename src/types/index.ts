export interface SummaryCardData {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: "wallet" | "trending-up" | "trending-down" | "credit-card";
}

export interface NavItem {
  id: string;
  label: string;
  icon: "home" | "list" | "chart" | "settings" | "wallet";
  href: string;
  active?: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}
import { SummaryCardData } from "@/types";

export const summaryData: SummaryCardData[] = [
  {
    id: "balance",
    label: "Total Balance",
    value: "$4,250.00",
    change: "+2.4%",
    trend: "up",
    icon: "wallet",
  },
  {
    id: "income",
    label: "Total Income",
    value: "$6,800.00",
    change: "+8.1%",
    trend: "up",
    icon: "trending-up",
  },
  {
    id: "expenses",
    label: "Total Expenses",
    value: "$2,550.00",
    change: "-3.2%",
    trend: "down",
    icon: "trending-down",
  },
  {
    id: "savings",
    label: "Savings Rate",
    value: "37.5%",
    change: "+1.1%",
    trend: "up",
    icon: "credit-card",
  },
];
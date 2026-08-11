import { Expense, ExpenseCategory, ExpenseType } from "@/types";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/expenses`;
const TOKEN_KEY = "expense-tracker:token";

interface ApiExpense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  type: ExpenseType;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapApiExpenseToExpense(apiExpense: ApiExpense): Expense {
  return {
    id: apiExpense._id,
    title: apiExpense.title,
    amount: apiExpense.amount,
    category: apiExpense.category as ExpenseCategory,
    type: apiExpense.type,
    date: apiExpense.date.slice(0, 10),
    notes: apiExpense.notes,
    createdAt: apiExpense.createdAt,
  };
}

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetch(API_BASE_URL, {
    headers: { ...getAuthHeaders() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  const data: ApiExpense[] = await response.json();
  return data.map(mapApiExpenseToExpense);
}

export async function createExpenseApi(
  expense: Omit<Expense, "id" | "createdAt">
): Promise<Expense> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  const data: ApiExpense = await response.json();
  return mapApiExpenseToExpense(data);
}

export async function updateExpenseApi(expense: Expense): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/${expense.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  const data: ApiExpense = await response.json();
  return mapApiExpenseToExpense(data);
}

export async function deleteExpenseApi(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}
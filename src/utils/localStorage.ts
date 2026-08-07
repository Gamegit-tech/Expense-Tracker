import { Expense } from "@/types";

const STORAGE_KEY = "expense-tracker:expenses";

export function loadExpenses(): Expense[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    return parsed as Expense[];
  } catch {
    return null;
  }
}

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // Storage may be full or unavailable (private browsing, quota exceeded).
    // Fail silently so the app keeps working in memory.
  }
}

export function clearStoredExpenses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
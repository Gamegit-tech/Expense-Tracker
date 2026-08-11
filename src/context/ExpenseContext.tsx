import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Expense } from "@/types";
import {
  fetchExpenses,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "@/services/expenseApi";

interface ExpenseContextValue {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  refreshExpenses: () => Promise<void>;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
      localStorage.setItem("expense-tracker:last-known", JSON.stringify(data));
    } catch (err) {
      const cached = localStorage.getItem("expense-tracker:last-known");
      if (cached) {
        setExpenses(JSON.parse(cached));
        setError("You're offline — showing your last saved data. Changes won't be saved until you're back online.");
      } else {
        setError("Could not load expenses. Is the server running?");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const addExpense = async (expense: Omit<Expense, "id" | "createdAt">) => {
    setError(null);
    try {
      const created = await createExpenseApi(expense);
      setExpenses((prev) => [created, ...prev]);
    } catch (err) {
      setError("Failed to add expense.");
      console.error(err);
      throw err;
    }
  };

  const updateExpense = async (expense: Expense) => {
    setError(null);
    try {
      const updated = await updateExpenseApi(expense);
      setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } catch (err) {
      setError("Failed to update expense.");
      console.error(err);
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    setError(null);
    try {
      await deleteExpenseApi(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError("Failed to delete expense.");
      console.error(err);
      throw err;
    }
  };

  const totalIncome = useMemo(
    () => expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const totalExpenses = useMemo(
    () => expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const balance = totalIncome - totalExpenses;

  const value: ExpenseContextValue = {
    expenses,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses: loadExpenses,
    totalExpenses,
    totalIncome,
    balance,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses(): ExpenseContextValue {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  ReactNode,
} from "react";
import { Expense } from "@/types";
import { seedExpenses } from "@/data/seedExpenses";
import { loadExpenses, saveExpenses, clearStoredExpenses } from "@/utils/localStorage";

interface ExpenseState {
  expenses: Expense[];
}

type ExpenseAction =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "UPDATE_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: { id: string } }
  | { type: "CLEAR_EXPENSES" }
  | { type: "SET_EXPENSES"; payload: Expense[] };

interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  clearExpenses: () => void;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
}

function getInitialState(): ExpenseState {
  const stored = loadExpenses();
  return { expenses: stored ?? seedExpenses };
}

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload.id),
      };
    case "CLEAR_EXPENSES":
      return { ...state, expenses: [] };
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    default:
      return state;
  }
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, undefined, getInitialState);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveExpenses(state.expenses);
  }, [state.expenses]);

  const addExpense = (expense: Expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: expense });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE_EXPENSE", payload: { id } });
  };

  const clearExpenses = () => {
    dispatch({ type: "CLEAR_EXPENSES" });
    clearStoredExpenses();
  };

  const totalIncome = useMemo(
    () =>
      state.expenses
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0),
    [state.expenses]
  );

  const totalExpenses = useMemo(
    () =>
      state.expenses
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0),
    [state.expenses]
  );

  const balance = totalIncome - totalExpenses;

  const value: ExpenseContextValue = {
    expenses: state.expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses,
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
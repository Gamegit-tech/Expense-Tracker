import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ui/ToastContainer";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ExpenseProvider>
          <App />
          <ToastContainer />
        </ExpenseProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
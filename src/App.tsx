import { lazy, Suspense, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLoader from "@/components/ui/PageLoader";
import AuthPage from "@/pages/AuthPage";
import { useAuth } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { View } from "@/types";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AddExpense = lazy(() => import("@/pages/AddExpense"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const Reports = lazy(() => import("@/pages/Reports"));

function App() {
  const { user, isLoading } = useAuth();
  const [view, setView] = useState<View>("dashboard");

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderView = () => {
    switch (view) {
      case "add-expense":
        return <AddExpense />;
      case "transactions":
        return <Transactions />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ExpenseProvider>
      <Layout activeView={view} onNavigate={setView}>
        <Suspense fallback={<PageLoader />}>{renderView()}</Suspense>
      </Layout>
    </ExpenseProvider>
  );
}

export default App;
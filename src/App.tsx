import { lazy, Suspense, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLoader from "@/components/ui/PageLoader";
import { View } from "@/types";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AddExpense = lazy(() => import("@/pages/AddExpense"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const Reports = lazy(() => import("@/pages/Reports"));

function App() {
  const [view, setView] = useState<View>("dashboard");

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
    <Layout activeView={view} onNavigate={setView}>
      <Suspense fallback={<PageLoader />}>{renderView()}</Suspense>
    </Layout>
  );
}

export default App;
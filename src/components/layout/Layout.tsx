import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { View } from "@/types";

interface LayoutProps {
  children: ReactNode;
  activeView: View;
  onNavigate: (view: View) => void;
}

export default function Layout({ children, activeView, onNavigate }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
        Skip to main content
      </a>

      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeView={activeView} onNavigate={onNavigate} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main id="main-content" className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
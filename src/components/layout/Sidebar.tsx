import Icon, { IconName } from "@/components/ui/Icon";
import { View } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: View;
  onNavigate: (view: View) => void;
}

interface SidebarNavItem {
  id: View;
  label: string;
  icon: IconName;
}

const navItems: SidebarNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "add-expense", label: "Add Expense and Income", icon: "wallet" },
  { id: "transactions", label: "Transactions", icon: "list" },
  { id: "reports", label: "Reports", icon: "chart" },
];

export default function Sidebar({ isOpen, onClose, activeView, onNavigate }: SidebarProps) {
  const handleNavigate = (view: View) => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-20 bg-gray-900/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={
          "fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-950 lg:static lg:translate-x-0 " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex h-16 items-center justify-between px-5 lg:hidden">
          <span className="text-base font-semibold text-gray-900 dark:text-gray-100">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.id === activeView;
            const linkClass = isActive
              ? "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
              : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100";

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={linkClass}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="rounded-lg bg-primary-50 p-3 dark:bg-primary-950">
            <p className="text-xs font-medium text-primary-700 dark:text-primary-300">
              This month
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Track your spending as you go.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
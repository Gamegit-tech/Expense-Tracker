import Icon from "@/components/ui/Icon";
import { navItems } from "@/data/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 lg:hidden">
          <span className="text-base font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {navItems.map((item) => (
            
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="rounded-lg bg-primary-50 p-3">
            <p className="text-xs font-medium text-primary-700">This month</p>
            <p className="mt-1 text-sm text-gray-700">
              You saved 37.5% of your income.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
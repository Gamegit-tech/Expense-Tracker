import Icon from "@/components/ui/Icon";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              $
            </div>
            <span className="hidden text-lg font-semibold text-gray-900 sm:block">
              Expense Tracker
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Icon name="bell" className="h-5 w-5" />
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-gray-200 py-1.5 pl-1.5 pr-2.5 hover:bg-gray-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
              JD
            </div>
            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              John Doe
            </span>
            <Icon name="chevron-down" className="hidden h-4 w-4 text-gray-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-gray-500 dark:text-gray-400 sm:flex-row lg:px-6">
        <span>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">
            Terms
          </a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
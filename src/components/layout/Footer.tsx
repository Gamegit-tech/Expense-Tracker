export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="flex flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-gray-500 sm:flex-row lg:px-6">
        <span>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-700">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-700">
            Terms
          </a>
          <a href="#" className="hover:text-gray-700">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
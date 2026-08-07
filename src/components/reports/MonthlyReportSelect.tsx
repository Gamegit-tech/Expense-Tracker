interface MonthlyReportSelectProps {
  value: string;
  onChange: (value: string) => void;
  months: { value: string; label: string }[];
}

export default function MonthlyReportSelect({
  value,
  onChange,
  months,
}: MonthlyReportSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-primary-500 dark:focus:ring-primary-900"
      aria-label="Select report month"
    >
      {months.length === 0 && <option value="">No data</option>}
      {months.map((month) => (
        <option key={month.value} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  );
}
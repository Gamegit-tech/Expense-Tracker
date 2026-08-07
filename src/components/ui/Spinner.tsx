interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export default function Spinner({ size = "md", label = "Loading" }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <span
        className={`inline-block animate-spin rounded-full border-primary-600 border-t-transparent dark:border-primary-400 dark:border-t-transparent ${sizeMap[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
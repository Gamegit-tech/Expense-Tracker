import { useEffect, useState } from "react";
import Icon, { IconName } from "./Icon";
import { ToastItem, ToastType } from "@/context/ToastContext";

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

interface ToastConfigEntry {
  icon: IconName;
  className: string;
  iconClassName: string;
}

const toastConfig: Record<ToastType, ToastConfigEntry> = {
  success: {
    icon: "check-circle",
    className:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: "alert-circle",
    className:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  info: {
    icon: "info",
    className:
      "border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-900 dark:bg-primary-950 dark:text-primary-300",
    iconClassName: "text-primary-600 dark:text-primary-400",
  },
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const config = toastConfig[toast.type];

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLeaving(true), 3600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    window.setTimeout(() => onDismiss(toast.id), 150);
  };

  return (
    <div
      role="status"
      className={`flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-150 animate-slide-in ${config.className} ${
        isLeaving ? "translate-x-2 opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <Icon name={config.icon} className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClassName}`} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleDismiss}
        className="shrink-0 rounded-md p-0.5 opacity-70 hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <Icon name="close" className="h-4 w-4" />
      </button>
    </div>
  );
}
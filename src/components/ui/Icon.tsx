import { SVGProps } from "react";

export type IconName =
  | "home"
  | "list"
  | "chart"
  | "settings"
  | "wallet"
  | "trending-up"
  | "trending-down"
  | "credit-card"
  | "menu"
  | "close"
  | "bell"
  | "chevron-down"
  | "sun"
  | "moon"
  | "check-circle"
  | "alert-circle"
  | "info"
  | "trash"
  | "search";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

const paths: Record<IconName, string> = {
  home: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z",
  list: "M4 6h16M4 12h16M4 18h10",
  chart: "M4 20V10m6 10V4m6 16v-7",
  settings:
    "M10.3 3.2a1.9 1.9 0 0 1 3.4 0l.3.6a1.9 1.9 0 0 0 2.3.9l.6-.2a1.9 1.9 0 0 1 2.4 2.4l-.2.6a1.9 1.9 0 0 0 .9 2.3l.6.3a1.9 1.9 0 0 1 0 3.4l-.6.3a1.9 1.9 0 0 0-.9 2.3l.2.6a1.9 1.9 0 0 1-2.4 2.4l-.6-.2a1.9 1.9 0 0 0-2.3.9l-.3.6a1.9 1.9 0 0 1-3.4 0l-.3-.6a1.9 1.9 0 0 0-2.3-.9l-.6.2a1.9 1.9 0 0 1-2.4-2.4l.2-.6a1.9 1.9 0 0 0-.9-2.3l-.6-.3a1.9 1.9 0 0 1 0-3.4l.6-.3a1.9 1.9 0 0 0 .9-2.3l-.2-.6a1.9 1.9 0 0 1 2.4-2.4l.6.2a1.9 1.9 0 0 0 2.3-.9l.3-.6ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  wallet:
    "M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm14 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  "trending-up": "M3 17l6-6 4 4 8-8M15 7h6v6",
  "trending-down": "M3 7l6 6 4-4 8 8M21 11v6h-6",
  "credit-card": "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm0 4h20",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6 6 18",
  bell: "M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0m6 0H9",
  "chevron-down": "M6 9l6 6 6-6",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m14.14 6.14 1.42 1.42M4.44 4.44l1.42 1.42m0 12.28-1.42 1.42M19.56 4.44l-1.42 1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  moon: "M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z",
  "check-circle": "M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  "alert-circle": "M12 8v5m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  info: "M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  trash: "M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7h12Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
};

export default function Icon({ name, className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
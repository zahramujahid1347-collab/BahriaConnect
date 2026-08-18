import Link from "next/link";

/**
 * The BahriaConnect mark — a house-shield-checkmark motif.
 * Icon in Trust Ink with an Amber checkmark accent, per the brand kit.
 */
export function LogoMark({
  className = "h-9 w-9",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const houseFill = variant === "light" ? "#F5F1E8" : "#1E4D5C";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 3.5 42.5 10v11.8c0 10.3-7.6 18.7-18.5 22.7C13.1 40.5 5.5 32.1 5.5 21.8V10L24 3.5Z"
        fill="#1E4D5C"
      />
      <path
        d="M24 12.5 34.5 20.5H31.5v10.5h-15V20.5h-3L24 12.5Z"
        fill={houseFill}
      />
      <path
        d="M17.5 23l4.6 4.6 8.4-8.6"
        fill="none"
        stroke="#E8B04B"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const color = variant === "light" ? "text-white" : "text-ink";
  return (
    <span
      className={`font-display text-lg font-extrabold tracking-tight ${color} ${className}`}
    >
      Bahria<span className="text-amber">Connect</span>
    </span>
  );
}

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="BahriaConnect home"
    >
      <LogoMark variant={variant} className="h-9 w-9 shrink-0" />
      <Wordmark variant={variant} />
    </Link>
  );
}

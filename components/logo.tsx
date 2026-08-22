import Link from "next/link";

/**
 * The BahriaConnect mark — a shield with a house-check motif.
 * Seal green fill, brass outline, paper checkmark.
 */
export function LogoMark({
  className = "h-8 w-8",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const check = variant === "light" ? "#F6F3EA" : "#2F5D3A";
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 3 L57 13 V30 C57 45 47 55 32 61 C17 55 7 45 7 30 V13 Z"
        fill="#2F5D3A"
      />
      <path
        d="M32 3 L57 13 V30 C57 45 47 55 32 61 C17 55 7 45 7 30 V13 Z"
        stroke="#B8863B"
        strokeWidth="1.5"
      />
      <path
        d="M20 32.5 L28 40.5 L45 22"
        stroke={check}
        strokeWidth="5"
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
  const color = variant === "light" ? "text-paper" : "text-ink";
  return (
    <span
      className={`font-display text-[19px] tracking-tight ${color} ${className}`}
    >
      BahriaConnect
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
      <LogoMark variant={variant} className="h-8 w-8 shrink-0" />
      <Wordmark variant={variant} />
    </Link>
  );
}

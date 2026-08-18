const palette = [
  "bg-primary text-primary-content",
  "bg-success text-success-content",
  "bg-ink text-white",
  "bg-sky text-info-content",
  "bg-amber text-warning-content",
  "bg-charcoal text-white",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function InitialsAvatar({
  name,
  className = "h-12 w-12",
  textClassName = "text-base",
}: {
  name: string;
  className?: string;
  textClassName?: string;
}) {
  // Deterministic color from the name so each provider keeps a stable identity.
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const color = palette[hash % palette.length];
  return (
    <div
      className={`avatar avatar-placeholder ${className}`}
      aria-label={name}
      role="img"
    >
      <div className={`rounded-full ring-2 ring-cream ${color}`}>
        <span className={`font-display font-bold ${textClassName}`}>
          {initials(name)}
        </span>
      </div>
    </div>
  );
}

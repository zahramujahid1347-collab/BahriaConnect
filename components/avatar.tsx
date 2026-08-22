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
  textClassName = "text-lg",
}: {
  name: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-sage font-display text-seal-dark ${className}`}
      aria-label={name}
      role="img"
    >
      <span className={textClassName}>{initials(name)}</span>
    </div>
  );
}

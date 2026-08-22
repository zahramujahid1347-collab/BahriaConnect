export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-seal-light/90">
      {children}
    </p>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
          {description}
        </p>
      )}
    </div>
  );
}

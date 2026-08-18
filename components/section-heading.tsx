export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-badge text-xs font-bold uppercase tracking-[0.16em] text-ink">
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
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-gray">
          {description}
        </p>
      )}
    </div>
  );
}

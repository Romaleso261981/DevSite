type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-10 max-w-3xl md:mb-14 ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--white)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-300/90 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

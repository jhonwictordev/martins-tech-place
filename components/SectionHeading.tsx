type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{description}</p> : null}
    </div>
  );
}

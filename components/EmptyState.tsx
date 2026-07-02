type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-950/50 px-6 py-14 text-center">
      <p className="font-display text-2xl text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
}

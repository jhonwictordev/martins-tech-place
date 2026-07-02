import { formatCurrency, formatCompactNumber } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: number;
  currency?: boolean;
  hint: string;
};

export function MetricCard({ title, value, currency, hint }: MetricCardProps) {
  return (
    <div className="surface rounded-[1.75rem] p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-4 font-display text-4xl text-white">
        {currency ? formatCurrency(value) : formatCompactNumber(value)}
      </p>
      <p className="mt-3 text-sm text-slate-300">{hint}</p>
    </div>
  );
}

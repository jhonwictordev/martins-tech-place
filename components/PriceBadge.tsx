import { formatCurrency } from "@/lib/utils";

type PriceBadgeProps = {
  price: number;
  currencyId?: string;
  originalPrice?: number | null;
};

export function PriceBadge({ price, currencyId = "BRL", originalPrice }: PriceBadgeProps) {
  return (
    <div className="flex flex-col gap-1">
      {originalPrice && originalPrice > price ? (
        <span className="text-sm text-slate-400 line-through">
          {formatCurrency(originalPrice, currencyId)}
        </span>
      ) : null}
      <span className="text-2xl font-bold text-success">{formatCurrency(price, currencyId)}</span>
    </div>
  );
}

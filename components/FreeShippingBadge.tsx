import { Truck } from "lucide-react";

export function FreeShippingBadge({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-cyan/15 px-3 py-1 text-xs font-semibold text-cyan">
      <Truck className="h-3.5 w-3.5" />
      Frete gratis
    </span>
  );
}

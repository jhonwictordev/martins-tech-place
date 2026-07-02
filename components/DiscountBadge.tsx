import { Tag } from "lucide-react";

export function DiscountBadge({ percentage }: { percentage: number }) {
  if (percentage <= 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
      <Tag className="h-3.5 w-3.5" />
      {percentage}% OFF
    </span>
  );
}

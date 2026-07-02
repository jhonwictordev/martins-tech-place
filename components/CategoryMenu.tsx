import Link from "next/link";
import type { CategorySummary } from "@/lib/storefront";
import { cn } from "@/lib/utils";

type CategoryMenuProps = {
  categories: CategorySummary[];
  compact?: boolean;
};

export function CategoryMenu({ categories, compact = false }: CategoryMenuProps) {
  return (
    <div className={cn("flex gap-3 overflow-x-auto pb-2", compact ? "flex-nowrap" : "flex-wrap")}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${category.slug}`}
          className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan hover:text-cyan"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

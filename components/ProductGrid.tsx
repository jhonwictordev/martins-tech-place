import type { StorefrontProduct } from "@/lib/storefront";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";

type ProductGridProps = {
  products: StorefrontProduct[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function ProductGrid({
  products,
  emptyTitle = "Nenhum produto encontrado",
  emptyDescription = "Ajuste os filtros ou sincronize mais itens do Mercado Livre para popular este catalogo."
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

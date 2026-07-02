import type { Metadata } from "next";
import { Pagination } from "@/components/Pagination";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getCategorySummaries, getStorefrontProducts } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Produtos de tecnologia sincronizados",
  description:
    "Explore o catalogo da Martins Tech Place com filtros por categoria, faixa de preco, marca, condicao e frete gratis."
});

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const [categories, result] = await Promise.all([
    getCategorySummaries(),
    getStorefrontProducts(resolvedSearchParams)
  ]);

  const currentValues = Object.fromEntries(
    Object.entries(resolvedSearchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  ) as Record<string, string | undefined>;

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Catalogo"
          title="Produtos sincronizados do Mercado Livre"
          description="Filtre por categoria, preco, condicao, frete gratis, estoque e ordenacao para encontrar a melhor oferta em tecnologia."
        />
        <ProductFilters
          categories={categories}
          brands={result.availableBrands}
          currentValues={currentValues}
        />
        <ProductGrid products={result.products} />
        <Pagination
          currentPage={result.page}
          totalItems={result.total}
          pageSize={result.pageSize}
          pathname="/produtos"
          query={currentValues}
        />
      </div>
    </StorefrontShell>
  );
}

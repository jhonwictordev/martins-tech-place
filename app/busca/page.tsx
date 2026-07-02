import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getStorefrontProducts } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Busca de produtos",
  description:
    "Pesquise por titulo, marca, modelo, categoria e descricao para encontrar rapidamente tecnologia com precos atualizados."
});

export default async function SearchPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const result = await getStorefrontProducts(searchParams);

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Busca"
          title={query ? `Resultados para "${query}"` : "Pesquise produtos de tecnologia"}
          description="A busca procura por titulo, marca, modelo, categoria e descricao para entregar resultados mais relevantes."
        />
        <ProductGrid
          products={result.products}
          emptyTitle="Nenhum resultado encontrado"
          emptyDescription="Tente outro termo de busca ou navegue pelas categorias para descobrir novos anuncios."
        />
      </div>
    </StorefrontShell>
  );
}

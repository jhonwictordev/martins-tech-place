import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getCategoryBySlug, getCategorySummaries, getStorefrontProducts } from "@/lib/storefront";

type CategoryPageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return buildMetadata({
      title: "Categoria nao encontrada",
      description: "A categoria solicitada nao foi encontrada."
    });
  }

  return buildMetadata({
    title: `${category.name} | Catalogo de tecnologia`,
    description: `Explore ${category.name} com ofertas atualizadas automaticamente, filtros inteligentes e compra segura pelo Mercado Livre.`,
    path: `/categorias/${slug}`
  });
}

export default async function CategoryDetailPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = params;
  const [category, categories] = await Promise.all([getCategoryBySlug(slug), getCategorySummaries()]);

  if (!category) {
    notFound();
  }

  const result = await getStorefrontProducts({
    ...searchParams,
    category: category.id
  });
  const currentValues = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  ) as Record<string, string | undefined>;

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Categoria"
          title={category.name}
          description={`Catalogo especializado em ${category.name}, com busca, filtros e botao de compra direcionando para o anuncio oficial no Mercado Livre.`}
        />
        <ProductFilters
          categories={categories}
          brands={result.availableBrands}
          currentValues={currentValues}
          basePath={`/categorias/${category.slug}`}
          lockedCategory={category}
        />
        <ProductGrid
          products={result.products}
          emptyTitle={`Nenhum item em ${category.name}`}
          emptyDescription="Os anuncios dessa categoria serao exibidos aqui assim que houver sincronizacao com o Mercado Livre."
        />
        <Pagination
          currentPage={result.page}
          totalItems={result.total}
          pageSize={result.pageSize}
          pathname={`/categorias/${category.slug}`}
          query={{ ...currentValues, category: category.id }}
        />
      </div>
    </StorefrontShell>
  );
}

import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getBestSellingProducts } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Mais vendidos em tecnologia",
  description:
    "Confira os produtos mais vendidos da Martins Tech Place e descubra os eletronicos com maior demanda entre os clientes."
});

export default async function BestSellersPage() {
  const products = await getBestSellingProducts(12);

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Mais vendidos"
          title="Os favoritos da comunidade tech"
          description="Itens com alto volume de vendas, boa reputacao e forte procura entre quem monta setup, trabalha ou estuda."
        />
        <ProductGrid products={products} />
      </div>
    </StorefrontShell>
  );
}

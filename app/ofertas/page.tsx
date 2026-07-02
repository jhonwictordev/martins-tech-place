import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getFlashOfferProducts } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Ofertas em tecnologia",
  description:
    "Veja as melhores promocoes da Martins Tech Place com precos sincronizados, descontos em destaque e compra finalizada no Mercado Livre."
});

export default async function OffersPage() {
  const products = await getFlashOfferProducts(12);

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Ofertas"
          title="Promocoes em destaque"
          description="Selecao com maior desconto, pronta para quem busca custo-beneficio em tecnologia."
        />
        <ProductGrid
          products={products}
          emptyTitle="Sem ofertas no momento"
          emptyDescription="Assim que novos descontos forem sincronizados, eles aparecerao aqui."
        />
      </div>
    </StorefrontShell>
  );
}

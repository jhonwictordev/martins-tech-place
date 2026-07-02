import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { FreeShippingBadge } from "@/components/FreeShippingBadge";
import { PriceBadge } from "@/components/PriceBadge";
import { buildMetadata } from "@/lib/seo";
import { getProductById, getRelatedProducts } from "@/lib/storefront";
import { getDiscountPercentage } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return buildMetadata({
      title: "Produto nao encontrado",
      description: "O produto solicitado nao foi encontrado na Martins Tech Place."
    });
  }

  return buildMetadata({
    title: `${product.title} | Oferta de Tecnologia`,
    description: `Veja preco, estoque, caracteristicas e compre ${product.title} com seguranca pelo Mercado Livre.`,
    path: `/produtos/${product.meliItemId}`,
    image: product.thumbnail
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id, 4);
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currencyId,
      price: product.price,
      availability:
        product.availableQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: product.permalink
    }
  };

  return (
    <StorefrontShell>
      <div className="space-y-14 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <ProductGallery images={product.images} title={product.title} />
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan">{product.categoryName}</p>
              <h1 className="font-display text-4xl font-semibold text-white">{product.title}</h1>
              <p className="text-base leading-8 text-slate-300">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <FreeShippingBadge enabled={product.freeShipping} />
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                {product.condition === "new" ? "Novo" : "Usado"}
              </span>
              {discount > 0 ? (
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                  {discount}% de desconto
                </span>
              ) : null}
            </div>
            <PriceBadge
              price={product.price}
              currencyId={product.currencyId}
              originalPrice={product.originalPrice}
            />
            <div className="grid gap-4 rounded-[2rem] border border-slate-800 bg-slate-950/60 p-5 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Estoque</p>
                <p className="mt-2 text-lg text-white">{product.availableQuantity} unidades disponiveis</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Vendidos</p>
                <p className="mt-2 text-lg text-white">{product.soldQuantity} pedidos realizados</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Marca</p>
                <p className="mt-2 text-lg text-white">{product.brand ?? "Nao informado"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modelo</p>
                <p className="mt-2 text-lg text-white">{product.model ?? "Nao informado"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={product.permalink} target="_blank" rel="noreferrer" className="button-primary">
                Comprar no Mercado Livre
              </a>
              <Link href="/produtos" className="button-secondary">
                Voltar ao catalogo
              </Link>
            </div>
            <div className="rounded-[1.75rem] border border-brand/20 bg-brand/10 p-4 text-sm leading-7 text-slate-100">
              A compra sera finalizada com seguranca no Mercado Livre.
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="surface rounded-[2rem] p-6">
            <h2 className="font-display text-2xl text-white">Caracteristicas tecnicas</h2>
            <div className="mt-5 grid gap-3">
              {product.attributes.map((attribute) => (
                <div
                  key={`${attribute.name}-${attribute.value}`}
                  className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 md:flex-row"
                >
                  <span className="text-sm text-slate-300">{attribute.name}</span>
                  <span className="text-sm font-semibold text-white">{attribute.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="surface rounded-[2rem] p-6">
            <h2 className="font-display text-2xl text-white">Informacoes do vendedor</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <p>
                Os anuncios exibidos sao sincronizados do Mercado Livre, com atualizacao de estoque, preco e status do item.
              </p>
              <p>
                Consulte reputacao, politica de entrega, perguntas e meios de envio diretamente no anuncio oficial antes de concluir a compra.
              </p>
              <p>
                Esta vitrine foi pensada para acelerar sua busca por tecnologia, mantendo o checkout em um ambiente seguro e familiar.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Relacionados"
            title="Mais itens desta categoria"
            description="Continue explorando ofertas parecidas e monte seu setup com produtos complementares."
          />
          <ProductGrid
            products={relatedProducts}
            emptyTitle="Sem relacionados no momento"
            emptyDescription="Assim que novos anuncios forem sincronizados nesta categoria, eles aparecerao aqui."
          />
        </section>
      </div>
    </StorefrontShell>
  );
}

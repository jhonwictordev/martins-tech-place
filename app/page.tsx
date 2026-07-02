import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { CategoryMenu } from "@/components/CategoryMenu";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import {
  getBestSellingProducts,
  getCategorySummaries,
  getFeaturedProducts,
  getFlashOfferProducts
} from "@/lib/storefront";

export default async function HomePage() {
  const [categories, featuredProducts, flashOffers, bestSellers] = await Promise.all([
    getCategorySummaries(),
    getFeaturedProducts(6),
    getFlashOfferProducts(6),
    getBestSellingProducts(6)
  ]);

  return (
    <StorefrontShell>
      <div className="space-y-16 pb-16">
        <HeroBanner />

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Categorias"
            title="Os eletronicos mais buscados em um so lugar"
            description="Explore um catalogo completo por categoria e encontre rapidamente celulares, notebooks, perifericos, audio, rede e muito mais."
          />
          <CategoryMenu categories={categories} />
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Destaques"
              title="Produtos de tecnologia em destaque"
              description="Catalogo atualizado automaticamente com combinacoes de alta demanda, precificacao atrativa e links oficiais do Mercado Livre."
            />
            <Link href="/produtos" className="button-secondary hidden md:inline-flex">
              Ver catalogo completo
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Ofertas relampago"
            title="Descontos com estoque e precos sincronizados"
            description="Compare o valor promocional, acompanhe o estoque disponivel e clique para finalizar a compra no anuncio oficial."
          />
          <ProductGrid products={flashOffers} />
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Mais vendidos"
            title="Campeoes de vendas em tecnologia"
            description="Os itens mais procurados da loja, com grande volume de pedidos e reputacao forte no marketplace."
          />
          <ProductGrid products={bestSellers} />
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Beneficios"
            title="Compre com seguranca pelo Mercado Livre"
            description="A Martins Tech Place funciona como vitrine premium: voce pesquisa, compara e finaliza a compra no anuncio original."
          />
          <BenefitsGrid />
        </section>

        <section className="surface rounded-[2rem] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                <Star className="h-3.5 w-3.5" />
                Compra segura pelo Mercado Livre
              </span>
              <h2 className="mt-4 font-display text-3xl text-white">Clique e finalize sua compra no Mercado Livre</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Aqui voce encontra curadoria, busca, filtros, categorias e ofertas atualizadas automaticamente. O checkout permanece no Mercado Livre para garantir seguranca e praticidade.
              </p>
            </div>
            <Link href="/ofertas" className="button-primary">
              Ver ofertas agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </StorefrontShell>
  );
}

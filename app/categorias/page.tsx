import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getCategorySummaries } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Categorias de tecnologia",
  description:
    "Navegue pelas categorias da Martins Tech Place e descubra celulares, notebooks, monitores, audio, armazenamento, redes e acessorios."
});

export default async function CategoriesPage() {
  const categories = await getCategorySummaries();

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Categorias"
          title="Encontre tecnologia por nicho"
          description="Acesse rapidamente as principais secoes da loja e descubra eletronicos em destaque com sincronizacao automatica."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.slug}`}
              className="surface rounded-[2rem] p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-cyan">Categoria</p>
              <h2 className="mt-3 font-display text-2xl text-white">{category.name}</h2>
              <p className="mt-3 text-sm text-slate-300">{category.productCount} produtos disponiveis</p>
            </Link>
          ))}
        </div>
      </div>
    </StorefrontShell>
  );
}

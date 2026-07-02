import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductGallery } from "@/components/ProductGallery";
import { PriceBadge } from "@/components/PriceBadge";
import { getProductById } from "@/lib/storefront";

export default async function AdminProductDetailPage({
  params
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title={product.title}
        description="Detalhes completos do item sincronizado, com informacoes tecnicas, estoque e link oficial do anuncio."
        actions={
          <a href={product.permalink} target="_blank" rel="noreferrer" className="button-primary">
            Abrir anuncio oficial
          </a>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ProductGallery images={product.images} title={product.title} />
        <div className="surface rounded-[2rem] p-6">
          <PriceBadge price={product.price} currencyId={product.currencyId} originalPrice={product.originalPrice} />
          <div className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            <p>ML item: {product.meliItemId}</p>
            <p>Categoria: {product.categoryName}</p>
            <p>Marca: {product.brand ?? "Nao informado"}</p>
            <p>Modelo: {product.model ?? "Nao informado"}</p>
            <p>Condicao: {product.condition === "new" ? "Novo" : "Usado"}</p>
            <p>Estoque: {product.availableQuantity}</p>
            <p>Vendidos: {product.soldQuantity}</p>
            <p>Status: {product.status}</p>
          </div>
          <p className="mt-6 text-sm leading-8 text-slate-300">{product.description}</p>
        </div>
      </div>

      <div className="surface rounded-[2rem] p-6">
        <h2 className="font-display text-2xl text-white">Atributos tecnicos</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {product.attributes.map((attribute) => (
            <div
              key={`${attribute.name}-${attribute.value}`}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-sm text-slate-300"
            >
              <span className="block text-xs uppercase tracking-[0.18em] text-cyan">{attribute.name}</span>
              <span className="mt-2 block text-white">{attribute.value}</span>
            </div>
          ))}
        </div>
        <Link href="/admin/produtos" className="button-secondary mt-6 inline-flex">
          Voltar para produtos
        </Link>
      </div>
    </div>
  );
}

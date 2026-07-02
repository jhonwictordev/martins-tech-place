import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PriceBadge } from "@/components/PriceBadge";
import { getAdminProducts } from "@/lib/storefront";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Produtos sincronizados"
        description="Acompanhe estoque, preco, condicao e links oficiais dos itens sincronizados a partir do Mercado Livre."
      />
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="surface grid gap-4 rounded-[2rem] p-5 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.55fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan">{product.categoryName}</p>
              <h2 className="mt-2 font-display text-2xl text-white">{product.title}</h2>
              <p className="mt-2 text-sm text-slate-300">ML item: {product.meliItemId}</p>
            </div>
            <div className="text-sm text-slate-300">
              <p>Marca: {product.brand ?? "Nao informado"}</p>
              <p>Modelo: {product.model ?? "Nao informado"}</p>
              <p>Condicao: {product.condition === "new" ? "Novo" : "Usado"}</p>
            </div>
            <div className="text-sm text-slate-300">
              <PriceBadge
                price={product.price}
                currencyId={product.currencyId}
                originalPrice={product.originalPrice}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                Estoque: {product.availableQuantity}
              </span>
              <Link href={`/admin/produtos/${product.meliItemId}`} className="button-secondary text-center">
                Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

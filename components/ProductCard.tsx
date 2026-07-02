import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Box, Eye } from "lucide-react";
import type { StorefrontProduct } from "@/lib/storefront";
import { getDiscountPercentage } from "@/lib/utils";
import { DiscountBadge } from "@/components/DiscountBadge";
import { FreeShippingBadge } from "@/components/FreeShippingBadge";
import { PriceBadge } from "@/components/PriceBadge";

export function ProductCard({ product }: { product: StorefrontProduct }) {
  const discount = getDiscountPercentage(product.price, product.originalPrice);

  return (
    <article className="group surface flex h-full flex-col overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950/70">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <DiscountBadge percentage={discount} />
          <FreeShippingBadge enabled={product.freeShipping} />
          <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
            {product.condition === "new" ? "Novo" : "Usado"}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan">{product.categoryName}</p>
          <h3 className="mt-2 overflow-hidden font-display text-xl text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {product.title}
          </h3>
        </div>
        <PriceBadge
          price={product.price}
          currencyId={product.currencyId}
          originalPrice={product.originalPrice}
        />
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Box className="h-4 w-4 text-cyan" />
            Estoque: {product.availableQuantity}
          </span>
          <span>Vendidos: {product.soldQuantity}</span>
        </div>
        <div className="mt-auto grid gap-3 sm:grid-cols-2">
          <Link
            href={`/produtos/${product.meliItemId}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan hover:text-cyan"
          >
            <Eye className="h-4 w-4" />
            Ver produto
          </Link>
          <a
            href={product.permalink}
            target="_blank"
            rel="noreferrer"
            className="button-primary text-center"
          >
            Comprar no Mercado Livre
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

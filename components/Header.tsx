import Image from "next/image";
import Link from "next/link";
import { BadgePercent, LayoutGrid } from "lucide-react";
import { getCategorySummaries, getStoreSettings } from "@/lib/storefront";
import { SearchBar } from "@/components/SearchBar";

export async function Header() {
  const [categories, settings] = await Promise.all([getCategorySummaries(), getStoreSettings()]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-[28px] bg-white px-3 py-2 shadow-lg shadow-blue-950/20 ring-1 ring-white/10"
            >
              <Image
                src={settings.logoUrl ?? "/logo-martins-techplace.png"}
                alt={settings.storeName ?? "Martins Tech Place"}
                width={205}
                height={64}
                className="h-auto w-[170px] sm:w-[205px]"
                priority
              />
            </Link>
            <div className="w-full lg:flex-1">
              <SearchBar />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/categorias" className="button-secondary">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Categorias
              </Link>
              <Link href="/ofertas" className="button-secondary">
                <BadgePercent className="mr-2 h-4 w-4" />
                Ofertas
              </Link>
            </div>
          </div>
          <nav className="flex gap-3 overflow-x-auto pb-1 text-sm text-slate-300">
            {categories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
                className="whitespace-nowrap rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 transition hover:border-cyan hover:text-cyan"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

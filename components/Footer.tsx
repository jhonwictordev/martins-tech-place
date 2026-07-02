import Image from "next/image";
import Link from "next/link";
import { getCategorySummaries, getStoreSettings } from "@/lib/storefront";

export async function Footer() {
  const [settings, categories] = await Promise.all([getStoreSettings(), getCategorySummaries()]);

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/80">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="inline-flex rounded-[28px] bg-white px-3 py-2 shadow-lg shadow-blue-950/20 ring-1 ring-white/10">
            <Image
              src={settings.logoUrl ?? "/logo-martins-techplace.png"}
              alt={settings.storeName ?? "Martins Tech Place"}
              width={220}
              height={84}
              className="h-auto w-[190px] sm:w-[220px]"
            />
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Loja virtual moderna no nicho de tecnologia com produtos sincronizados, ofertas relampago e compra segura pelo Mercado Livre.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl text-white">Links uteis</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link href="/produtos" className="block hover:text-cyan">
              Produtos
            </Link>
            <Link href="/ofertas" className="block hover:text-cyan">
              Ofertas
            </Link>
            <Link href="/blog" className="block hover:text-cyan">
              Blog
            </Link>
            <Link href="/sobre" className="block hover:text-cyan">
              Sobre a loja
            </Link>
            <Link href="/contato" className="block hover:text-cyan">
              Contato
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-white">Categorias</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/categorias/${category.slug}`} className="block hover:text-cyan">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-white">Contato</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>E-mail: {settings.email ?? "contato@martinstechplace.com"}</p>
            <p>WhatsApp: {settings.whatsapp ?? "+55 11 98888-0000"}</p>
            <p>Instagram: {settings.instagram ?? "@martinstechplace"}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container-shell py-6 text-sm leading-7 text-slate-400">
          Este site redireciona compras para o Mercado Livre. Os precos, estoque e condicoes podem variar conforme o anuncio original.
        </div>
      </div>
    </footer>
  );
}

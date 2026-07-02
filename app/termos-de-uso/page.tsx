import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Termos de uso",
  description:
    "Leia os termos de uso da Martins Tech Place e entenda como a navegacao e o redirecionamento ao Mercado Livre funcionam."
});

export default async function TermsPage() {
  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Termos"
          title="Termos de uso da plataforma"
          description="Informacoes importantes sobre o uso do catalogo, integracao e redirecionamento para anuncios oficiais."
        />
        <div className="surface rounded-[2rem] p-6 text-sm leading-8 text-slate-300">
          Ao navegar pela Martins Tech Place, voce concorda que a plataforma atua como vitrine de produtos e que a compra sera finalizada no Mercado Livre. Precos, estoque, prazo, frete e reputacao do vendedor podem variar conforme o anuncio original. O administrador da loja deve manter a integracao segura, evitar exposicao de tokens e validar periodicamente o status dos webhooks e sincronizacoes.
        </div>
      </div>
    </StorefrontShell>
  );
}

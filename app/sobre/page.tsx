import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a Martins Tech Place",
  description:
    "Conheca a proposta da Martins Tech Place: uma vitrine premium de tecnologia integrada ao Mercado Livre."
});

export default async function AboutPage() {
  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Sobre"
          title="Uma loja pensada para acelerar sua busca por tecnologia"
          description="A Martins Tech Place nasceu para unir curadoria premium, experiencia moderna e sincronizacao automatica com o Mercado Livre."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface rounded-[2rem] p-6 text-sm leading-8 text-slate-300">
            Aqui voce navega por categorias, busca, filtros, ofertas e pagina de produto com informacoes consolidadas. Em vez de abrir dezenas de anuncios, a loja organiza os itens mais relevantes em um fluxo claro, responsivo e pronto para conversao.
          </div>
          <div className="surface rounded-[2rem] p-6 text-sm leading-8 text-slate-300">
            Toda compra e finalizada no Mercado Livre. Isso significa mais seguranca, meios de pagamento conhecidos, acompanhamento do pedido e confianca na plataforma original. Nosso papel e entregar descoberta, organizacao e curadoria.
          </div>
        </div>
      </div>
    </StorefrontShell>
  );
}

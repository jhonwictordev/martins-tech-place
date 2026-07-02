import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politica de privacidade",
  description:
    "Entenda como a Martins Tech Place trata informacoes de navegacao, autenticacao e integracao com o Mercado Livre."
});

export default async function PrivacyPage() {
  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Privacidade"
          title="Politica de privacidade"
          description="Transparencia sobre coleta, uso e protecao de dados pessoais no uso da plataforma."
        />
        <div className="surface rounded-[2rem] p-6 text-sm leading-8 text-slate-300">
          A Martins Tech Place coleta apenas os dados estritamente necessarios para autenticar administradores, registrar configuracoes da loja e processar sincronizacoes com o Mercado Livre. Informacoes sensiveis, como tokens OAuth e credenciais, permanecem no backend e nunca sao expostas no frontend. Em producao, utilize HTTPS, proteja o banco de dados e restrinja o acesso administrativo apenas a usuarios autorizados.
        </div>
      </div>
    </StorefrontShell>
  );
}

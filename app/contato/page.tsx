import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";
import { getStoreSettings } from "@/lib/storefront";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Entre em contato com a Martins Tech Place para tirar duvidas sobre produtos, integracao ou parcerias."
});

export default async function ContactPage() {
  const settings = await getStoreSettings();

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Contato"
          title="Fale com a equipe da loja"
          description="Use o formulario para atendimento comercial, suporte, parceria ou duvidas sobre anuncios sincronizados do Mercado Livre."
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface rounded-[2rem] p-6 text-sm leading-8 text-slate-300">
            <h2 className="font-display text-2xl text-white">Canais diretos</h2>
            <div className="mt-5 space-y-3">
              <p>E-mail: {settings.email ?? "contato@martinstechplace.com"}</p>
              <p>WhatsApp: {settings.whatsapp ?? "+55 11 98888-0000"}</p>
              <p>Instagram: {settings.instagram ?? "@martinstechplace"}</p>
            </div>
            <p className="mt-6">
              Se a sua duvida for sobre entrega, pagamento ou reputacao do vendedor, recomendamos validar tambem as informacoes diretamente no anuncio do Mercado Livre.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </StorefrontShell>
  );
}

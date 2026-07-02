import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Loja de Tecnologia | Ofertas em Celulares, Notebooks e Eletronicos",
    description:
      "Compre produtos de tecnologia, celulares, notebooks, perifericos, acessorios e eletronicos com ofertas atualizadas do Mercado Livre."
  }),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Martins Tech Place",
    template: "%s | Martins Tech Place"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}

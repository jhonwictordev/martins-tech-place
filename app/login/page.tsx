import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";
import { StorefrontShell } from "@/components/StorefrontShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Entrar no painel administrativo",
  description:
    "Acesse a area administrativa da Martins Tech Place para conectar sua conta Mercado Livre e sincronizar catalogo e pedidos."
});

export default async function LoginPage() {
  return (
    <StorefrontShell>
      <div className="py-10 pb-16">
        <LoginForm />
      </div>
    </StorefrontShell>
  );
}

import Link from "next/link";
import { StorefrontShell } from "@/components/StorefrontShell";

export default async function NotFound() {
  return (
    <StorefrontShell>
      <section className="surface rounded-[2rem] px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan">404</p>
        <h1 className="mt-4 font-display text-4xl text-white">Pagina nao encontrada</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          O link que voce tentou acessar nao existe mais ou ainda nao foi publicado no catalogo.
        </p>
        <Link href="/" className="button-primary mt-8">
          Voltar para a home
        </Link>
      </section>
    </StorefrontShell>
  );
}

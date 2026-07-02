import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { commercialMessages, siteConfig } from "@/lib/site";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-hero-grid px-6 py-16 shadow-card md:px-10 md:py-20">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            <Flame className="h-4 w-4" />
            Ofertas atualizadas automaticamente
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            <span className="text-gradient">{siteConfig.slogan}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            {siteConfig.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/ofertas" className="button-primary">
              Ver ofertas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/mais-vendidos" className="button-secondary">
              Mais vendidos
            </Link>
          </div>
        </div>
        <div className="surface rounded-[2rem] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            Marketplace premium de tecnologia
          </p>
          <div className="mt-6 grid gap-4">
            {commercialMessages.map((message) => (
              <div
                key={message}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-4 text-sm text-slate-100"
              >
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

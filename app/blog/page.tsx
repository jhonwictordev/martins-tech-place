import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog de tecnologia",
  description:
    "Conteudos em markdown para ranqueamento no Google sobre SSDs, notebooks, perifericos, celulares e compra segura online."
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <StorefrontShell>
      <div className="space-y-8 pb-16">
        <SectionHeading
          eyebrow="Blog"
          title="Conteudos para quem compra tecnologia com inteligencia"
          description="Artigos otimizados para SEO com dicas, comparativos e orientacoes para escolher melhor antes de clicar no Mercado Livre."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="surface overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[16/10]">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan">{post.category}</p>
                <h2 className="mt-3 font-display text-2xl text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </StorefrontShell>
  );
}

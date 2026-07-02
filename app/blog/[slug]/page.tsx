import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { StorefrontShell } from "@/components/StorefrontShell";
import { getBlogPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post nao encontrado",
      description: "O artigo solicitado nao foi encontrado."
    });
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    image: post.coverImage
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <StorefrontShell>
      <article className="space-y-10 pb-16">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan">{post.category}</p>
          <h1 className="max-w-4xl font-display text-4xl text-white md:text-5xl">{post.title}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300">{post.excerpt}</p>
        </div>
        <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] border border-slate-800">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
        <div className="surface rounded-[2rem] p-6 md:p-8">
          <MarkdownContent html={post.contentHtml} />
        </div>
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Relacionados"
            title="Produtos sugeridos no final do artigo"
            description="Continue a pesquisa com anuncios alinhados ao tema lido."
          />
          <ProductGrid products={post.relatedProducts} />
        </section>
      </article>
    </StorefrontShell>
  );
}

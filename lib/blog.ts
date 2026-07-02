import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getProductById, type StorefrontProduct } from "@/lib/storefront";
import { slugifyText } from "@/lib/utils";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  relatedProductIds: string[];
};

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const filenames = await fs.readdir(blogDirectory);
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const fullPath = path.join(blogDirectory, filename);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        slug: data.slug ?? slugifyText(data.title),
        category: data.category,
        coverImage: data.coverImage,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        excerpt: data.excerpt,
        relatedProductIds: data.relatedProducts ?? []
      } satisfies BlogPostMeta;
    })
  );

  return posts.sort((a, b) => a.title.localeCompare(b.title));
}

type BlogPost = Omit<BlogPostMeta, "relatedProductIds"> & {
  relatedProductIds: string[];
  relatedProducts: StorefrontProduct[];
  contentHtml: string;
};

export async function getBlogPostBySlug(slug: string) {
  const filenames = await fs.readdir(blogDirectory);

  for (const filename of filenames) {
    const fullPath = path.join(blogDirectory, filename);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const candidateSlug = data.slug ?? slugifyText(data.title);

    if (candidateSlug === slug) {
      const processed = await remark().use(html).process(content);

      return {
        title: data.title as string,
        slug: candidateSlug,
        category: data.category as string,
        coverImage: data.coverImage as string,
        seoTitle: data.seoTitle as string,
        seoDescription: data.seoDescription as string,
        excerpt: data.excerpt as string,
        relatedProductIds: ((data.relatedProducts as string[]) ?? []),
        relatedProducts: await Promise.all(
          ((data.relatedProducts as string[]) ?? []).map(async (productId) => getProductById(productId))
        ).then(
          (products) =>
            products.filter((product): product is StorefrontProduct => product !== null)
        ),
        contentHtml: processed.toString()
      } satisfies BlogPost;
    }
  }

  return null;
}

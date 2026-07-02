import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { getAllActiveProducts, getCategorySummaries } from "@/lib/storefront";
import { buildAbsoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([
    getAllActiveProducts(),
    getCategorySummaries(),
    getBlogPosts()
  ]);

  const staticRoutes = [
    "",
    "/produtos",
    "/categorias",
    "/ofertas",
    "/mais-vendidos",
    "/busca",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/termos-de-uso",
    "/blog"
  ].map((route) => ({
    url: buildAbsoluteUrl(route || "/"),
    lastModified: new Date()
  }));

  const productRoutes = products.map((product) => ({
    url: buildAbsoluteUrl(`/produtos/${product.meliItemId}`),
    lastModified: new Date(product.updatedAt)
  }));

  const categoryRoutes = categories.map((category) => ({
    url: buildAbsoluteUrl(`/categorias/${category.slug}`),
    lastModified: new Date()
  }));

  const blogRoutes = posts.map((post) => ({
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date()
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}

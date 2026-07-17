import type { MetadataRoute } from "next";
import { getAllCategories, getAllProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.seo.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.seo.siteUrl}/categories`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.seo.siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.seo.siteUrl}/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${siteConfig.seo.siteUrl}/${product.categorySlug}/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

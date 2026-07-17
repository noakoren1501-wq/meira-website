import { siteConfig } from "@/lib/data/site-config";
import { getEffectivePrice } from "@/lib/catalog";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import type { Category, Product } from "@/lib/types";

export function absoluteUrl(path: string): string {
  return `${siteConfig.seo.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildProductJsonLd(product: Product, category: Category) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.fullDescription || product.shortDescription,
    image: product.images.map((image) => absoluteUrl(image.src)),
    sku: product.id,
    category: category.title,
  };

  const effectivePrice = getEffectivePrice(product);
  if (effectivePrice !== null) {
    jsonLd.offers = {
      "@type": "Offer",
      priceCurrency: "ILS",
      price: effectivePrice,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/${category.slug}/${product.slug}`),
    };
  }

  return jsonLd;
}

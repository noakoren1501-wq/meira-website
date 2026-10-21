import { siteConfig } from "@/lib/data/site-config";
import { getEffectivePrice } from "@/lib/catalog";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import type { Category, Product } from "@/lib/types";

export function absoluteUrl(path: string): string {
  return `${siteConfig.seo.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// Tells search engines the site's name, its alternate name (the tagline people also search for)
// and who the creator is, so queries like "מאירה קורן" / "אחד יחיד ומיוחד" map to this site.
export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.siteName,
        alternateName: [siteConfig.siteTagline, `${siteConfig.siteName} – ${siteConfig.siteTagline}`],
        inLanguage: "he-IL",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.siteName,
        alternateName: siteConfig.siteTagline,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.png"),
        description: siteConfig.seo.defaultDescription,
      },
    ],
  };
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

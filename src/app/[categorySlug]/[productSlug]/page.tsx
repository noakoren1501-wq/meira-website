import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ImageCarousel } from "@/components/product/ImageCarousel";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductNavigation } from "@/components/product/ProductNavigation";
import { getAdjacentProducts, getAllProducts, getCategoryBySlug, getProductBySlug } from "@/lib/catalog";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      // images intentionally omitted — opengraph-image.tsx generates a dedicated OG image per product
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}) {
  const { categorySlug, productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);
  if (!product || !category) notFound();

  const { previous, next } = getAdjacentProducts(categorySlug, productSlug);

  const breadcrumbItems = [
    { label: "בית", href: "/" },
    { label: "קטגוריות", href: "/categories" },
    { label: category.title, href: `/${category.slug}` },
    { label: product.title, href: `/${category.slug}/${product.slug}` },
  ];

  const productJsonLd = buildProductJsonLd(product, category);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  return (
    <Container className="py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ImageCarousel
          images={product.images}
          productTitle={product.title}
          naturalAspectRatio={product.naturalAspectRatio}
        />
        <ProductDetails product={product} category={category} />
      </div>
      <ProductNavigation categorySlug={categorySlug} previous={previous} next={next} />
    </Container>
  );
}

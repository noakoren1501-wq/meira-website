import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryProducts } from "@/components/catalog/CategoryProducts";
import { getAllCategories, getCategoryBySlug, getPriceRange, getProductsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const products = getProductsByCategory(categorySlug);
  const priceBounds = getPriceRange(categorySlug);

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading eyebrow="קטלוג" title={category.title} subtitle={category.description} as="h1" />
      <div className="mt-14">
        <CategoryProducts products={products} priceBounds={priceBounds} />
      </div>
    </Container>
  );
}

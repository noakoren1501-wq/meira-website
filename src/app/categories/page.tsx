import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { SlideUp } from "@/components/shared/SlideUp";
import { getAllCategories, getProductCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "קטגוריות",
  description: "כל קטגוריות היצירות בעבודת יד של מאירה קורן — שלטי עץ, שלטים ממוסגרים, תמונות וציורים מקוריים.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading eyebrow="קטלוג" title="קטגוריות" as="h1" />
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {categories.map((category, index) => (
          <SlideUp key={category.id} delay={index * 0.06}>
            <CategoryCard category={category} productCount={getProductCount(category.slug)} priority={index < 4} />
          </SlideUp>
        ))}
      </div>
    </Container>
  );
}

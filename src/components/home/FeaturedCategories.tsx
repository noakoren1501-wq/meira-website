import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { SlideUp } from "@/components/shared/SlideUp";
import { getFeaturedCategories, getProductCount } from "@/lib/catalog";

export function FeaturedCategories() {
  const categories = getFeaturedCategories();
  if (categories.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="קטגוריות" title="עולמות היצירה" align="center" />
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {categories.map((category, index) => (
            <SlideUp key={category.id} delay={index * 0.08}>
              <CategoryCard category={category} productCount={getProductCount(category.slug)} priority={index < 4} />
            </SlideUp>
          ))}
        </div>
      </Container>
    </section>
  );
}

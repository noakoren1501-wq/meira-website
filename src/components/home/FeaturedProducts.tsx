import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SlideUp } from "@/components/shared/SlideUp";
import { getFeaturedProducts } from "@/lib/catalog";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  if (products.length === 0) return null;

  return (
    <section className="bg-brand-gray/20 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="נבחרים" title="יצירות נבחרות" align="center" />
        <div className="mt-14">
          <ProductGrid>
            {products.map((product, index) => (
              <SlideUp key={product.id} delay={Math.min(index, 6) * 0.06}>
                <ProductCard product={product} priority={index < 4} />
              </SlideUp>
            ))}
          </ProductGrid>
        </div>
      </Container>
    </section>
  );
}

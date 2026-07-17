import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { siteConfig } from "@/lib/data/site-config";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl text-center">
          <FadeIn>
            <SectionHeading eyebrow={siteConfig.siteName} title={siteConfig.home.aboutHeading} align="center" />
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-brand-gray-dark sm:text-xl">
              {siteConfig.home.aboutText}
            </p>
          </FadeIn>
        </Container>
      </section>

      <FeaturedCategories />
      <FeaturedProducts />
    </>
  );
}

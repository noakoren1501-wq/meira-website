import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { FadeIn } from "@/components/shared/FadeIn";
import { SlideUp } from "@/components/shared/SlideUp";
import { siteConfig } from "@/lib/data/site-config";

export function Hero() {
  return (
    <section className="relative bg-brand-white">
      <Container className="flex flex-col items-center justify-center py-20 sm:py-28 lg:py-32">
        <div className="flex h-[360px] w-[360px] flex-col items-center justify-center rounded-full bg-brand-gray/50 px-6 pt-7 pb-10 text-center sm:h-[540px] sm:w-[540px] sm:px-10 sm:pt-10 sm:pb-14 lg:h-[580px] lg:w-[580px]">
          <FadeIn>
            <span className="block sm:hidden">
              <Logo size={44} />
            </span>
            <span className="hidden sm:block">
              <Logo size={64} />
            </span>
          </FadeIn>
          <SlideUp delay={0.1} className="mt-2 sm:mt-3">
            <Eyebrow>{siteConfig.siteTagline}</Eyebrow>
          </SlideUp>
          <SlideUp delay={0.15} className="mt-2 max-w-[280px] sm:max-w-sm">
            <h1 className="text-2xl font-light tracking-tight text-balance text-brand-black sm:text-5xl lg:text-6xl">
              {siteConfig.home.heroHeadline}
            </h1>
          </SlideUp>
          <SlideUp delay={0.2} className="mt-2 max-w-[280px] sm:mt-4 sm:max-w-sm">
            <p className="text-sm leading-relaxed text-brand-gray-dark sm:text-lg">{siteConfig.home.heroSubheadline}</p>
          </SlideUp>
          <SlideUp delay={0.3} className="mt-4 sm:mt-6">
            <PrimaryButton href="/categories">לצפייה בקטלוג</PrimaryButton>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}

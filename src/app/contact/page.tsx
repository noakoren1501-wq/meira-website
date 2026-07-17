import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WhatsAppIcon, HeartIcon, LeafIcon, MessageIcon } from "@/components/shared/icons";
import { FadeIn } from "@/components/shared/FadeIn";
import { SlideUp } from "@/components/shared/SlideUp";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "יצירת קשר עם מאירה קורן לגבי יצירות בעבודת יד — דרך וואטסאפ.",
};

const features = [
  {
    Icon: HeartIcon,
    title: "יחס אישי",
    description: "כל פרט חשוב לי, בהתאמה אישית מלאה",
  },
  {
    Icon: LeafIcon,
    title: "עבודת יד",
    description: "כל יצירה נעשית באהבה, בקפידה ותשומת לב לפרטים",
  },
  {
    Icon: MessageIcon,
    title: "זמינות",
    description: "מענה מהיר, שירות אישי ושקיפות מלאה",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-brand-white">
        <Container className="flex flex-col items-center justify-center py-20 sm:py-28 lg:py-32">
          <div className="flex h-[370px] w-[370px] flex-col items-center justify-center rounded-full bg-brand-gray/50 px-8 pt-8 pb-10 text-center sm:h-[580px] sm:w-[580px] sm:px-12 lg:h-[595px] lg:w-[595px]">
            <FadeIn>
              <Eyebrow>צור קשר</Eyebrow>
            </FadeIn>
            <SlideUp delay={0.1} className="mt-3 max-w-[260px] sm:mt-4 sm:max-w-sm">
              <h1 className="text-3xl font-light tracking-tight text-balance text-brand-black sm:text-4xl lg:text-5xl">
                אשמח לשמוע ממך
              </h1>
            </SlideUp>
            <SlideUp delay={0.15} className="mt-3 max-w-[260px] sm:mt-4 sm:max-w-sm">
              <p className="text-sm leading-relaxed text-brand-gray-dark sm:text-base">
                יש לך שאלה על אחת היצירות? רוצה להזמין משהו מיוחד ומותאם אישית? אני כאן לכל שאלה ובקשה.
              </p>
            </SlideUp>
            <SlideUp delay={0.2} className="mt-5 sm:mt-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-black/25 text-brand-black sm:h-10 sm:w-10">
                <WhatsAppIcon className="h-4 w-4" />
              </div>
            </SlideUp>
            <SlideUp delay={0.25} className="mt-2 max-w-[230px] sm:mt-3 sm:max-w-xs">
              <p className="text-xs leading-relaxed text-brand-gray-dark sm:text-sm">
                אפשר לשלוח לי הודעה ישירות בוואטסאפ ואחזור אליך בהקדם האפשרי
              </p>
            </SlideUp>
            <SlideUp delay={0.3} className="mt-3 sm:mt-4">
              <WhatsAppButton message={siteConfig.whatsapp.defaultMessage} className="px-8 sm:px-10" />
            </SlideUp>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-8">
            {features.map(({ Icon, title, description }) => (
              <FadeIn key={title}>
                <Icon className="mx-auto h-6 w-6 text-brand-gray-dark" />
                <p className="mt-4 text-sm font-medium text-brand-black">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-gray-dark">{description}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

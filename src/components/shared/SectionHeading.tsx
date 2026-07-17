import clsx from "clsx";
import { Eyebrow } from "@/components/shared/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "start", as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Heading className="text-3xl font-light tracking-tight text-balance text-brand-black sm:text-4xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-brand-gray-dark">{subtitle}</p>}
    </div>
  );
}

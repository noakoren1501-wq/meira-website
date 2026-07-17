import Image from "next/image";
import Link from "next/link";
import { ChevronIcon } from "@/components/shared/icons";
import type { Product } from "@/lib/types";

interface ProductNavigationProps {
  categorySlug: string;
  previous: Product | null;
  next: Product | null;
}

// RTL-consistent with the image carousel elsewhere on this page: "previous" sits at
// the start (right edge) with a right-pointing chevron, "next" at the end (left edge)
// with a left-pointing chevron — matching Hebrew reading direction.
export function ProductNavigation({ categorySlug, previous, next }: ProductNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="ניווט בין מוצרים" className="mt-16 border-t border-brand-gray pt-10 sm:mt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
        {previous ? (
          <Link
            href={`/${categorySlug}/${previous.slug}`}
            className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-gray/30 sm:-ms-3"
          >
            <ChevronIcon className="h-4 w-4 shrink-0 rotate-180 text-brand-gray-dark transition-transform group-hover:translate-x-1" />
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-gray/40">
              <Image src={previous.coverImage} alt="" fill sizes="56px" className="object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-brand-gray-dark">המוצר הקודם</span>
              <span className="block truncate text-sm font-medium text-brand-black">{previous.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/${categorySlug}/${next.slug}`}
            className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-gray/30 sm:-me-3"
          >
            <span className="min-w-0 text-end">
              <span className="block text-xs text-brand-gray-dark">המוצר הבא</span>
              <span className="block truncate text-sm font-medium text-brand-black">{next.title}</span>
            </span>
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-gray/40">
              <Image src={next.coverImage} alt="" fill sizes="56px" className="object-contain" />
            </span>
            <ChevronIcon className="h-4 w-4 shrink-0 text-brand-gray-dark transition-transform group-hover:-translate-x-1" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}

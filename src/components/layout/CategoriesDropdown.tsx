import Link from "next/link";
import { ChevronDownIcon } from "@/components/shared/icons";
import type { Category } from "@/lib/types";

// Pure CSS (no framer-motion) — group-hover/focus-within driven fade+slide, avoids the
// AnimatePresence re-render bug we hit elsewhere in this project.
export function CategoriesDropdown({ categories }: { categories: Category[] }) {
  return (
    <div className="group relative">
      <Link
        href="/categories"
        className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-brand-black transition-opacity hover:opacity-60"
      >
        קטגוריות
        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>

      <div className="invisible absolute top-full start-0 pt-3 opacity-0 -translate-y-1 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-56 rounded-2xl border border-brand-gray bg-brand-white p-2 shadow-lg">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="block rounded-lg px-4 py-2.5 text-sm text-brand-black transition-colors hover:bg-brand-gray/50"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

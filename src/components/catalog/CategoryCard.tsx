import Link from "next/link";
import type { Category } from "@/lib/types";
import { ZoomImage } from "@/components/shared/ZoomImage";

export function CategoryCard({
  category,
  productCount,
  priority,
}: {
  category: Category;
  productCount: number;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group block"
      aria-label={`${category.title} – ${productCount} מוצרים`}
    >
      <ZoomImage
        src={category.coverImage}
        alt={category.title}
        sizes="(min-width: 1024px) 45vw, 100vw"
        priority={priority}
      />
      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="text-xl font-light text-brand-black">{category.title}</h3>
        <span className="text-sm text-brand-gray-dark">{productCount} מוצרים</span>
      </div>
    </Link>
  );
}

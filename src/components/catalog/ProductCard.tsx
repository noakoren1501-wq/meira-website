import Link from "next/link";
import type { Product } from "@/lib/types";
import { ZoomImage } from "@/components/shared/ZoomImage";
import { Price } from "@/components/shared/Price";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const coverImage = product.images.find((image) => image.src === product.coverImage);
  const aspectRatio =
    product.naturalAspectRatio && coverImage ? `${coverImage.width} / ${coverImage.height}` : undefined;

  return (
    <Link href={`/${product.categorySlug}/${product.slug}`} className="group block">
      <ZoomImage
        src={product.coverImage}
        alt={product.title}
        sizes="(min-width: 1024px) 22vw, 45vw"
        priority={priority}
        aspectRatio={aspectRatio}
      />
      <div className="mt-4">
        <h3 className="text-base font-light text-brand-black">{product.title}</h3>
        <Price product={product} className="mt-1 text-sm text-brand-gray-dark" />
      </div>
    </Link>
  );
}

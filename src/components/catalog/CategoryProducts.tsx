"use client";

import { useMemo, useState, useTransition } from "react";
import { SearchBar } from "@/components/catalog/SearchBar";
import { PriceFilter } from "@/components/catalog/PriceFilter";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductCardSkeleton } from "@/components/catalog/ProductCardSkeleton";
import { SlideUp } from "@/components/shared/SlideUp";
import { getEffectivePrice, searchProducts } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export function CategoryProducts({
  products,
  priceBounds,
}: {
  products: Product[];
  priceBounds: { min: number; max: number };
}) {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  // Deprioritizes re-filtering below React's urgent-update threshold. At today's ~43
  // products the filter is sub-millisecond so isPending rarely flips true — this is
  // still the correct mechanism to have wired now, since it starts mattering once the
  // catalog grows toward the site's stated "hundreds of products" scale.
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const searched = searchProducts(products, query);
    return searched.filter((product) => {
      const effectivePrice = getEffectivePrice(product);
      if (effectivePrice === null) return true; // placeholder-priced products are never hidden by a range they don't have
      if (price.min !== null && effectivePrice < price.min) return false;
      if (price.max !== null && effectivePrice > price.max) return false;
      return true;
    });
  }, [products, query, price]);

  const showPriceFilter = priceBounds.max > 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-xs">
          <SearchBar value={query} onChange={(value) => startTransition(() => setQuery(value))} />
        </div>
        {showPriceFilter && (
          <PriceFilter bounds={priceBounds} value={price} onChange={(value) => startTransition(() => setPrice(value))} />
        )}
      </div>

      <div className="mt-10">
        {isPending ? (
          <ProductGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ProductGrid>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-brand-gray-dark">לא נמצאו מוצרים התואמים את החיפוש.</p>
        ) : (
          <ProductGrid>
            {filtered.map((product, index) => (
              <SlideUp key={product.id} delay={Math.min(index, 6) * 0.05}>
                <ProductCard product={product} priority={index < 4} />
              </SlideUp>
            ))}
          </ProductGrid>
        )}
      </div>
    </div>
  );
}

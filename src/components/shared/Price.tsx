import { CONTACT_FOR_PRICE_LABEL, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function Price({ product, className }: { product: Product; className?: string }) {
  const info = formatPrice(product.price, product.salePrice);

  if (info.display === "contact") {
    return <span className={className}>{CONTACT_FOR_PRICE_LABEL}</span>;
  }

  if (info.display === "sale") {
    return (
      <span className={className}>
        <span className="me-2 text-brand-gray-dark line-through">{info.regular}</span>
        <span className="font-bold text-brand-black">{info.sale}</span>
      </span>
    );
  }

  return <span className={className}>{info.regular}</span>;
}

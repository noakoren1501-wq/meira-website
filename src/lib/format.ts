export const CONTACT_FOR_PRICE_LABEL = "מחיר לפי בקשה";

export type PriceDisplay =
  | { display: "contact" }
  | { display: "sale"; regular: string; sale: string }
  | { display: "regular"; regular: string };

function formatILS(amount: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(price: number | null, salePrice: number | null = null): PriceDisplay {
  if (price === null) return { display: "contact" };
  if (salePrice !== null && salePrice > 0 && salePrice < price) {
    return { display: "sale", regular: formatILS(price), sale: formatILS(salePrice) };
  }
  return { display: "regular", regular: formatILS(price) };
}

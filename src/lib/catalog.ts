import { z } from "zod";
import catalogJson from "@/lib/data/catalog.json";
import type { Category, Product } from "@/lib/types";

const productImageSchema = z.object({
  src: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  alt: z.string().min(1),
});

const productSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    categorySlug: z.string().min(1),
    title: z.string().min(1),
    shortDescription: z.string(),
    fullDescription: z.string(),
    price: z.number().positive().nullable(),
    salePrice: z.number().positive().nullable(),
    dimensions: z.string(),
    images: z.array(productImageSchema).min(1),
    coverImage: z.string().min(1),
    featured: z.boolean(),
    whatsappProductName: z.string().min(1),
    naturalAspectRatio: z.boolean().optional(),
  })
  .refine((product) => product.salePrice === null || (product.price !== null && product.salePrice < product.price), {
    message: "salePrice must be null unless price is set and salePrice is lower than price",
    path: ["salePrice"],
  });

const categorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  coverImage: z.string().min(1),
  featured: z.boolean(),
});

const catalogSchema = z.object({
  categories: z.array(categorySchema),
  products: z.array(productSchema),
});

// Fails the build loudly if catalog.json is malformed, rather than shipping a broken page.
const catalog = catalogSchema.parse(catalogJson) as { categories: Category[]; products: Product[] };

export function getAllCategories(): Category[] {
  return catalog.categories;
}

export function getFeaturedCategories(): Category[] {
  return catalog.categories.filter((category) => category.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return catalog.categories.find((category) => category.slug === slug);
}

export function getProductCount(categorySlug: string): number {
  return catalog.products.filter((product) => product.categorySlug === categorySlug).length;
}

export function getAllProducts(): Product[] {
  return catalog.products;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return catalog.products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return catalog.products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug
  );
}

export function getFeaturedProducts(): Product[] {
  return catalog.products.filter((product) => product.featured);
}

// Adjacent products within the same category, in catalog order — never wraps
// around at the first/last product.
export function getAdjacentProducts(
  categorySlug: string,
  productSlug: string
): { previous: Product | null; next: Product | null } {
  const products = getProductsByCategory(categorySlug);
  const index = products.findIndex((product) => product.slug === productSlug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? products[index - 1] : null,
    next: index < products.length - 1 ? products[index + 1] : null,
  };
}

// The price a customer actually pays — sale price when set, otherwise the regular price.
export function getEffectivePrice(product: Product): number | null {
  if (product.price === null) return null;
  return product.salePrice ?? product.price;
}

export function getPriceRange(categorySlug: string): { min: number; max: number } {
  const prices = getProductsByCategory(categorySlug)
    .map((product) => getEffectivePrice(product))
    .filter((price): price is number => price !== null);
  if (prices.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function searchProducts(products: Product[], query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) ||
      product.shortDescription.toLowerCase().includes(normalized)
  );
}

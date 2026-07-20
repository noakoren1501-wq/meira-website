export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number | null; // null = "contact for price"
  salePrice: number | null; // meaningful only when price !== null && salePrice < price
  dimensions: string;
  images: ProductImage[];
  coverImage: string;
  featured: boolean;
  whatsappProductName: string;
  /** When true, the product-page gallery shows each image at its own natural aspect
   * ratio instead of the site-wide fixed box — for products whose photos shouldn't be
   * letterboxed/cropped to match. Card grids elsewhere are unaffected. */
  naturalAspectRatio?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  featured: boolean;
}

export interface Catalog {
  categories: Category[];
  products: Product[];
}

export interface SiteConfig {
  siteName: string;
  siteTagline: string;
  whatsapp: {
    phoneInternational: string;
    defaultMessage: string;
  };
  termsPdfPath: string;
  contact: {
    email: string;
    instagramUrl?: string;
  };
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    aboutHeading: string;
    aboutText: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    siteUrl: string;
  };
}

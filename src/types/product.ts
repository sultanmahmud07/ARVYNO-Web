export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categorySlug: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  details: string[];
  fabricCare: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestselling";

export interface ProductFilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: ProductSize;
  color?: string;
  sort?: SortOption;
  search?: string;
  inStockOnly?: boolean;
}

import { PRODUCTS } from "@/data/products";
import { Product, ProductFilterState } from "@/types/product";

export async function getProducts(filters?: ProductFilterState): Promise<Product[]> {
  // Simulates future API/DB delay if needed
  let results = [...PRODUCTS];

  if (!filters) return results;

  if (filters.category) {
    const cat = filters.category.toLowerCase();
    if (cat === "new-arrivals") {
      results = results.filter((p) => p.isNew);
    } else if (cat === "best-sellers") {
      results = results.filter((p) => p.isBestSeller);
    } else if (cat === "trending") {
      results = results.filter((p) => p.isTrending);
    } else if (cat === "t-shirts" || cat === "tees") {
      results = results.filter(
        (p) =>
          p.categorySlug === "acid-wash" ||
          p.categorySlug === "drop-shoulder" ||
          p.categorySlug === "t-shirts" ||
          p.category.toLowerCase().includes("t-shirt")
      );
    } else if (
      cat === "baggy-pants" ||
      cat === "buggy-pants" ||
      cat === "baggy" ||
      cat === "buggy" ||
      cat === "pants"
    ) {
      results = results.filter(
        (p) =>
          p.categorySlug === "baggy-pants" ||
          p.category.toLowerCase().includes("baggy") ||
          p.category.toLowerCase().includes("pant")
      );
    } else {
      results = results.filter(
        (p) =>
          p.categorySlug.toLowerCase() === cat ||
          p.category.toLowerCase() === cat ||
          p.tags.some((t) => t.toLowerCase() === cat)
      );
    }
  }

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price >= (filters.minPrice ?? 0));
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
  }

  if (filters.size) {
    results = results.filter((p) => p.sizes.includes(filters.size!));
  }

  if (filters.color) {
    const colorLower = filters.color.toLowerCase();
    results = results.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase().includes(colorLower))
    );
  }

  if (filters.inStockOnly) {
    results = results.filter((p) => p.stock > 0);
  }

  // Sorting
  if (filters.sort) {
    switch (filters.sort) {
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "bestselling":
        results.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "featured":
      default:
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getTrendingProducts(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isTrending).slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getRelatedProducts(
  currentProductId: string,
  categorySlug: string,
  limit = 4
): Promise<Product[]> {
  return PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.categorySlug === categorySlug
  ).slice(0, limit);
}

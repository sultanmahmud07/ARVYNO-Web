import { PRODUCTS } from "@/data/products";
import { Product, ProductFilterState } from "@/types/product";

const productOrderMap = new Map(PRODUCTS.map((p, index) => [p.id, index]));

/**
 * Compares two products so that the last added product appears first.
 * Primary: latest createdAt date/time descending.
 * Secondary tie-breaker: later position in the PRODUCTS source array.
 */
export function compareLastAddedFirst(a: Product, b: Product): number {
  const timeA = new Date(a.createdAt).getTime();
  const timeB = new Date(b.createdAt).getTime();
  if (timeB !== timeA) {
    return timeB - timeA;
  }
  return (productOrderMap.get(b.id) ?? 0) - (productOrderMap.get(a.id) ?? 0);
}

/**
 * Compares two products by customer popularity and engagement:
 * 1. Popularity score (reviewCount * rating)
 * 2. Higher review count
 * 3. Tie-breaker: last added first
 */
export function compareTrendingScore(a: Product, b: Product): number {
  const scoreA = (a.reviewCount || 0) * (a.rating || 0);
  const scoreB = (b.reviewCount || 0) * (b.rating || 0);
  if (scoreB !== scoreA) {
    return scoreB - scoreA;
  }
  if ((b.reviewCount || 0) !== (a.reviewCount || 0)) {
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  }
  return compareLastAddedFirst(a, b);
}

/**
 * Prioritizes Hoodies so that most displayed products (~65-70%) are Hoodies,
 * artfully interleaved with a curated mix of other streetwear garments
 * (such as Drop Shoulder T-Shirts, Baggy Pants, and Acid Wash T-Shirts).
 *
 * For every 2 Hoodies, 1 mixed garment from other categories is inserted:
 * [Hoodie, Hoodie, Other, Hoodie, Hoodie, Other, ...]
 */
export function mixWithHoodiesPriority(
  candidates: Product[],
  limit?: number
): Product[] {
  const hoodies = candidates.filter((p) => p.categorySlug === "hoodies");
  const others = candidates.filter((p) => p.categorySlug !== "hoodies");

  if (hoodies.length === 0 || others.length === 0) {
    return limit !== undefined ? candidates.slice(0, limit) : candidates;
  }

  // Interleave and diversify other categories: drop-shoulder, baggy-pants, acid-wash
  const dropShoulder = others.filter((p) => p.categorySlug === "drop-shoulder");
  const baggyPants = others.filter((p) => p.categorySlug === "baggy-pants");
  const acidWash = others.filter((p) => p.categorySlug === "acid-wash");
  const remainingOthers = others.filter(
    (p) =>
      p.categorySlug !== "drop-shoulder" &&
      p.categorySlug !== "baggy-pants" &&
      p.categorySlug !== "acid-wash"
  );

  const diversifiedOthers: Product[] = [];
  let dsIdx = 0;
  let bgIdx = 0;
  let awIdx = 0;
  let remIdx = 0;

  while (
    dsIdx < dropShoulder.length ||
    bgIdx < baggyPants.length ||
    awIdx < acidWash.length ||
    remIdx < remainingOthers.length
  ) {
    if (dsIdx < dropShoulder.length) diversifiedOthers.push(dropShoulder[dsIdx++]);
    if (bgIdx < baggyPants.length) diversifiedOthers.push(baggyPants[bgIdx++]);
    if (dsIdx < dropShoulder.length) diversifiedOthers.push(dropShoulder[dsIdx++]);
    if (awIdx < acidWash.length) diversifiedOthers.push(acidWash[awIdx++]);
    if (remIdx < remainingOthers.length) diversifiedOthers.push(remainingOthers[remIdx++]);
  }

  const result: Product[] = [];
  let hIdx = 0;
  let oIdx = 0;

  while (hIdx < hoodies.length || oIdx < diversifiedOthers.length) {
    for (let i = 0; i < 2 && hIdx < hoodies.length; i++) {
      result.push(hoodies[hIdx++]);
    }
    if (oIdx < diversifiedOthers.length) {
      result.push(diversifiedOthers[oIdx++]);
    }
  }

  return limit !== undefined ? result.slice(0, limit) : result;
}

export async function getProducts(filters?: ProductFilterState): Promise<Product[]> {
  // Always initialize with last added products first
  let results = [...PRODUCTS].sort(compareLastAddedFirst);

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

  // Sorting (defaults to last added / newest first)
  const sort = filters.sort || "newest";
  switch (sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price || compareLastAddedFirst(a, b));
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price || compareLastAddedFirst(a, b));
      break;
    case "rating":
      results.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0) || compareLastAddedFirst(a, b)
      );
      break;
    case "bestselling":
      results.sort(
        (a, b) =>
          (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) ||
          compareLastAddedFirst(a, b)
      );
      break;
    case "featured":
      results.sort(
        (a, b) =>
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) ||
          compareLastAddedFirst(a, b)
      );
      break;
    case "trending":
      if (!filters.category || filters.category.toLowerCase() !== "trending") {
        results = results.filter((p) => p.isTrending);
      }
      results.sort(compareTrendingScore);
      break;
    case "newest":
    default:
      if (
        filters.category &&
        filters.category.toLowerCase() === "new-arrivals"
      ) {
        results = mixWithHoodiesPriority(results);
      } else {
        results.sort(compareLastAddedFirst);
      }
      break;
  }

  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return [...PRODUCTS]
    .filter((p) => p.isFeatured)
    .sort(compareLastAddedFirst)
    .slice(0, limit);
}

export async function getTrendingProducts(limit = 10): Promise<Product[]> {
  return [...PRODUCTS]
    .filter((p) => p.isTrending)
    .sort(compareTrendingScore)
    .slice(0, limit);
}

export async function getNewArrivals(limit = 10): Promise<Product[]> {
  const candidates = [...PRODUCTS]
    .filter((p) => p.isNew)
    .sort(compareLastAddedFirst);
  return mixWithHoodiesPriority(candidates, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  return [...PRODUCTS]
    .filter((p) => p.isBestSeller)
    .sort(compareLastAddedFirst)
    .slice(0, limit);
}

export async function getRelatedProducts(
  currentProductId: string,
  categorySlug: string,
  limit = 4
): Promise<Product[]> {
  return [...PRODUCTS]
    .filter(
      (p) => p.id !== currentProductId && p.categorySlug === categorySlug
    )
    .sort(compareLastAddedFirst)
    .slice(0, limit);
}

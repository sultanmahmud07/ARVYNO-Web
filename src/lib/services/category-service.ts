import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return [...CATEGORIES];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category || null;
}

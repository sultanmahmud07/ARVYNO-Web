import { Category } from "@/types/category";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Heavyweight 240+ GSM combed organic cotton tees engineered for elevated drape and timeless silhouette.",
    image: "/images/banners/t-shirt.jpg",
    itemCount: 10,
    featured: true,
  },
  {
    id: "cat-2",
    name: "Shirts",
    slug: "shirts",
    description: "Tailored Oxford, breezy linen, and signature striped shirts crafted for effortless casual and formal sophistication.",
    image: "/images/banners/striped-shirts-banner.png",
    itemCount: 10,
    featured: true,
  },
  {
    id: "cat-3",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest luxury silhouettes and seasonal releases, designed for modern elegance.",
    image: "/images/banners/drop-sholder.jpg",
    itemCount: 8,
    featured: true,
  },
  {
    id: "cat-4",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The most iconic ARVYNO signature pieces, celebrated for unmatched quality and comfort.",
    image: "/images/banners/buggy-pant.avif",
    itemCount: 8,
    featured: true,
  },
];

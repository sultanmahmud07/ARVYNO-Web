import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryBySlug, getCategories } from "@/lib/services/category-service";
import { getProducts } from "@/lib/services/product-service";
import { ProductFilterState, ProductSize, SortOption } from "@/types/product";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/filters/product-filters";
import { Breadcrumb } from "@/components/common/breadcrumb";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: SortOption;
    size?: ProductSize;
    color?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} — Luxury Menswear Collection`,
    description: category.description,
    openGraph: {
      title: `${category.name} | ARVYNO`,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedParams = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const filters: ProductFilterState = {
    category: slug,
    sort: resolvedParams.sort || "featured",
    size: resolvedParams.size,
    color: resolvedParams.color,
    minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined,
    maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined,
  };

  const products = await getProducts(filters);

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Category Hero Banner */}
      <div className="relative bg-[#0e0e0e] border-b border-[#1c1c1c] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.name },
            ]}
          />
          <div className="mt-4 space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c9a227]">
              ARVYNO Atelier
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6]">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed pt-1">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Filter & Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ProductFilters
          totalCount={products.length}
          activeCategorySlug={category.slug}
        >
          <ProductGrid
            products={products}
            columns={3}
            emptyMessage={`No garments found in ${category.name} matching your active filters.`}
          />
        </ProductFilters>
      </div>
    </div>
  );
}

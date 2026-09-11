import { Metadata } from "next";
import { getProducts } from "@/lib/services/product-service";
import { ProductFilterState, ProductSize, SortOption } from "@/types/product";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/filters/product-filters";
import { Breadcrumb } from "@/components/common/breadcrumb";

export const metadata: Metadata = {
  title: "Shop All Menswear Collections",
  description:
    "Explore the complete ARVYNO collection: heavyweight 260 GSM organic cotton t-shirts, tailored Egyptian poplin striped shirts, and pure linen garments. Cash on delivery in Bangladesh.",
  openGraph: {
    title: "Shop All Collections | ARVYNO",
    description:
      "Explore the complete ARVYNO menswear collection. Heavyweight organic cotton t-shirts, tailored striped shirts, and luxury essentials.",
  },
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: SortOption;
    size?: ProductSize;
    color?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;

  const filters: ProductFilterState = {
    category: resolvedParams.category,
    sort: resolvedParams.sort || "featured",
    size: resolvedParams.size,
    color: resolvedParams.color,
    minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined,
    maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined,
    search: resolvedParams.search,
  };

  const products = await getProducts(filters);

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Header Banner */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Shop All Products" }]} />
          <div className="mt-4 space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6]">
              All Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#888888] max-w-2xl leading-relaxed">
              Precision-crafted menswear designed with architectural drape,
              luxurious cotton density, and enduring elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ProductFilters totalCount={products.length}>
          <ProductGrid
            products={products}
            columns={3}
            emptyMessage="No garments match your active filters."
          />
        </ProductFilters>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { getProducts } from "@/lib/services/product-service";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search results for "${q}"` : "Search Menswear Collection",
    description: `Browse ARVYNO luxury menswear search results for ${q || "collections"}.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const products = await getProducts({ search: q });

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Search" }]} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c9a227]">
              <Search className="w-4 h-4" />
              <span>Search Results</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6]">
              {q ? `"${q}"` : "All Products"}
            </h1>
            <p className="text-xs sm:text-sm text-[#888888]">
              Found {products.length} {products.length === 1 ? "design" : "designs"}{" "}
              matching your search.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ProductGrid
          products={products}
          emptyMessage={`We couldn't find any garments matching "${q}". Try checking your spelling or search for "t-shirt" or "striped".`}
        />
      </div>
    </div>
  );
}

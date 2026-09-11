import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/services/category-service";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories & Collections",
  description:
    "Discover ARVYNO categories: Premium Heavyweight T-Shirts, Tailored Striped Shirts, New Arrivals, and Best Sellers.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Header Banner */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Categories" }]} />
          <div className="mt-4 space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6]">
              Curated Categories
            </h1>
            <p className="text-xs sm:text-sm text-[#888888] max-w-2xl leading-relaxed">
              Explore our specialized collections, from 260 GSM organic tees to
              tailored Egyptian poplin striped shirts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative h-96 sm:h-[440px] rounded-3xl overflow-hidden glass-card border border-[#262626] hover:border-[#c9a227]/50 transition-all duration-500 flex flex-col justify-end p-8 shadow-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:via-black/50 transition-all" />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest text-[#c9a227] uppercase">
                    {category.itemCount} Designs Available
                  </span>
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-[#c9a227] group-hover:text-black text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors">
                  {category.name}
                </h2>

                <p className="text-sm text-[#999999] max-w-xl leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

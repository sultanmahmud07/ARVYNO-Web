import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a227]">
              Curation
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-1">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] transition-colors"
          >
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-card border border-[#242424] hover:border-[#c9a227]/50 transition-all duration-500 flex flex-col justify-end p-6 shadow-xl"
            >
              {/* Background Image with Zoom */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:via-black/50 transition-all" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-widest text-[#c9a227] uppercase">
                    {category.itemCount} Designs
                  </span>
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#c9a227] group-hover:text-black text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors">
                  {category.name}
                </h3>

                <p className="text-xs text-[#999999] line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found matching your selection.",
  columns = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 px-6 text-center space-y-4 bg-[#111111] rounded-2xl border border-[#222222] shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#333333] flex items-center justify-center mx-auto text-[#c9a227]">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <p className="font-serif text-lg font-semibold text-[#f8f8f6]">
            {emptyMessage}
          </p>
          <p className="text-xs text-[#888888] leading-relaxed">
            Try adjusting your filter selection or explore our newest seasonal drops.
          </p>
        </div>
      </div>
    );
  }

  let columnClass = "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5";
  if (columns === 4) {
    columnClass = "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5";
  } else if (columns === 2) {
    columnClass = "grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8";
  }

  return (
    <div className={columnClass}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priorityImage={index < 4}
        />
      ))}
    </div>
  );
}

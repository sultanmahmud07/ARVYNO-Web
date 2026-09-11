"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/hooks/use-wishlist";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Header */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Wishlist" }]} />
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6]">
                Saved Wardrobe Pieces
              </h1>
              <p className="text-xs sm:text-sm text-[#888888] mt-1">
                Your private curation of favorite ARVYNO silhouettes.
              </p>
            </div>
            <span className="text-xs text-[#c9a227] font-semibold tracking-wider uppercase hidden sm:block">
              {savedProducts.length} Saved {savedProducts.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {savedProducts.length === 0 ? (
          <div className="max-w-md mx-auto my-16 text-center py-16 px-6 glass-card rounded-3xl border border-[#222222] space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#161616] border border-[#2d2d2d] flex items-center justify-center mx-auto text-[#666666]">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif text-xl font-bold text-[#f8f8f6]">
                Save the pieces you love.
              </h2>
              <p className="text-xs text-[#888888]">
                Click the heart icon on any design to save it to your personal
                wishlist.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
            >
              <span>Discover Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

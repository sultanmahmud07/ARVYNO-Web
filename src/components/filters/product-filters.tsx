"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductSize, SortOption } from "@/types/product";
import { CATEGORIES } from "@/data/categories";
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from "lucide-react";

const SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

const COLORS = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#f5f5f0" },
  { name: "Sand", hex: "#d8c5aa" },
  { name: "Navy", hex: "#1c2638" },
  { name: "Olive", hex: "#636e52" },
  { name: "Blue", hex: "#7ba4c9" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured Atelier", value: "featured" },
  { label: "Newest Drops", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "Best Selling", value: "bestselling" },
];

interface ProductFiltersProps {
  totalCount: number;
  activeCategorySlug?: string;
  children?: React.ReactNode;
}

export function ProductFilters({
  totalCount,
  activeCategorySlug,
  children,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Current filter state from URL
  const queryCategory = searchParams.get("category") || "";
  const effectiveCategory = activeCategorySlug || queryCategory;
  const currentSort = (searchParams.get("sort") as SortOption) || "featured";
  const currentSize = (searchParams.get("size") as ProductSize) || "";
  const currentColor = searchParams.get("color") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    const query = params.toString() ? `?${params.toString()}` : "";

    if (!slug) {
      router.push(`/products${query}`, { scroll: false });
    } else {
      router.push(`/categories/${slug}${query}`, { scroll: false });
    }
  };

  const clearAllFilters = () => {
    if (pathname.startsWith("/categories/")) {
      router.push(pathname, { scroll: false });
    } else {
      router.push("/products", { scroll: false });
    }
  };

  const hasActiveFilters =
    Boolean(currentSize) ||
    Boolean(currentColor) ||
    Boolean(currentMinPrice) ||
    Boolean(currentMaxPrice) ||
    (pathname === "/products" && Boolean(queryCategory)) ||
    currentSort !== "featured";

  const getCategoryTitle = (slug: string) => {
    const found = CATEGORIES.find((c) => c.slug === slug);
    return found ? found.name : slug;
  };

  const filterContent = (
    <div className="space-y-7">
      {/* Category Navigation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
            Collections
          </h4>
          <span className="text-[10px] text-[#555555] font-mono">
            {CATEGORIES.length + 1}
          </span>
        </div>
        <div className="space-y-1">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${pathname === "/products" && !queryCategory
                ? "bg-[#c9a227]/15 text-[#e5c76b] font-medium border-l-2 border-[#c9a227]"
                : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#161616]"
              }`}
          >
            <span>All Products</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#181818] text-[#666666]">
              All
            </span>
          </button>
          {CATEGORIES.map((cat) => {
            const isCatActive = effectiveCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${isCatActive
                    ? "bg-[#c9a227]/15 text-[#e5c76b] font-medium border-l-2 border-[#c9a227]"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#161616]"
                  }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${isCatActive
                      ? "bg-[#c9a227]/20 text-[#e5c76b]"
                      : "bg-[#181818] text-[#666666]"
                    }`}
                >
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#1c1c1c]" />

      {/* Size Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
            Size
          </h4>
          {currentSize && (
            <button
              onClick={() => updateParam("size", null)}
              className="text-[10px] text-[#c9a227] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = currentSize === size;
            return (
              <button
                key={size}
                onClick={() => updateParam("size", isSelected ? null : size)}
                className={`h-9 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center ${isSelected
                    ? "bg-[#c9a227] text-black border-[#c9a227] shadow-[0_0_12px_rgba(201,162,39,0.35)] scale-[1.02]"
                    : "bg-[#141414] text-[#a0a0a0] border-[#242424] hover:border-[#444444] hover:text-white"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#1c1c1c]" />

      {/* Color Palette Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
            Color Palette
          </h4>
          {currentColor && (
            <button
              onClick={() => updateParam("color", null)}
              className="text-[10px] text-[#c9a227] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {COLORS.map((color) => {
            const isSelected =
              currentColor.toLowerCase() === color.name.toLowerCase();
            return (
              <button
                key={color.name}
                onClick={() =>
                  updateParam(
                    "color",
                    isSelected ? null : color.name.toLowerCase()
                  )
                }
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs transition-all ${isSelected
                    ? "bg-[#1c1c1c] text-[#e5c76b] border-[#c9a227] shadow-sm font-medium"
                    : "bg-[#131313] text-[#888888] border-[#222222] hover:border-[#383838] hover:text-[#f8f8f6]"
                  }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 relative ${isSelected
                      ? "border-[#e5c76b] ring-2 ring-[#c9a227]/40"
                      : "border-[#444444]"
                    }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="truncate">{color.name}</span>
                {isSelected && (
                  <Check className="w-3 h-3 ml-auto text-[#c9a227] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#1c1c1c]" />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
            Price Range
          </h4>
          {(currentMinPrice || currentMaxPrice) && (
            <button
              onClick={() => {
                updateParam("minPrice", null);
                updateParam("maxPrice", null);
              }}
              className="text-[10px] text-[#c9a227] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (currentMaxPrice === "2000" && !currentMinPrice) {
                updateParam("maxPrice", null);
              } else {
                updateParam("minPrice", null);
                updateParam("maxPrice", "2000");
              }
            }}
            className={`py-2 px-3 text-xs rounded-lg border text-left transition-all ${currentMaxPrice === "2000" && !currentMinPrice
                ? "bg-[#c9a227]/15 text-[#e5c76b] border-[#c9a227]/50 font-medium"
                : "bg-[#131313] text-[#888888] border-[#222222] hover:text-white hover:border-[#383838]"
              }`}
          >
            Under ৳2,000
          </button>
          <button
            onClick={() => {
              if (currentMinPrice === "2000" && currentMaxPrice === "3000") {
                updateParam("minPrice", null);
                updateParam("maxPrice", null);
              } else {
                updateParam("minPrice", "2000");
                updateParam("maxPrice", "3000");
              }
            }}
            className={`py-2 px-3 text-xs rounded-lg border text-left transition-all ${currentMinPrice === "2000" && currentMaxPrice === "3000"
                ? "bg-[#c9a227]/15 text-[#e5c76b] border-[#c9a227]/50 font-medium"
                : "bg-[#131313] text-[#888888] border-[#222222] hover:text-white hover:border-[#383838]"
              }`}
          >
            ৳2,000 – ৳3,000
          </button>
        </div>
      </div>

      {/* Reset All Filters Button */}
      {hasActiveFilters && (
        <div className="pt-2">
          <button
            onClick={clearAllFilters}
            className="w-full py-2.5 px-3 bg-[#181818] hover:bg-[#202020] text-[#e5c76b] text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#2d2d2d] hover:border-[#c9a227]/40 flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Filter & Sorting Toolbar */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
        {/* Left: Count & Active Filter Pills */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs text-[#888888] font-medium pr-2">
            Showing <span className="text-[#f8f8f6] font-bold">{totalCount}</span>{" "}
            {totalCount === 1 ? "garment" : "garments"}
          </span>

          {/* Active Category Tag */}
          {effectiveCategory && pathname === "/products" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#c9a227]/30 text-xs text-[#e5c76b]">
              <span>Collection: {getCategoryTitle(effectiveCategory)}</span>
              <button
                onClick={() => handleCategorySelect(null)}
                className="hover:text-white"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Active Size Tag */}
          {currentSize && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#c9a227]/30 text-xs text-[#e5c76b]">
              <span>Size: {currentSize}</span>
              <button
                onClick={() => updateParam("size", null)}
                className="hover:text-white"
                aria-label="Remove size filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Active Color Tag */}
          {currentColor && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#c9a227]/30 text-xs text-[#e5c76b] capitalize">
              <span>Color: {currentColor}</span>
              <button
                onClick={() => updateParam("color", null)}
                className="hover:text-white"
                aria-label="Remove color filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Active Price Tag */}
          {(currentMinPrice || currentMaxPrice) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#c9a227]/30 text-xs text-[#e5c76b]">
              <span>
                {currentMinPrice && currentMaxPrice
                  ? `৳${currentMinPrice} – ৳${currentMaxPrice}`
                  : currentMaxPrice
                    ? `< ৳${currentMaxPrice}`
                    : `> ৳${currentMinPrice}`}
              </span>
              <button
                onClick={() => {
                  updateParam("minPrice", null);
                  updateParam("maxPrice", null);
                }}
                className="hover:text-white"
                aria-label="Remove price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Clear All pill */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#a0a0a0] hover:text-[#c9a227] underline underline-offset-2 pl-1 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right: Mobile Trigger & Luxury Sort Selector */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 bg-[#141414] hover:bg-[#1e1e1e] text-[#f8f8f6] border border-[#2a2a2a] rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c9a227]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#c9a227]" />
            )}
          </button>

          {/* Luxury Sort Selector */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="appearance-none bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] focus:border-[#c9a227] text-[#f8f8f6] rounded-xl pl-3.5 pr-8 py-2 text-xs font-medium focus:outline-none transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-[#141414] text-[#f8f8f6]"
                >
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar & Children */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 bg-[#0f0f0f] rounded-2xl p-6 border border-[#1e1e1e] h-fit sticky top-24 shadow-xl">
          {filterContent}
        </aside>

        {/* Product Grid / Main View Area */}
        <div className="flex-1 min-w-0 w-full">
          {children}
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#101010] p-6 flex flex-col justify-between shadow-2xl border-l border-[#222222] overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#202020]">
                <h3 className="font-serif text-base font-bold text-[#f8f8f6]">
                  Filter & Refine
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#777777] hover:text-white rounded-lg"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {filterContent}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-8 w-full py-3 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-98"
            >
              View {totalCount} {totalCount === 1 ? "Result" : "Results"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

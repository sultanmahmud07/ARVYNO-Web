"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface ProductSliderSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  products: Product[];
  sectionBg?: string;
  hasBorder?: boolean;
}

export function ProductSliderSection({
  title,
  subtitle,
  description,
  viewAllHref,
  viewAllLabel = "Explore Collection",
  products,
  sectionBg = "bg-[#080808]",
  hasBorder = false,
}: ProductSliderSectionProps) {
  // Slider index state for mid and large screens (0-indexed step)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isClient, setIsClient] = useState(false);

  // Measure visible items count on mid & large screens
  useEffect(() => {
    setIsClient(true);
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        setItemsPerView(4); // Desktop / Large
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3); // Tablet / Mid
      } else {
        setItemsPerView(2); // Fallback for calculation
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalProducts = products.length;
  // Maximum starting index so the last window is filled
  const maxIndex = Math.max(0, totalProducts - itemsPerView);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Calculate slide translation percentage:
  // Each card width percentage = 100 / itemsPerView
  const translatePercent = (currentIndex * (100 / itemsPerView));

  return (
    <section
      className={`py-16 sm:py-20 ${sectionBg} ${
        hasBorder ? "border-y border-[#181818]" : ""
      } relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Desktop Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-1.5 max-w-2xl">
            {subtitle && (
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a227]">
                {subtitle}
              </p>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6]">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed pt-1">
                {description}
              </p>
            )}
          </div>

          {/* Right Action: Slider Navigation (Mid & Large Screens Only) + View All Link */}
          <div className="flex items-center justify-between md:justify-end gap-5">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] group transition-colors flex-shrink-0"
              >
                <span>{viewAllLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {/* Slider Arrow Buttons — ONLY visible on Mid & Largest devices (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#222222]">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label={`Previous ${title} items`}
                className={`p-2.5 rounded-full border transition-all duration-300 ${
                  canGoPrev
                    ? "bg-[#141414] hover:bg-[#c9a227] text-[#f8f8f6] hover:text-black border-[#2c2c2c] hover:border-[#c9a227] shadow-lg active:scale-95 cursor-pointer"
                    : "bg-[#0f0f0f] text-[#444444] border-[#1a1a1a] cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label={`Next ${title} items`}
                className={`p-2.5 rounded-full border transition-all duration-300 ${
                  canGoNext
                    ? "bg-[#141414] hover:bg-[#c9a227] text-[#f8f8f6] hover:text-black border-[#2c2c2c] hover:border-[#c9a227] shadow-lg active:scale-95 cursor-pointer"
                    : "bg-[#0f0f0f] text-[#444444] border-[#1a1a1a] cursor-not-allowed opacity-50"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. MID & LARGE SCREENS: Modern Slider Track (hidden on mobile) */}
        <div className="hidden md:block relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2.5 lg:px-3"
                style={{
                  width: itemsPerView === 3 ? "33.3333%" : "25%",
                }}
              >
                <ProductCard product={product} priorityImage={idx < 4} />
              </div>
            ))}
          </div>

          {/* Slider Pagination Indicator Dots for Mid & Large Devices */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === currentIndex
                      ? "w-8 bg-gradient-to-r from-[#c9a227] to-[#e5c76b]"
                      : "w-2 bg-[#2a2a2a] hover:bg-[#444444]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2. MOBILE SCREENS (< md): Native Responsive 2-Column Grid (NO SLIDER) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:hidden">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

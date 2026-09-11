"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { ChevronLeft, ChevronRight, ArrowRight, Flame, Sparkles, Award } from "lucide-react";

interface CuratedTabSliderProps {
  trendingProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

type TabKey = "trending" | "new" | "bestsellers";

export function CuratedTabSlider({
  trendingProducts,
  newArrivals,
  bestSellers,
}: CuratedTabSliderProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("trending");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Measure visible items count on mid & large screens
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Reset index when switching tabs
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const getActiveProducts = (): Product[] => {
    switch (activeTab) {
      case "trending":
        return trendingProducts;
      case "new":
        return newArrivals;
      case "bestsellers":
        return bestSellers;
      default:
        return trendingProducts;
    }
  };

  const products = getActiveProducts();
  const totalProducts = products.length;
  const maxIndex = Math.max(0, totalProducts - itemsPerView);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const translatePercent = currentIndex * (100 / itemsPerView);

  const getTabMeta = () => {
    switch (activeTab) {
      case "trending":
        return {
          title: "Trending Luxury Drops",
          subtitle: "In High Demand",
          description: "Sartorial pieces capturing attention across Dhaka and beyond this week.",
          href: "/products?sort=trending",
          label: "View All Trending",
        };
      case "new":
        return {
          title: "New Seasonal Arrivals",
          subtitle: "Latest Releases",
          description: "Fresh heavyweight silhouettes, Egyptian poplin cuts, and artisanal stripes.",
          href: "/categories/new-arrivals",
          label: "Explore All New",
        };
      case "bestsellers":
        return {
          title: "Signature Best Sellers",
          subtitle: "Customer Icons",
          description: "Our most celebrated architectural tees and spread-collar garments.",
          href: "/categories/best-sellers",
          label: "View All Best Sellers",
        };
    }
  };

  const meta = getTabMeta();

  return (
    <section className="py-20 bg-[#080808] border-b border-[#181818] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Tab Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c9a227]">
                {meta.subtitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6]">
              {meta.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] max-w-xl pt-1">
              {meta.description}
            </p>
          </div>

          {/* Luxury Tab Navigation Capsule */}
          <div className="inline-flex p-1 rounded-xl bg-[#121212] border border-[#242424] self-start md:self-auto shadow-inner">
            <button
              onClick={() => handleTabChange("trending")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "trending"
                  ? "bg-[#c9a227] text-black shadow-md"
                  : "text-[#888888] hover:text-[#f8f8f6]"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => handleTabChange("new")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "new"
                  ? "bg-[#c9a227] text-black shadow-md"
                  : "text-[#888888] hover:text-[#f8f8f6]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => handleTabChange("bestsellers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bestsellers"
                  ? "bg-[#c9a227] text-black shadow-md"
                  : "text-[#888888] hover:text-[#f8f8f6]"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Best Sellers</span>
            </button>
          </div>
        </div>

        {/* Action Row: View All & Desktop Slider Controls (mid & large only) */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={meta.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] group transition-colors"
          >
            <span>{meta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Slider Controls — HIDDEN ON MOBILE (< md), ACTIVE ON MID & LARGEST DEVICES */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-mono text-[#777777] pr-2">
              Slide {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Previous products"
              className={`p-2.5 rounded-full border transition-all ${
                canGoPrev
                  ? "bg-[#141414] hover:bg-[#c9a227] text-[#f8f8f6] hover:text-black border-[#2c2c2c] hover:border-[#c9a227] shadow-lg cursor-pointer active:scale-95"
                  : "bg-[#0f0f0f] text-[#444444] border-[#1a1a1a] cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next products"
              className={`p-2.5 rounded-full border transition-all ${
                canGoNext
                  ? "bg-[#141414] hover:bg-[#c9a227] text-[#f8f8f6] hover:text-black border-[#2c2c2c] hover:border-[#c9a227] shadow-lg cursor-pointer active:scale-95"
                  : "bg-[#0f0f0f] text-[#444444] border-[#1a1a1a] cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. MID & LARGE DEVICES: Slider Track */}
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

          {/* Slider Progress Dots */}
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

        {/* 2. MOBILE DEVICES (< md): Clean Native 2-Column Grid (NO SLIDER) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:hidden">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

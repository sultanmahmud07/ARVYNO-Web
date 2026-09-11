"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { ArrowUpRight, ArrowRight, Sparkles, Compass } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { formatPrice } from "@/lib/utils";

export function FeaturedCategories() {
  const [catTees, catShirts, catNew, catBest] = CATEGORIES;

  return (
    <section className="py-20 sm:py-24 bg-[#0a0a0a] border-y border-[#181818] relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a227]/5 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#e5c76b]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 text-xs font-semibold uppercase tracking-[0.25em] text-[#e5c76b]">
                <Compass className="w-3.5 h-3.5 text-[#c9a227] animate-pulse" />
                <span>Curated Wardrobe</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6]">
                Featured Collections
              </h2>
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed pt-1">
                Distinctive silhouettes engineered from heavyweight organic cotton and tailored Egyptian poplin for purposeful dressing.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill border border-[#c9a227]/30 hover:border-[#c9a227] text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] group transition-all self-start md:self-auto shadow-lg hover:shadow-[#c9a227]/10"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Bento / Asymmetric Luxury Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          
          {/* 1. Large Hero Bento Card (Left Column - T-Shirts) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" duration={700}>
              <Link
                href={`/categories/${catTees.slug}`}
                className="group relative h-[480px] sm:h-[540px] lg:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-[#c9a227]/60 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 shadow-2xl hover:shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(201,162,39,0.15)] hover:-translate-y-1 block"
              >
                {/* Background Image with Zoom & Dark Gradient */}
                <Image
                  src={catTees.image}
                  alt={catTees.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/25 group-hover:via-black/50 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#e5c76b] tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    01 / T-SHIRTS
                  </span>
                  {catTees.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a227] text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
                      <Sparkles className="w-3 h-3" />
                      {catTees.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Content & Action */}
                <div className="relative z-10 space-y-3.5">
                  <div className="space-y-1">
                    {catTees.tagline && (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c76b]">
                        {catTees.tagline}
                      </p>
                    )}
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors leading-tight">
                      {catTees.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#b0b0b0] line-clamp-2 leading-relaxed font-light">
                    {catTees.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/15">
                    <span className="text-xs font-medium text-[#cccccc]">
                      From {catTees.startingPrice ? formatPrice(catTees.startingPrice) : "৳1,850"} • {catTees.itemCount} Silhouettes
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c9a227] text-black text-xs font-bold uppercase tracking-wider group-hover:bg-[#e5c76b] group-hover:scale-105 transition-all shadow-lg">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column Bento Cards (Shirts + New Arrivals + Best Sellers) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 lg:gap-6">
            
            {/* 2. Wide Top Card (Tailored Shirts) */}
            <ScrollReveal direction="up" delay={150} duration={700}>
              <Link
                href={`/categories/${catShirts.slug}`}
                className="group relative h-72 sm:h-80 lg:h-[295px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-[#c9a227]/60 transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(201,162,39,0.15)] hover:-translate-y-1 block"
              >
                {/* Background Image */}
                <Image
                  src={catShirts.image}
                  alt={catShirts.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-right sm:object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20 group-hover:via-black/55 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

                {/* Top Row */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#e5c76b] tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    02 / SHIRTS
                  </span>
                  {catShirts.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a227] text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
                      <Sparkles className="w-3 h-3" />
                      {catShirts.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Row */}
                <div className="relative z-10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      {catShirts.tagline && (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c76b]">
                          {catShirts.tagline}
                        </p>
                      )}
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors">
                        {catShirts.name}
                      </h3>
                    </div>
                    <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-[#c9a227] group-hover:text-black text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-md flex-shrink-0 self-start sm:self-auto">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#b0b0b0] line-clamp-1 leading-relaxed font-light">
                    {catShirts.description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* 3 & 4. Bottom 2-Column Split Cards (New Arrivals & Best Sellers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              
              {/* Card 3: New Arrivals */}
              <ScrollReveal direction="up" delay={250} duration={700}>
                <Link
                  href={`/categories/${catNew.slug}`}
                  className="group relative h-64 sm:h-72 lg:h-[295px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-[#c9a227]/60 transition-all duration-500 flex flex-col justify-between p-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(201,162,39,0.15)] hover:-translate-y-1 block"
                >
                  <Image
                    src={catNew.image}
                    alt={catNew.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:via-black/60 transition-all duration-500" />

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#e5c76b] tracking-wider bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                      03 / NEW
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#181818]/90 border border-[#c9a227]/40 text-[#e5c76b] text-[10px] font-bold uppercase tracking-widest shadow-md">
                      NEW DROP
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 space-y-1.5">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors leading-tight">
                      {catNew.name}
                    </h4>
                    <p className="text-xs text-[#a0a0a0] line-clamp-1 font-light">
                      {catNew.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-[#e5c76b] font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                      <span>View Releases</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Card 4: Best Sellers */}
              <ScrollReveal direction="up" delay={350} duration={700}>
                <Link
                  href={`/categories/${catBest.slug}`}
                  className="group relative h-64 sm:h-72 lg:h-[295px] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-[#c9a227]/60 transition-all duration-500 flex flex-col justify-between p-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(201,162,39,0.15)] hover:-translate-y-1 block"
                >
                  <Image
                    src={catBest.image}
                    alt={catBest.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 group-hover:via-black/60 transition-all duration-500" />

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#e5c76b] tracking-wider bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                      04 / ICONS
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c9a227] text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
                      BEST SELLER
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 space-y-1.5">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors leading-tight">
                      {catBest.name}
                    </h4>
                    <p className="text-xs text-[#a0a0a0] line-clamp-1 font-light">
                      {catBest.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-[#e5c76b] font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                      <span>Explore Iconic</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-16 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#c9a227]/35 shadow-2xl bg-[#0f0f0f] min-h-[380px] sm:min-h-[440px] flex items-center">
          {/* Background Image */}
          <Image
            src="/images/banners/striped-shirts-banner.png"
            alt="ARVYNO Premium Striped Shirts"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 sm:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a227]/20 border border-[#c9a227]/40 text-xs font-semibold text-[#e5c76b] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Tailored For Perfection</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f8f8f6] tracking-tight leading-tight">
              YOUR EVERYDAY ESSENTIALS, <br />
              <span className="gold-text-gradient">ELEVATED.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#b0b0b0] leading-relaxed font-light">
              Explore our new capsule of 100% long-staple cotton striped shirts,
              featuring spread collars, french seams, and effortless drape.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/categories/shirts"
                className="px-8 py-4 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center gap-2 group"
              >
                <span>Shop Striped Shirts</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories/t-shirts"
                className="px-6 py-4 glass-card text-[#f8f8f6] hover:text-[#e5c76b] text-xs uppercase tracking-widest font-semibold rounded-xl transition-colors"
              >
                Shop Heavy Tees
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

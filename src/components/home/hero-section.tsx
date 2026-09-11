import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#080808] pt-6 pb-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a227]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#e5c76b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#c9a227]/30 text-xs font-semibold uppercase tracking-[0.25em] text-[#e5c76b]">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227] animate-pulse" />
              <span>Autumn / Winter Luxury Atelier</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#f8f8f6] leading-[1.08]">
                WEAR YOUR <br />
                <span className="gold-text-gradient font-extrabold">IDENTITY.</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-[#a3a3a3] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Premium menswear crafted with heavyweight organic cotton and tailored
              Egyptian poplin. Engineered for those who express sophistication
              without saying a word.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#c9a227]/15 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/categories/new-arrivals"
                className="w-full sm:w-auto px-8 py-4 glass-card text-[#f8f8f6] hover:text-[#e5c76b] hover:border-[#c9a227]/40 font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>New Arrivals</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-8 border-t border-[#1c1c1c] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#f8f8f6]">
                  260+ <span className="text-[#c9a227] text-sm">GSM</span>
                </p>
                <p className="text-[11px] text-[#777777] uppercase tracking-wider">
                  Heavy Organic Cotton
                </p>
              </div>
              <div className="border-x border-[#222222] px-2">
                <p className="font-serif text-lg sm:text-xl font-bold text-[#f8f8f6]">
                  100% <span className="text-[#c9a227] text-sm">Pure</span>
                </p>
                <p className="text-[11px] text-[#777777] uppercase tracking-wider">
                  Egyptian Poplin
                </p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#f8f8f6]">
                  COD <span className="text-[#c9a227] text-sm">Ready</span>
                </p>
                <p className="text-[11px] text-[#777777] uppercase tracking-wider">
                  Nationwide Express
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Banner Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#c9a227]/25 shadow-2xl shadow-black/80 bg-[#121212] group">
              <Image
                src="/images/banners/hero-banner.png"
                alt="ARVYNO Luxury Collection — Wear Your Identity"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Luxury Glass Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 glass-card-gold rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#c9a227]/20 rounded-lg text-[#c9a227] flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f8f8f6] tracking-wide">
                      THE ARVYNO STANDARD
                    </p>
                    <p className="text-[11px] text-[#a0a0a0]">
                      Precision cut, gold embroidered emblem & zero compromise
                    </p>
                  </div>
                </div>
                <Link
                  href="/products/signature-monogram-tee-obsidian"
                  className="hidden sm:inline-flex px-3.5 py-1.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black text-[11px] font-bold uppercase tracking-wider rounded transition-colors"
                >
                  View Iconic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

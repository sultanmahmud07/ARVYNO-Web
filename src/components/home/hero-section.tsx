"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, ChevronLeft, ChevronRight, Pause, Play, Shirt, Feather } from "lucide-react";

interface HeroSlide {
  id: string;
  badgeIcon: React.ElementType;
  badgeText: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metrics: Array<{
    value: string;
    unit: string;
    label: string;
  }>;
  image: string;
  imageAlt: string;
  overlayCard: {
    icon: React.ElementType;
    badge: string;
    subtitle: string;
    linkText: string;
    linkHref: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badgeIcon: Sparkles,
    badgeText: "Autumn / Winter Luxury Atelier",
    titleLine1: "WEAR YOUR",
    titleHighlight: "IDENTITY.",
    description:
      "Premium menswear crafted with heavyweight organic cotton and tailored Egyptian poplin. Engineered for those who express sophistication without saying a word.",
    primaryCta: {
      label: "Shop Collection",
      href: "/products",
    },
    secondaryCta: {
      label: "New Arrivals",
      href: "/categories/new-arrivals",
    },
    metrics: [
      { value: "260+", unit: "GSM", label: "Heavy Organic Cotton" },
      { value: "100%", unit: "Pure", label: "Egyptian Poplin" },
      { value: "COD", unit: "Ready", label: "Nationwide Express" },
    ],
    image: "/images/banners/hero-banner.png",
    imageAlt: "ARVYNO Luxury Collection — Wear Your Identity",
    overlayCard: {
      icon: Award,
      badge: "THE ARVYNO STANDARD",
      subtitle: "Precision cut, gold embroidered emblem & zero compromise",
      linkText: "View Iconic",
      linkHref: "/products/signature-monogram-tee-obsidian",
    },
  },
  {
    id: "slide-2",
    badgeIcon: Shirt,
    badgeText: "260 GSM Heavyweight Knit",
    titleLine1: "ARCHITECTURAL",
    titleHighlight: "DRAPE & FORM.",
    description:
      "Custom-milled dense organic cotton engineered with drop-shoulder geometry and reinforced collar ribbing that never collapses across hundreds of wears.",
    primaryCta: {
      label: "Explore T-Shirts",
      href: "/categories/t-shirts",
    },
    secondaryCta: {
      label: "Signature Drops",
      href: "/products/signature-monogram-tee-obsidian",
    },
    metrics: [
      { value: "260", unit: "GSM", label: "Dense Ring-Spun" },
      { value: "Twin", unit: "Needle", label: "Zero-Sag Collar" },
      { value: "Bio-Wash", unit: "Soft", label: "Pre-Shrunk Texture" },
    ],
    image: "/images/banners/welcome-tee-banner.png",
    imageAlt: "ARVYNO Heavyweight T-Shirt Collection",
    overlayCard: {
      icon: Sparkles,
      badge: "BEST SELLER DROP",
      subtitle: "Signature Monogram Tee in Obsidian Black & Desert Sand",
      linkText: "Shop Monogram",
      linkHref: "/products/signature-monogram-tee-obsidian",
    },
  },
  {
    id: "slide-3",
    badgeIcon: Feather,
    badgeText: "Egyptian Giza Cotton Poplin",
    titleLine1: "QUIET SARTORIAL",
    titleHighlight: "ELEGANCE.",
    description:
      "Silky breathable 100% long-staple cotton poplin shirts with modern spread collars and genuine mother-of-pearl finish buttons. Tailored for effortless authority.",
    primaryCta: {
      label: "Shop Tailored Shirts",
      href: "/categories/shirts",
    },
    secondaryCta: {
      label: "Sky Blue Edition",
      href: "/products/classic-sky-blue-striped-shirt",
    },
    metrics: [
      { value: "100%", unit: "Giza", label: "Egyptian Cotton" },
      { value: "MOP", unit: "Finish", label: "Lustrous Fasteners" },
      { value: "Modern", unit: "Fit", label: "Semi-Spread Collar" },
    ],
    image: "/images/banners/striped-shirts-banner.png",
    imageAlt: "ARVYNO Luxury Striped Shirts Collection",
    overlayCard: {
      icon: Award,
      badge: "ICONIC STRIPES",
      subtitle: "Classic Spread-Collar Striped Shirt in Sky Blue & Navy",
      linkText: "Explore Stripes",
      linkHref: "/products/classic-sky-blue-striped-shirt",
    },
  },
];

const AUTO_SLIDE_DURATION = 6000; // 6 seconds per slide

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-play timer with progress ticker
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / AUTO_SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          nextSlide();
          return 0;
        }
        return oldProgress + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;
  const CardIcon = activeSlide.overlayCard.icon;

  return (
    <section
      aria-label="Featured Collections Hero Banner"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#080808] pt-2 pb-8 sm:pb-10 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a227]/8 rounded-full blur-[160px] pointer-events-none transition-all duration-1000" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#e5c76b]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Slide Master Frame */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-4 sm:py-6">
        
        {/* Panoramic Banner Card with Smart Dissolve: Right Side Clearly Visible, Left Side Faded */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c9a227]/30 shadow-2xl bg-[#0a0a0a] min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] flex items-center group">
          
          {/* Background Sliding Images with Right Visibility & Left Dissolve Mask */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-0 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-right sm:object-[75%_center] lg:object-[80%_center] group-hover:scale-102 transition-transform duration-1000 ease-out"
              />

              {/* Smart Horizontal Dissolve Gradient: Pure solid dark on the left, smooth slow fade, crystal clear on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] from-15% via-[#0a0a0a]/95 via-42% via-[#0a0a0a]/50 via-62% to-transparent to-90%" />
              
              {/* Vertical vignettes for mobile and edge blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-transparent" />
            </div>
          ))}

          {/* Left Column: Changing Editorial Text & Actions over Dark Dissolve */}
          <div className="relative z-10 max-w-xl sm:max-w-2xl p-6 sm:p-10 lg:p-14 space-y-6 sm:space-y-7 text-left">
            
            {/* Top Brand Pill with Dynamic Icon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/15 border border-[#c9a227]/50 text-xs font-semibold uppercase tracking-[0.25em] text-[#e5c76b] shadow-sm backdrop-blur-md">
              <BadgeIcon className="w-3.5 h-3.5 text-[#c9a227] animate-pulse" />
              <span>{activeSlide.badgeText}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2 min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] flex flex-col justify-center">
              <h1
                key={activeSlide.id + "-title"}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8f8f6] leading-[1.08] animate-fade-in"
              >
                {activeSlide.titleLine1} <br />
                <span className="gold-text-gradient font-extrabold">{activeSlide.titleHighlight}</span>
              </h1>
            </div>

            {/* Subheadline Description */}
            <p
              key={activeSlide.id + "-desc"}
              className="text-sm sm:text-base text-[#a8a8a8] max-w-lg leading-relaxed font-light min-h-[48px] animate-fade-in"
            >
              {activeSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <Link
                href={activeSlide.primaryCta.href}
                className="px-8 py-4 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#c9a227]/15 group/btn"
              >
                <span>{activeSlide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={activeSlide.secondaryCta.href}
                className="px-7 py-4 bg-black/60 hover:bg-black/90 text-[#f8f8f6] hover:text-[#e5c76b] border border-white/15 hover:border-[#c9a227]/40 font-semibold text-xs uppercase tracking-[0.2em] rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>{activeSlide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Trust & Craft Highlights */}
            <div className="pt-4 border-t border-[#222222] grid grid-cols-3 gap-4 max-w-lg text-left">
              {activeSlide.metrics.map((metric, idx) => (
                <div key={idx} className={idx === 1 ? "border-x border-[#222222] px-3" : ""}>
                  <p className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#f8f8f6]">
                    {metric.value} <span className="text-[#c9a227] text-xs sm:text-sm">{metric.unit}</span>
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#777777] uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Luxury Glass Card Overlay (Bottom Right) */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-sm glass-card-gold rounded-xl p-3.5 sm:p-4 hidden md:flex items-center justify-between gap-3.5 z-20 transition-all duration-300 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#c9a227]/20 rounded-lg text-[#c9a227] flex-shrink-0">
                <CardIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f8f8f6] tracking-wide">
                  {activeSlide.overlayCard.badge}
                </p>
                <p className="text-[11px] text-[#a0a0a0] line-clamp-1">
                  {activeSlide.overlayCard.subtitle}
                </p>
              </div>
            </div>
            <Link
              href={activeSlide.overlayCard.linkHref}
              className="px-3 py-1.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex-shrink-0"
            >
              {activeSlide.overlayCard.linkText}
            </Link>
          </div>

          {/* Slide Navigation Buttons (Top Right) */}
          <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-full bg-black/60 hover:bg-[#c9a227] text-white hover:text-black border border-white/15 hover:border-[#c9a227] backdrop-blur-md transition-all shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-full bg-black/60 hover:bg-[#c9a227] text-white hover:text-black border border-white/15 hover:border-[#c9a227] backdrop-blur-md transition-all shadow-lg active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Slider Pagination Bar & Progress Line */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a] pt-3">
          
          {/* Slide Indicators with Progress Bar */}
          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`group flex items-center gap-2.5 py-1.5 px-3 rounded-lg transition-all ${
                    isActive ? "bg-white/5 border border-[#c9a227]/40" : "hover:bg-white/5 border border-transparent"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.badgeText}`}
                >
                  <span
                    className={`font-mono text-xs font-bold transition-colors ${
                      isActive ? "text-[#e5c76b]" : "text-[#666666] group-hover:text-[#aaaaaa]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  
                  {/* Progress Line Indicator */}
                  <div className="w-12 sm:w-16 h-1 bg-[#222222] rounded-full overflow-hidden relative">
                    {isActive && (
                      <div
                        className="h-full bg-gradient-to-r from-[#c9a227] to-[#e5c76b] rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pause / Play & Slide Counter Controller */}
          <div className="flex items-center gap-4 text-xs text-[#888888]">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 hover:text-[#e5c76b] transition-colors p-1"
              aria-label={isPaused ? "Resume banner autoplay" : "Pause banner autoplay"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Autoplay Paused</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#888888]" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Playing</span>
                </>
              )}
            </button>

            <span className="text-[#444444]">•</span>
            <span className="font-mono text-[11px] text-[#aaaaaa]">
              {currentSlide + 1} / {HERO_SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

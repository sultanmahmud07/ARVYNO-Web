"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, ProductSize } from "@/types/product";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import {
  Heart,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  RotateCcw,
  Ruler,
  ChevronDown,
  Star,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Award,
  Layers,
  Feather,
  Flame,
} from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";

interface ProductDetailViewProps {
  product: Product;
}

type TabType = "specs" | "size-guide" | "fabric-care" | "reviews" | "shipping";

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || "M"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Default"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<TabType>("specs");

  // Hover Zoom State
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Fullscreen Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoomLevel, setLightboxZoomLevel] = useState(1);

  // Accordion state for side quick view
  const [openAccordions, setOpenAccordions] = useState<{
    details: boolean;
    fabric: boolean;
    shipping: boolean;
  }>({
    details: true,
    fabric: false,
    shipping: false,
  });

  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(
    product.price,
    product.compareAtPrice
  );

  // Handle Mouse Move for Hover Zoom Lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setLightboxZoomLevel(1);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    },
    [isLightboxOpen, product.images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[activeImageIndex] || product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      maxStock: product.stock,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* 1. TOP BUY BOX & IMAGE GALLERY (Sticky Gallery on Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Media Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
          
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Selector Strip (Vertical on Desktop, Horizontal on Mobile) */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] pb-2 sm:pb-0 flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image angle ${idx + 1}`}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-[#141414] border transition-all cursor-pointer flex-shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#c9a227] ring-2 ring-[#c9a227]/40 scale-105 shadow-lg"
                        : "border-[#282828] opacity-60 hover:opacity-100 hover:border-[#444444]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main High-Res Image with Interactive Hover Zoom & Click for Fullscreen Lightbox */}
            <div
              ref={imageContainerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsLightboxOpen(true)}
              className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] shadow-2xl cursor-zoom-in group select-none flex-1"
            >
              {/* Product Image with Smooth Lens Coordinates Scaling */}
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-200 ease-out"
                style={{
                  transformOrigin: isHovered ? `${zoomPos.x}% ${zoomPos.y}%` : "center center",
                  transform: isHovered ? "scale(2.2)" : "scale(1)",
                }}
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.isNew && (
                  <span className="bg-[#c9a227] text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg">
                    NEW ARRIVAL
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-[#991b1b] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Top Right Action Tools (Wishlist & Fullscreen Lightbox Hint) */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  aria-label="View Fullscreen"
                  className="p-2.5 rounded-full bg-black/60 hover:bg-[#c9a227] text-[#f8f8f6] hover:text-black border border-white/15 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    inWishlist
                      ? "bg-[#c9a227] text-black scale-105 shadow-lg"
                      : "bg-black/60 text-[#f8f8f6] hover:bg-black/90 border border-white/15"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-black" : ""}`} />
                </button>
              </div>

              {/* Floating Hover Zoom Pill Helper */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/15 text-[11px] font-semibold text-[#e5c76b] tracking-wider uppercase backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-[#c9a227]" />
                <span>Hover to Zoom • Click for Fullscreen</span>
              </div>
            </div>

          </div>

          {/* Left Column Craft Highlights Box (Fills Space Gracefully on Desktop) */}
          <div className="hidden lg:grid grid-cols-3 gap-3 pt-3">
            <div className="p-3.5 rounded-xl bg-[#111111] border border-[#222222] text-center space-y-1">
              <Award className="w-4 h-4 text-[#c9a227] mx-auto" />
              <p className="font-serif text-xs font-bold text-[#f8f8f6]">
                {product.category === "T-Shirts" ? "260 GSM" : "100% Giza"}
              </p>
              <p className="text-[10px] text-[#777777] uppercase tracking-wider">
                {product.category === "T-Shirts" ? "Heavy Organic Cotton" : "Egyptian Poplin"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111111] border border-[#222222] text-center space-y-1">
              <Layers className="w-4 h-4 text-[#c9a227] mx-auto" />
              <p className="font-serif text-xs font-bold text-[#f8f8f6]">Twin-Needle</p>
              <p className="text-[10px] text-[#777777] uppercase tracking-wider">Zero-Sag Collar</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111111] border border-[#222222] text-center space-y-1">
              <Truck className="w-4 h-4 text-[#c9a227] mx-auto" />
              <p className="font-serif text-xs font-bold text-[#f8f8f6]">Nationwide</p>
              <p className="text-[10px] text-[#777777] uppercase tracking-wider">Cash on Delivery</p>
            </div>
          </div>

        </div>

        {/* Right Product Buy Information */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          
          <div>
            {/* Category & Stock */}
            <div className="flex items-center justify-between text-xs text-[#888888] uppercase tracking-widest pb-1">
              <span className="text-[#c9a227] font-semibold">{product.category}</span>
              <span
                className={`flex items-center gap-1.5 font-medium ${
                  product.stock > 0 ? "text-[#4ade80]" : "text-[#f87171]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.stock > 0 ? "bg-[#4ade80]" : "bg-[#f87171]"
                  }`}
                />
                {product.stock > 0 ? "In Stock (Ready to Ship)" : "Sold Out"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-1 leading-snug">
              {product.name}
            </h1>

            {/* Subtitle */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-[#e5c76b] font-medium tracking-wide mt-1.5">
                {product.subtitle}
              </p>
            )}

            {/* Reviews Rating */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#1f1f1f]">
              <div className="flex items-center text-[#c9a227]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#c9a227] text-[#c9a227]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#f8f8f6]">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-[#777777]">
                ({product.reviewCount} Verified Customer Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-3.5 flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#e5c76b]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm sm:text-base text-[#777777] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Short Editorial Description */}
          <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Color Swatch Selection */}
          <div className="space-y-2 pt-2 border-t border-[#1f1f1f]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-medium uppercase tracking-wider">
                Color: <span className="text-[#f8f8f6] font-bold">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? "bg-[#1f1f1f] text-[#f8f8f6] border-[#c9a227] ring-1 ring-[#c9a227]"
                      : "bg-[#121212] text-[#888888] border-[#292929] hover:border-[#444444]"
                  }`}
                >
                  <span
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/40"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection (Compact on Mobile) */}
          <div className="space-y-2 pt-2 border-t border-[#1f1f1f]">
            <div className="flex justify-between items-center text-[11px] sm:text-xs">
              <span className="text-[#888888] font-medium uppercase tracking-wider">
                Select Size: <span className="text-[#f8f8f6] font-bold">{selectedSize}</span>
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-1 text-[#e5c76b] hover:text-[#ffffff] transition-colors cursor-pointer text-[11px] sm:text-xs"
              >
                <Ruler className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            
            {/* Sized buttons — Refined & smaller on mobile screens */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 sm:py-3 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black border-[#c9a227] shadow-lg shadow-[#c9a227]/15"
                      : "bg-[#141414] text-[#cccccc] border-[#282828] hover:border-[#444444]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Action Buttons — Sized smaller & compact on mobile */}
          <div className="space-y-2 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-[#1f1f1f]">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#2d2d2d] rounded-lg sm:rounded-xl bg-[#141414] px-1 sm:px-2 py-1 sm:py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[#888888] hover:text-[#ffffff] disabled:opacity-30 cursor-pointer text-xs sm:text-base font-bold"
                >
                  -
                </button>
                <span className="w-5 sm:w-8 text-center text-xs sm:text-sm font-bold font-mono text-[#f8f8f6]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[#888888] hover:text-[#ffffff] disabled:opacity-30 cursor-pointer text-xs sm:text-base font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button (Compact on Mobile) */}
              <button
                onClick={() => handleAddToCart()}
                disabled={product.stock <= 0}
                className="flex-1 py-2 sm:py-3.5 px-3 sm:px-6 bg-[#c9a227] hover:bg-[#e5c76b] active:scale-[0.98] text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-xl shadow-[#c9a227]/15 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Buy Now Direct Button (Compact on Mobile) */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-2 sm:py-3 px-3 sm:px-6 bg-[#181818] hover:bg-[#222222] text-[#f8f8f6] hover:text-[#e5c76b] border border-[#2d2d2d] hover:border-[#c9a227]/40 font-semibold text-[11px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Buy Now with Cash on Delivery</span>
            </button>
          </div>

          {/* Value Prop Badges */}
          <div className="grid grid-cols-2 gap-2 pt-0.5 text-[10px] sm:text-xs text-[#999999]">
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-lg bg-[#121212] border border-[#202020]">
              <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9a227] flex-shrink-0" />
              <span>Nationwide COD</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-lg bg-[#121212] border border-[#202020]">
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9a227] flex-shrink-0" />
              <span>7-Day Size Exchange</span>
            </div>
          </div>

          {/* Quick Accordions */}
          <div className="space-y-2 pt-2 border-t border-[#1f1f1f]">
            {/* Details & Specs */}
            <div className="border border-[#242424] rounded-lg sm:rounded-xl overflow-hidden bg-[#121212]">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full flex items-center justify-between p-2.5 sm:p-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#f8f8f6] cursor-pointer"
              >
                <span>Product Specifications & Details</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                    openAccordions.details ? "rotate-180 text-[#c9a227]" : ""
                  }`}
                />
              </button>
              {openAccordions.details && (
                <div className="p-2.5 sm:p-3.5 pt-0 text-[11px] sm:text-xs text-[#a0a0a0] space-y-1.5 border-t border-[#1f1f1f]">
                  <ul className="list-disc list-inside space-y-1 pt-1.5">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Fabric & Care */}
            <div className="border border-[#242424] rounded-lg sm:rounded-xl overflow-hidden bg-[#121212]">
              <button
                onClick={() => toggleAccordion("fabric")}
                className="w-full flex items-center justify-between p-2.5 sm:p-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#f8f8f6] cursor-pointer"
              >
                <span>Fabric & Garment Care</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                    openAccordions.fabric ? "rotate-180 text-[#c9a227]" : ""
                  }`}
                />
              </button>
              {openAccordions.fabric && (
                <div className="p-2.5 sm:p-3.5 pt-0 text-[11px] sm:text-xs text-[#a0a0a0] space-y-1.5 border-t border-[#1f1f1f]">
                  <ul className="list-disc list-inside space-y-1 pt-1.5">
                    {product.fabricCare.map((care, idx) => (
                      <li key={idx}>{care}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="border border-[#242424] rounded-lg sm:rounded-xl overflow-hidden bg-[#121212]">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between p-2.5 sm:p-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#f8f8f6] cursor-pointer"
              >
                <span>Shipping, Delivery & Returns</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                    openAccordions.shipping ? "rotate-180 text-[#c9a227]" : ""
                  }`}
                />
              </button>
              {openAccordions.shipping && (
                <div className="p-2.5 sm:p-3.5 pt-0 text-[11px] sm:text-xs text-[#a0a0a0] space-y-1.5 border-t border-[#1f1f1f]">
                  <div className="pt-1.5 space-y-0.5">
                    <p className="text-[#f8f8f6] font-medium">Inside Dhaka Delivery:</p>
                    <p>৳80 standard delivery within 24 – 48 Hours.</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[#f8f8f6] font-medium">Outside Dhaka Delivery:</p>
                    <p>৳150 delivery across all Bangladesh districts within 3 – 5 business days.</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[#e5c76b] font-medium">Free Shipping Privilege:</p>
                    <p>All orders over ৳3,000 qualify for free express nationwide delivery.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. RICH BOTTOM PRODUCT DETAIL SECTIONS (Fills Page Space with Complete Product Information) */}
      <ScrollReveal direction="up" duration={700}>
        <div className="border-t border-[#202020] pt-8 sm:pt-12 space-y-6 sm:space-y-8">
          
          {/* Interactive Editorial Tab Navigation (Sleek, Compact, & Fully Visible on Mobile) */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 bg-[#101010] border border-[#222222] rounded-xl sm:rounded-2xl max-w-fit mx-auto">
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                  activeTab === "specs"
                    ? "bg-[#c9a227] text-black shadow-md shadow-[#c9a227]/25"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#181818]"
                }`}
              >
                <span className="sm:hidden">Specs</span>
                <span className="hidden sm:inline">Atelier Specifications</span>
              </button>

              <button
                onClick={() => setActiveTab("size-guide")}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                  activeTab === "size-guide"
                    ? "bg-[#c9a227] text-black shadow-md shadow-[#c9a227]/25"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#181818]"
                }`}
              >
                <span className="sm:hidden">Measurements</span>
                <span className="hidden sm:inline">Size & Measurements</span>
              </button>

              <button
                onClick={() => setActiveTab("fabric-care")}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                  activeTab === "fabric-care"
                    ? "bg-[#c9a227] text-black shadow-md shadow-[#c9a227]/25"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#181818]"
                }`}
              >
                <span className="sm:hidden">Care</span>
                <span className="hidden sm:inline">Fabric & Care</span>
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "bg-[#c9a227] text-black shadow-md shadow-[#c9a227]/25"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#181818]"
                }`}
              >
                Reviews ({product.reviewCount})
              </button>

              <button
                onClick={() => setActiveTab("shipping")}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                  activeTab === "shipping"
                    ? "bg-[#c9a227] text-black shadow-md shadow-[#c9a227]/25"
                    : "text-[#888888] hover:text-[#f8f8f6] hover:bg-[#181818]"
                }`}
              >
                <span className="sm:hidden">Shipping</span>
                <span className="hidden sm:inline">Shipping & Policy</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="glass-card rounded-xl sm:rounded-3xl p-4 sm:p-10 border border-[#222222]">
            
            {/* Tab 1: Specifications */}
            {activeTab === "specs" && (
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                <div className="max-w-2xl space-y-1.5 sm:space-y-2">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Craftsmanship Architecture
                  </p>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#f8f8f6]">
                    Engineered For Architectural Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed font-light">
                    Every seam, cut, and fiber is meticulously calculated in our Dhaka atelier to provide an uncompromised drape and enduring tactile feel.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {product.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl bg-[#121212] border border-[#242424] space-y-1.5 hover:border-[#c9a227]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-[#c9a227]">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-mono text-[11px] sm:text-xs font-bold">Feature 0{idx + 1}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#cccccc] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Size & Measurements Guide */}
            {activeTab === "size-guide" && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div className="max-w-2xl space-y-1.5 sm:space-y-2">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Fit & Proportions
                  </p>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#f8f8f6]">
                    Finished Garment Dimensions
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a0a0a0] font-light">
                    All dimensions are in inches. Designed with an intentional contemporary drape.
                  </p>
                </div>

                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <table className="w-full text-[11px] sm:text-xs text-left">
                    <thead className="bg-[#181818] text-[#e5c76b] uppercase tracking-wider">
                      <tr>
                        <th className="p-2 sm:p-3.5">Size</th>
                        <th className="p-2 sm:p-3.5">Chest (in)</th>
                        <th className="p-2 sm:p-3.5">Length (in)</th>
                        <th className="p-2 sm:p-3.5">Sleeve (in)</th>
                        <th className="p-2 sm:p-3.5">Fit Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222222] text-[#cccccc]">
                      <tr>
                        <td className="p-2 sm:p-3.5 font-bold text-white">S (Small)</td>
                        <td className="p-2 sm:p-3.5">38 – 40</td>
                        <td className="p-2 sm:p-3.5">28.0</td>
                        <td className="p-2 sm:p-3.5">8.5</td>
                        <td className="p-2 sm:p-3.5 text-[#e5c76b]">Tailored Fit</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3.5 font-bold text-white">M (Medium)</td>
                        <td className="p-2 sm:p-3.5">40 – 42</td>
                        <td className="p-2 sm:p-3.5">29.0</td>
                        <td className="p-2 sm:p-3.5">9.0</td>
                        <td className="p-2 sm:p-3.5 text-[#e5c76b]">Standard / Relaxed</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3.5 font-bold text-white">L (Large)</td>
                        <td className="p-2 sm:p-3.5">42 – 44</td>
                        <td className="p-2 sm:p-3.5">30.0</td>
                        <td className="p-2 sm:p-3.5">9.5</td>
                        <td className="p-2 sm:p-3.5 text-[#e5c76b]">Elevated Drape</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3.5 font-bold text-white">XL (Extra Large)</td>
                        <td className="p-2 sm:p-3.5">44 – 46</td>
                        <td className="p-2 sm:p-3.5">31.0</td>
                        <td className="p-2 sm:p-3.5">10.0</td>
                        <td className="p-2 sm:p-3.5 text-[#e5c76b]">Drop Shoulder Silhouette</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3.5 font-bold text-white">XXL (Double XL)</td>
                        <td className="p-2 sm:p-3.5">46 – 48</td>
                        <td className="p-2 sm:p-3.5">32.0</td>
                        <td className="p-2 sm:p-3.5">10.5</td>
                        <td className="p-2 sm:p-3.5 text-[#e5c76b]">Generous Oversized</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Fabric & Care */}
            {activeTab === "fabric-care" && (
              <div className="space-y-6 animate-fade-in">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Preservation Ritual
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6]">
                    How to Care For Your ARVYNO Piece
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a0a0a0] font-light">
                    Follow these bespoke care recommendations to maintain the deep color saturation and knit density across years of wear.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.fabricCare.map((care, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-[#242424] flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#c9a227]/10 text-[#c9a227] flex-shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-[#cccccc] leading-relaxed pt-1">{care}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#222222]">
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-[#f8f8f6]">
                      {product.rating} <span className="text-[#c9a227] text-lg font-normal">/ 5.0</span>
                    </h3>
                    <p className="text-xs text-[#888888] mt-1">
                      Based on {product.reviewCount} verified client purchases
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[#c9a227]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#c9a227] text-[#c9a227]" />
                    ))}
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f8f8f6]">Tanvir A.</span>
                        <span className="text-[10px] text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified Buyer
                        </span>
                      </div>
                      <span className="text-[#666666]">3 days ago</span>
                    </div>
                    <div className="flex text-[#c9a227]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c9a227] text-[#c9a227]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#cccccc] leading-relaxed">
                      &ldquo;The fabric thickness and collar structure on this piece are unmatched. Truly luxury quality compared to ordinary brands in Bangladesh.&rdquo;
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f8f8f6]">Sabbir H.</span>
                        <span className="text-[10px] text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified Buyer
                        </span>
                      </div>
                      <span className="text-[#666666]">1 week ago</span>
                    </div>
                    <div className="flex text-[#c9a227]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c9a227] text-[#c9a227]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#cccccc] leading-relaxed">
                      &ldquo;The fit is impeccably tailored. The gold accents and custom neck tagging give it an authentic designer feel. Fast COD delivery in Gulshan.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Shipping & Delivery */}
            {activeTab === "shipping" && (
              <div className="space-y-6 animate-fade-in">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
                    Nationwide Dispatch
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6]">
                    Delivery Timelines & Exchange Policy
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-2">
                    <Truck className="w-5 h-5 text-[#c9a227]" />
                    <h4 className="font-serif text-sm font-bold text-[#f8f8f6]">Inside Dhaka</h4>
                    <p className="text-xs text-[#a0a0a0]">৳80 Express Delivery within 24 to 48 hours.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-2">
                    <ShieldCheck className="w-5 h-5 text-[#c9a227]" />
                    <h4 className="font-serif text-sm font-bold text-[#f8f8f6]">Outside Dhaka</h4>
                    <p className="text-xs text-[#a0a0a0]">৳150 Delivery across all 64 districts within 3 to 5 days.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#121212] border border-[#242424] space-y-2">
                    <RotateCcw className="w-5 h-5 text-[#c9a227]" />
                    <h4 className="font-serif text-sm font-bold text-[#f8f8f6]">7-Day Size Exchange</h4>
                    <p className="text-xs text-[#a0a0a0]">Hassle-free size replacement if it doesn&apos;t fit your silhouette.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </ScrollReveal>

      {/* 3. FULLSCREEN LIGHTBOX MODAL (Click to View Larger Image) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Controls */}
          <div className="flex items-center justify-between z-20">
            <div className="text-xs font-mono text-[#e5c76b] tracking-wider">
              {product.name} • Image {activeImageIndex + 1} of {product.images.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxZoomLevel((prev) => Math.min(3, prev + 0.5))}
                aria-label="Zoom in"
                className="p-2 rounded-full bg-white/10 hover:bg-[#c9a227] text-white hover:text-black transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightboxZoomLevel((prev) => Math.max(1, prev - 0.5))}
                aria-label="Zoom out"
                className="p-2 rounded-full bg-white/10 hover:bg-[#c9a227] text-white hover:text-black transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setLightboxZoomLevel(1);
                }}
                aria-label="Close Lightbox"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image View */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c9a227] text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-4xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${lightboxZoomLevel})`,
                }}
              />
            </div>

            <button
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % product.images.length)}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c9a227] text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-20">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setLightboxZoomLevel(1);
                }}
                className={`relative w-14 h-18 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-[#c9a227] ring-2 ring-[#c9a227] scale-105"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="60px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-lg glass-modal rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-[#2d2d2d] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#c9a227]" />
                <h3 className="font-serif text-lg font-bold text-[#f8f8f6]">
                  ARVYNO Luxury Size Chart
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-[#777777] hover:text-[#f8f8f6] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#181818] text-[#e5c76b] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Length (in)</th>
                    <th className="p-3">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] text-[#cccccc]">
                  <tr>
                    <td className="p-3 font-bold text-white">S</td>
                    <td className="p-3">38 – 40</td>
                    <td className="p-3">28</td>
                    <td className="p-3">8.5</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">M</td>
                    <td className="p-3">40 – 42</td>
                    <td className="p-3">29</td>
                    <td className="p-3">9.0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">L</td>
                    <td className="p-3">42 – 44</td>
                    <td className="p-3">30</td>
                    <td className="p-3">9.5</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XL</td>
                    <td className="p-3">44 – 46</td>
                    <td className="p-3">31</td>
                    <td className="p-3">10.0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XXL</td>
                    <td className="p-3">46 – 48</td>
                    <td className="p-3">32</td>
                    <td className="p-3">10.5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#888888] leading-relaxed">
              * Measurements reflect the finished garment dimensions. For an oversized look, we recommend staying true to your standard size.
            </p>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full py-2.5 sm:py-3 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

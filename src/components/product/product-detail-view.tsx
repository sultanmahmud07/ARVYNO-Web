"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

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

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{
    details: boolean;
    fabric: boolean;
    shipping: boolean;
    returns: boolean;
  }>({
    details: true,
    fabric: false,
    shipping: true,
    returns: false,
  });

  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(
    product.price,
    product.compareAtPrice
  );

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Left Media Gallery */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main High-Res Image Display */}
        <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#141414] border border-[#242424] shadow-2xl">
          <Image
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-all duration-300"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="bg-[#c9a227] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg">
                NEW ARRIVAL
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#991b1b] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-lg">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label={
              inWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 ${inWishlist
                ? "bg-[#c9a227] text-black scale-110 shadow-lg"
                : "bg-black/60 text-[#f8f8f6] hover:bg-black/90"
              }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? "fill-black" : ""}`} />
          </button>
        </div>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden bg-[#141414] border flex-shrink-0 transition-all ${activeImageIndex === idx
                    ? "border-[#c9a227] ring-2 ring-[#c9a227]/40 scale-105"
                    : "border-[#282828] opacity-60 hover:opacity-100"
                  }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Product Buy Information */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          {/* Category & Stock */}
          <div className="flex items-center justify-between text-xs text-[#888888] uppercase tracking-widest pb-1">
            <span className="text-[#c9a227] font-semibold">{product.category}</span>
            <span
              className={`flex items-center gap-1.5 font-medium ${product.stock > 0 ? "text-[#4ade80]" : "text-[#f87171]"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-[#4ade80]" : "bg-[#f87171]"
                  }`}
              />
              {product.stock > 0 ? "In Stock (Ready to Ship)" : "Sold Out"}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-1">
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
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#c9a227] text-[#c9a227]"
                />
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
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#e5c76b]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-[#777777] line-through">
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
        <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
          {product.description}
        </p>

        {/* Color Swatch Selection */}
        <div className="space-y-2.5 pt-2 border-t border-[#1f1f1f]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#888888] font-medium uppercase tracking-wider">
              Color: <span className="text-[#f8f8f6] font-bold">{selectedColor}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${selectedColor === c.name
                    ? "bg-[#1f1f1f] text-[#f8f8f6] border-[#c9a227] ring-1 ring-[#c9a227]"
                    : "bg-[#121212] text-[#888888] border-[#292929] hover:border-[#444444]"
                  }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/40"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2.5 pt-2 border-t border-[#1f1f1f]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#888888] font-medium uppercase tracking-wider">
              Select Size:{" "}
              <span className="text-[#f8f8f6] font-bold">{selectedSize}</span>
            </span>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="flex items-center gap-1 text-[#e5c76b] hover:text-[#ffffff] transition-colors"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Guide</span>
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedSize === size
                    ? "bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black border-[#c9a227] shadow-lg shadow-[#c9a227]/15"
                    : "bg-[#141414] text-[#cccccc] border-[#282828] hover:border-[#444444]"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and CTA Buttons */}
        <div className="space-y-3 pt-3 border-t border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#2d2d2d] rounded-xl bg-[#141414] px-2 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#ffffff] disabled:opacity-30"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-bold font-mono text-[#f8f8f6]">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
                className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#ffffff] disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={() => handleAddToCart()}
              disabled={product.stock <= 0}
              className="flex-1 py-4 px-6 bg-[#c9a227] hover:bg-[#e5c76b] active:scale-[0.98] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c9a227]/15"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
                </>
              )}
            </button>
          </div>

          {/* Buy Now Direct Button */}
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="w-full py-3.5 px-6 bg-[#181818] hover:bg-[#222222] text-[#f8f8f6] hover:text-[#e5c76b] border border-[#2d2d2d] hover:border-[#c9a227]/40 font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#c9a227]" />
            <span>Buy Now with Cash on Delivery</span>
          </button>
        </div>

        {/* Value Prop Badges */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#999999]">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#121212] border border-[#202020]">
            <Truck className="w-4 h-4 text-[#c9a227]" />
            <span>Nationwide COD</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#121212] border border-[#202020]">
            <RotateCcw className="w-4 h-4 text-[#c9a227]" />
            <span>7-Day Size Exchange</span>
          </div>
        </div>

        {/* Product Information Accordions */}
        <div className="space-y-3 pt-4 border-t border-[#1f1f1f]">
          {/* Details & Specs */}
          <div className="border border-[#242424] rounded-xl overflow-hidden bg-[#121212]">
            <button
              onClick={() => toggleAccordion("details")}
              className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#f8f8f6]"
            >
              <span>Product Specifications & Details</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${openAccordions.details ? "rotate-180 text-[#c9a227]" : ""
                  }`}
              />
            </button>
            {openAccordions.details && (
              <div className="p-4 pt-0 text-xs text-[#a0a0a0] space-y-2 border-t border-[#1f1f1f]">
                <ul className="list-disc list-inside space-y-1.5 pt-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Fabric & Care */}
          <div className="border border-[#242424] rounded-xl overflow-hidden bg-[#121212]">
            <button
              onClick={() => toggleAccordion("fabric")}
              className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#f8f8f6]"
            >
              <span>Fabric & Garment Care</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${openAccordions.fabric ? "rotate-180 text-[#c9a227]" : ""
                  }`}
              />
            </button>
            {openAccordions.fabric && (
              <div className="p-4 pt-0 text-xs text-[#a0a0a0] space-y-2 border-t border-[#1f1f1f]">
                <ul className="list-disc list-inside space-y-1.5 pt-2">
                  {product.fabricCare.map((care, idx) => (
                    <li key={idx}>{care}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="border border-[#242424] rounded-xl overflow-hidden bg-[#121212]">
            <button
              onClick={() => toggleAccordion("shipping")}
              className="w-full flex items-center justify-between p-4 text-xs font-semibold uppercase tracking-wider text-[#f8f8f6]"
            >
              <span>Shipping, Delivery & Returns</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${openAccordions.shipping ? "rotate-180 text-[#c9a227]" : ""
                  }`}
              />
            </button>
            {openAccordions.shipping && (
              <div className="p-4 pt-0 text-xs text-[#a0a0a0] space-y-2.5 border-t border-[#1f1f1f]">
                <div className="pt-2 space-y-1">
                  <p className="text-[#f8f8f6] font-medium">Inside Dhaka Delivery:</p>
                  <p>৳80 standard delivery within 24 – 48 Hours.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#f8f8f6] font-medium">Outside Dhaka Delivery:</p>
                  <p>৳150 delivery across all Bangladesh districts within 3 – 5 business days.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#e5c76b] font-medium">Free Shipping Privilege:</p>
                  <p>All orders over ৳3,000 qualify for free express nationwide delivery.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-lg glass-modal rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-[#2d2d2d]">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#c9a227]" />
                <h3 className="font-serif text-lg font-bold text-[#f8f8f6]">
                  ARVYNO Luxury Size Chart
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-[#777777] hover:text-[#f8f8f6]"
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
              * Measurements reflect the finished garment dimensions. For an
              oversized look, we recommend staying true to your standard size.
            </p>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="w-full py-3 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductSize } from "@/types/product";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
}

export function ProductCard({ product, priorityImage = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Default"
  );
  const [selectedSize] = useState<ProductSize>(
    product.sizes[0] || "M"
  );
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = calculateDiscountPercentage(
    product.price,
    product.compareAtPrice
  );
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      maxStock: product.stock,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-[#111111] rounded-2xl border border-[#1e1e1e] hover:border-[#c9a227]/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161616]">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full"
          tabIndex={-1}
        >
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
            priority={priorityImage}
          />

          {/* Secondary Hover Image */}
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#c9a227] text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
              NEW
            </span>
          )}
          {product.isTrending && !product.isNew && (
            <span className="bg-[#121212]/90 backdrop-blur-md border border-[#c9a227]/40 text-[#e5c76b] text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
              TRENDING
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#8b1515] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={
            inWishlist
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            inWishlist
              ? "bg-[#c9a227] text-black shadow-lg scale-105"
              : "bg-black/50 text-[#cccccc] hover:text-[#f8f8f6] hover:bg-black/80 hover:scale-105"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${inWishlist ? "fill-black text-black" : ""}`}
          />
        </button>

        {/* Desktop Quick Add Action Bar on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center justify-center gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className="w-full py-2.5 px-4 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#111111]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="uppercase tracking-[0.18em] font-semibold text-[#c9a227] truncate">
              {product.category}
            </span>
            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-[#e5c76b] flex-shrink-0">
                <Star className="w-3 h-3 fill-[#c9a227] text-[#c9a227]" />
                <span className="text-[11px] font-medium text-[#cccccc]">
                  {product.rating}
                </span>
                <span className="text-[10px] text-[#666666]">
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-1.5 font-serif text-sm sm:text-base font-semibold text-[#f8f8f6] group-hover:text-[#e5c76b] transition-colors line-clamp-2 leading-snug">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Subtitle / Fabric info */}
          {product.subtitle && (
            <p className="text-xs text-[#888888] line-clamp-1 mt-1 font-sans">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-3 border-t border-[#1c1c1c] flex items-center justify-between gap-2">
          {/* Colors */}
          <div className="flex items-center space-x-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? "border-[#e5c76b] ring-2 ring-[#c9a227]/40 scale-110"
                    : "border-[#444444] opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#777777] pl-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          {/* Price Presentation */}
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#f8f8f6]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#666666] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden pt-1">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className="w-full py-2 bg-[#181818] hover:bg-[#c9a227] hover:text-black text-[#e5c76b] font-semibold text-xs uppercase tracking-wider rounded-xl border border-[#2a2a2a] flex items-center justify-center gap-1.5 transition-colors"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

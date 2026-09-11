"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    summary,
    isLoaded,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full glass-drawer flex flex-col justify-between shadow-2xl border-l border-[#262626] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#c9a227]" />
              <h2 className="font-serif text-lg font-bold tracking-wider text-[#f8f8f6]">
                SHOPPING BAG
              </h2>
              <span className="text-xs text-[#888888]">
                ({summary.itemCount} {summary.itemCount === 1 ? "item" : "items"})
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 text-[#888888] hover:text-[#f8f8f6] rounded-full hover:bg-[#1f1f1f] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#111111] border-b border-[#202020]">
              {summary.amountNeededForFreeDelivery > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-xs text-[#cccccc] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
                    Add{" "}
                    <span className="text-[#e5c76b] font-semibold">
                      {formatPrice(summary.amountNeededForFreeDelivery)}
                    </span>{" "}
                    more for <span className="text-[#c9a227] font-semibold">Free Delivery</span>
                  </p>
                  <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#c9a227] to-[#e5c76b] h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          ((summary.freeDeliveryThreshold -
                            summary.amountNeededForFreeDelivery) /
                            summary.freeDeliveryThreshold) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#e5c76b] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#c9a227]" />
                  Congratulations! You unlocked Free Nationwide Delivery.
                </p>
              )}
            </div>
          )}

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#222222]">
            {!isLoaded || items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#262626] flex items-center justify-center text-[#666666]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-base text-[#f8f8f6]">
                    Your bag is waiting for something special.
                  </p>
                  <p className="text-xs text-[#888888] max-w-xs">
                    Explore our collection of heavy cotton tees and tailored shirts.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-semibold text-xs uppercase tracking-widest rounded transition-all"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Item Image */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#141414] flex-shrink-0 border border-[#242424]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-xs font-semibold text-[#f8f8f6] hover:text-[#c9a227] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="text-[#666666] hover:text-[#ef4444] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#888888]">
                        <span className="px-1.5 py-0.5 bg-[#1e1e1e] rounded text-[#cccccc] border border-[#2c2c2c]">
                          Size: {item.size}
                        </span>
                        <span className="text-[#666666]">•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#2a2a2a] rounded bg-[#141414]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#888888] hover:text-[#ffffff] disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium text-[#f8f8f6]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.maxStock || 10)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#888888] hover:text-[#ffffff] disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#e5c76b]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-[#666666]">
                            {formatPrice(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0e0e0e] border-t border-[#222222] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#888888]">
                  <span>Subtotal</span>
                  <span className="text-[#f8f8f6] font-medium">
                    {formatPrice(summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#888888]">
                  <span>Estimated Delivery</span>
                  <span>
                    {summary.deliveryFee === 0 ? (
                      <span className="text-[#e5c76b] font-medium">FREE</span>
                    ) : (
                      formatPrice(summary.deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#f8f8f6] pt-2 border-t border-[#222222]">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#e5c76b]">
                    {formatPrice(summary.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#c9a227] to-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#c9a227]/10"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block py-2.5 px-4 text-center text-xs font-semibold uppercase tracking-wider text-[#cccccc] hover:text-[#ffffff] bg-[#1a1a1a] hover:bg-[#222222] border border-[#2b2b2b] rounded-lg transition-colors"
                >
                  View Full Bag
                </Link>
              </div>

              <p className="text-[10px] text-center text-[#666666]">
                Cash on Delivery Available • 7-Day Size Exchange
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

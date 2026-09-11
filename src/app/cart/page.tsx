"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Breadcrumb } from "@/components/common/breadcrumb";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
} from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, summary, isLoaded } =
    useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "ARVYNOFIRST") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try ARVYNOFIRST for priority privilege.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Header */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Shopping Bag" }]} />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f8f6] mt-3">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1">
            Review your selected garments before proceeding to checkout.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {items.length === 0 ? (
          <div className="max-w-md mx-auto my-16 text-center py-16 px-6 glass-card rounded-3xl border border-[#222222] space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#161616] border border-[#2d2d2d] flex items-center justify-center mx-auto text-[#666666]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif text-xl font-bold text-[#f8f8f6]">
                Your cart is waiting for something special.
              </h2>
              <p className="text-xs text-[#888888]">
                Discover our signature heavyweight t-shirts and luxury striped
                shirts.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-xl glass-card border border-[#242424] space-y-2">
                {summary.amountNeededForFreeDelivery > 0 ? (
                  <>
                    <p className="text-xs text-[#cccccc] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c9a227]" />
                      Add{" "}
                      <span className="text-[#e5c76b] font-bold">
                        {formatPrice(summary.amountNeededForFreeDelivery)}
                      </span>{" "}
                      more to unlock{" "}
                      <span className="text-[#c9a227] font-semibold">
                        Free Nationwide Delivery
                      </span>
                      !
                    </p>
                    <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
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
                  </>
                ) : (
                  <p className="text-xs text-[#e5c76b] font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c9a227]" />
                    Complimentary Express Nationwide Delivery unlocked on this order!
                  </p>
                )}
              </div>

              {/* Items Card */}
              <div className="glass-card rounded-2xl border border-[#222222] divide-y divide-[#202020] overflow-hidden">
                <div className="p-4 bg-[#141414] flex justify-between items-center text-xs text-[#888888] uppercase tracking-wider font-semibold">
                  <span>Garment Details</span>
                  <button
                    onClick={clearCart}
                    className="text-[#888888] hover:text-[#ef4444] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#161616] border border-[#2a2a2a] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-medium text-sm text-[#f8f8f6] hover:text-[#c9a227] transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-[#888888]">
                        <span className="px-2 py-0.5 bg-[#1a1a1a] rounded text-[#cccccc] border border-[#2c2c2c]">
                          Size: {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#e5c76b] sm:hidden pt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                      {/* Adjuster */}
                      <div className="flex items-center border border-[#2d2d2d] rounded-lg bg-[#141414]">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-2 text-[#888888] hover:text-white disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-[#f8f8f6]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= (item.maxStock || 10)}
                          aria-label="Increase quantity"
                          className="p-2 text-[#888888] hover:text-white disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right min-w-[90px]">
                        <p className="text-sm sm:text-base font-bold text-[#e5c76b]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-[#666666] hover:text-[#ef4444] transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <Link
                  href="/products"
                  className="text-xs font-semibold uppercase tracking-wider text-[#e5c76b] hover:text-white transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-5">
                <h3 className="font-serif text-lg font-bold text-[#f8f8f6] pb-3 border-b border-[#202020]">
                  Order Summary
                </h3>

                {/* Subtotal & Delivery */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#888888]">
                    <span>Subtotal ({summary.itemCount} items)</span>
                    <span className="text-[#f8f8f6] font-medium">
                      {formatPrice(summary.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#888888]">
                    <span>Delivery (Inside Dhaka)</span>
                    <span>
                      {summary.deliveryFee === 0 ? (
                        <span className="text-[#e5c76b] font-semibold">FREE</span>
                      ) : (
                        formatPrice(summary.deliveryFee)
                      )}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-[#4ade80]">
                      <span>VIP Privilege (ARVYNOFIRST)</span>
                      <span>Complimentary Shipping</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#202020] flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#f8f8f6]">
                      Estimated Total
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#e5c76b]">
                      {formatPrice(summary.total)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#666666]" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. ARVYNOFIRST)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f8f8f6] uppercase placeholder-[#666666] focus:outline-none focus:border-[#c9a227]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#282828] text-[#cccccc] hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-[#ef4444] mt-1.5">
                      {promoError}
                    </p>
                  )}
                  {promoApplied && (
                    <p className="text-[11px] text-[#4ade80] mt-1.5">
                      Privilege code applied successfully!
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c9a227]/15"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-center text-[#666666]">
                  No account required • Cash on delivery nationwide
                </p>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-xl bg-[#101010] border border-[#1f1f1f] space-y-3 text-xs text-[#888888]">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                  <span>Express Dispatch within 24 Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                  <span>100% Quality Guarantee & Inspection</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-[#c9a227] flex-shrink-0" />
                  <span>7-Day Effortless Size Exchanges</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

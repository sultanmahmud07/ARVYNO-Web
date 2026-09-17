"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { createOrder } from "@/lib/services/order-service";
import { CustomerInfo, DeliveryZone } from "@/types/order";
import { DELIVERY_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { Breadcrumb } from "@/components/common/breadcrumb";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  Building,
} from "lucide-react";

const BD_DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Gazipur",
  "Narayanganj",
  "Cumilla",
  "Bogura",
  "Cox's Bazar",
  "Jessore",
  "Tangail",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, clearCart, isLoaded } = useCart();

  const [zone, setZone] = useState<DeliveryZone>("inside_dhaka");
  const [formData, setFormData] = useState<{
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryNote: string;
  }>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    postalCode: "",
    deliveryNote: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate delivery fee dynamically based on selected zone & free delivery threshold
  const isFreeDelivery = summary.subtotal >= DELIVERY_CONFIG.freeDeliveryThreshold;
  const currentDeliveryFee =
    summary.subtotal === 0
      ? 0
      : isFreeDelivery
        ? 0
        : zone === "inside_dhaka"
          ? DELIVERY_CONFIG.insideDhaka
          : DELIVERY_CONFIG.outsideDhaka;

  const currentTotal = summary.subtotal + currentDeliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleZoneChange = (newZone: DeliveryZone) => {
    setZone(newZone);
    if (newZone === "inside_dhaka" && formData.city !== "Dhaka") {
      setFormData((prev) => ({ ...prev, city: "Dhaka" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your mobile phone number";
    } else if (!/^(\+?880|0)1[3-9]\d{8}$/.test(cleanPhone)) {
      newErrors.phone = "Enter a valid Bangladesh phone number (e.g. 017XXXXXXXX)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery street address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please select or enter your city/district";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const customer: CustomerInfo = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        address: formData.address.trim(),
        city: formData.city.trim(),
        zone: zone,
        postalCode: formData.postalCode.trim() || undefined,
        deliveryNote: formData.deliveryNote.trim() || undefined,
      };

      const order = await createOrder(customer, items);
      clearCart();
      router.push(`/order-success/${order.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create order. Please try again.";
      setErrors({ form: message });
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] pb-24 pt-12">
        <div className="max-w-md mx-auto text-center py-16 px-6 glass-card rounded-3xl border border-[#222222] space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#161616] border border-[#2d2d2d] flex items-center justify-center mx-auto text-[#666666]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#f8f8f6]">
            Your shopping bag is empty.
          </h2>
          <p className="text-xs text-[#888888]">
            Add pieces to your bag before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a227] text-black font-bold text-xs uppercase tracking-widest rounded-xl"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Top Banner */}
      <div className="bg-[#0e0e0e] border-b border-[#1c1c1c] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Shopping Bag", href: "/cart" },
              { label: "Guest Checkout" },
            ]}
          />
          <div className="mt-2 flex items-center justify-between">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#f8f8f6]">
              Express Guest Checkout
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[#4ade80]">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL Secured & Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Customer & Delivery Details Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Delivery Zone Selector */}
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5c76b] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c9a227]" />
                  <span>1. Select Delivery Zone</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => handleZoneChange("inside_dhaka")}
                    className={`cursor-pointer p-4 rounded-xl border flex flex-col justify-between transition-all ${zone === "inside_dhaka"
                        ? "bg-[#1f1f1f] border-[#c9a227] ring-1 ring-[#c9a227]"
                        : "bg-[#141414] border-[#292929] hover:border-[#444444]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f8f8f6]">
                        Inside Dhaka City
                      </span>
                      <span className="text-xs font-semibold text-[#e5c76b]">
                        {isFreeDelivery ? "FREE" : "৳80"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#888888] mt-1">
                      Estimated 24 – 48 Hours Express
                    </p>
                  </label>

                  <label
                    onClick={() => handleZoneChange("outside_dhaka")}
                    className={`cursor-pointer p-4 rounded-xl border flex flex-col justify-between transition-all ${zone === "outside_dhaka"
                        ? "bg-[#1f1f1f] border-[#c9a227] ring-1 ring-[#c9a227]"
                        : "bg-[#141414] border-[#292929] hover:border-[#444444]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f8f8f6]">
                        Outside Dhaka (All BD)
                      </span>
                      <span className="text-xs font-semibold text-[#e5c76b]">
                        {isFreeDelivery ? "FREE" : "৳150"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#888888] mt-1">
                      Estimated 3 – 5 Business Days
                    </p>
                  </label>
                </div>
              </div>

              {/* Customer Contact & Address */}
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5c76b] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#c9a227]" />
                  <span>2. Delivery Address & Contact</span>
                </h3>

                <div className="space-y-4 text-xs">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Full Name <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sultan Mahmud"
                      className={`w-full bg-[#141414] border rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] ${errors.fullName ? "border-[#ef4444]" : "border-[#2b2b2b]"
                        }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#ef4444] mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#cccccc] font-medium mb-1.5">
                        Mobile Phone Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01700-000000"
                        className={`w-full bg-[#141414] border rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] ${errors.phone ? "border-[#ef4444]" : "border-[#2b2b2b]"
                          }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-[#ef4444] mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#cccccc] font-medium mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227]"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Detailed Street Address <span className="text-[#ef4444]">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House number, Road name/number, Area / Sector"
                      className={`w-full bg-[#141414] border rounded-lg px-3.5 py-2.5 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] ${errors.address ? "border-[#ef4444]" : "border-[#2b2b2b]"
                        }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#ef4444] mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City / District & Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#cccccc] font-medium mb-1.5">
                        City / District <span className="text-[#ef4444]">*</span>
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] focus:outline-none focus:border-[#c9a227]"
                      >
                        {BD_DISTRICTS.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#cccccc] font-medium mb-1.5">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 1213"
                        className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-3 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227]"
                      />
                    </div>
                  </div>

                  {/* Delivery Note */}
                  <div>
                    <label className="block text-[#cccccc] font-medium mb-1.5">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      name="deliveryNote"
                      value={formData.deliveryNote}
                      onChange={handleInputChange}
                      placeholder="e.g. Please call before delivery, leave with security"
                      className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3.5 py-2.5 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5c76b] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c9a227]" />
                  <span>3. Payment Method</span>
                </h3>

                <div className="p-4 rounded-xl border border-[#c9a227] bg-[#1a1a1a] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#f8f8f6]">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-[11px] text-[#a0a0a0] leading-relaxed">
                      Pay securely with cash when your parcel is delivered to your
                      doorstep. You may inspect the outer package before paying.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Confirmation CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-5 sticky top-24">
                <h3 className="font-serif text-lg font-bold text-[#f8f8f6] pb-3 border-b border-[#202020]">
                  Your Order Items ({summary.itemCount})
                </h3>

                {/* Items preview list */}
                <div className="max-h-64 overflow-y-auto divide-y divide-[#202020] pr-1 space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex gap-3">
                      <div className="relative w-14 h-16 rounded bg-[#161616] overflow-hidden flex-shrink-0 border border-[#292929]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#f8f8f6] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#888888]">
                          Size: {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="text-xs font-bold text-[#e5c76b] mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-[#202020] text-xs">
                  <div className="flex justify-between text-[#888888]">
                    <span>Subtotal</span>
                    <span className="text-[#f8f8f6] font-medium">
                      {formatPrice(summary.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#888888]">
                    <span>Delivery Fee ({zone === "inside_dhaka" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                    <span>
                      {currentDeliveryFee === 0 ? (
                        <span className="text-[#e5c76b] font-bold">FREE</span>
                      ) : (
                        formatPrice(currentDeliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#202020] flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#f8f8f6]">
                      Grand Total (Payable upon delivery)
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#e5c76b]">
                      {formatPrice(currentTotal)}
                    </span>
                  </div>
                </div>

                {errors.form && (
                  <div className="p-3 bg-[#ef4444]/15 border border-[#ef4444]/30 rounded-lg flex items-center gap-2 text-[#ef4444] text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#c9a227]/15 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Placing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm Order (Cash on Delivery)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Order Confirmation Notice */}
                <div className="p-3 bg-[#c9a227]/10 border border-[#c9a227]/25 rounded-xl flex items-start gap-2.5 text-[11px] text-[#e5c76b] text-left leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f8f8f6]">Phone Confirmation & Color Choice</p>
                    <p className="text-[#a0a0a0] text-[10px] mt-0.5 leading-relaxed">
                      After submitting your order from our website, our representative will call you for final order confirmation — then tell us which color you would like to get.
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-center text-[#666666] space-y-1">
                  <p>✓ No advance payment or card required.</p>
                  <p>✓ 7-Day size exchange guaranteed.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

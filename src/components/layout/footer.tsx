"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";
import { ShieldCheck, Truck, RotateCcw, Sparkles, Send, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] text-[#a0a0a0] pt-16 pb-12 print:hidden">
      {/* Brand Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#1c1c1c]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
            <div className="p-3 bg-[#c9a227]/10 rounded-lg text-[#c9a227]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f8f8f6] tracking-wide">
                Nationwide Delivery
              </h4>
              <p className="text-xs text-[#888888] mt-0.5">
                Free shipping on orders over ৳3,000
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
            <div className="p-3 bg-[#c9a227]/10 rounded-lg text-[#c9a227]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f8f8f6] tracking-wide">
                100% Authentic Quality
              </h4>
              <p className="text-xs text-[#888888] mt-0.5">
                260 GSM heavy cotton & Egyptian poplin
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
            <div className="p-3 bg-[#c9a227]/10 rounded-lg text-[#c9a227]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f8f8f6] tracking-wide">
                Easy 7-Day Returns
              </h4>
              <p className="text-xs text-[#888888] mt-0.5">
                Hassle-free size exchange policy
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
            <div className="p-3 bg-[#c9a227]/10 rounded-lg text-[#c9a227]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f8f8f6] tracking-wide">
                Cash On Delivery
              </h4>
              <p className="text-xs text-[#888888] mt-0.5">
                Pay upon receiving your order anywhere
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full border border-[#c9a227]/40 overflow-hidden bg-black flex-shrink-0">
                <Image
                  src="/images/logo/arvyno-logo.png"
                  alt="ARVYNO"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.25em] text-[#f8f8f6] block">
                  ARVYNO
                </span>
                <span className="text-[10px] tracking-[0.35em] text-[#c9a227] font-medium uppercase block">
                  WEAR YOUR IDENTITY
                </span>
              </div>
            </div>

            <p className="text-sm text-[#888888] leading-relaxed max-w-sm">
              {BRAND.description}
            </p>

            <div className="pt-2 text-xs text-[#777777] space-y-2">
              <p className="text-[#cccccc] font-semibold uppercase tracking-wider text-[11px]">Contact Us</p>
              <p className="flex items-start gap-2">
                <span className="text-[#c9a227] flex-shrink-0">📍</span>
                <span>{BRAND.contact.addressShort}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a227] flex-shrink-0">📞</span>
                <a href={`tel:${BRAND.contact.phoneRaw}`} className="hover:text-[#c9a227] transition-colors">
                  {BRAND.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a227] flex-shrink-0">💬</span>
                <a
                  href={BRAND.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <span>{BRAND.contact.whatsappDisplay}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#25D366]/15 text-[#25D366] font-semibold">WhatsApp</span>
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c9a227] flex-shrink-0">✉️</span>
                <a href={`mailto:${BRAND.contact.email}`} className="hover:text-[#c9a227] transition-colors">
                  {BRAND.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-[#f8f8f6] uppercase tracking-[0.2em] pb-2 border-b border-[#222222]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c9a227] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links / Customer Care */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#f8f8f6] uppercase tracking-[0.2em] pb-2 border-b border-[#222222]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c9a227] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup & Follow ARVYNO */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#f8f8f6] uppercase tracking-[0.2em] pb-2 border-b border-[#222222]">
              Private Club Newsletter
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed">
              Subscribe to receive private preview access for limited edition drops
              and seasonal collections.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#c9a227]/15 border border-[#c9a227]/30 rounded-lg flex items-center space-x-2 text-[#e5c76b] text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#c9a227]" />
                <span>You are now subscribed to the ARVYNO Private Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 text-xs text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#c9a227] hover:bg-[#e5c76b] text-black rounded transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#666666]">
                  By subscribing, you agree to our Privacy Policy. Zero spam, ever.
                </p>
              </form>
            )}

            {/* Social Links - Follow ARVYNO */}
            <div className="pt-2">
              <p className="text-[11px] text-[#777777] uppercase tracking-wider mb-2 font-semibold">
                Follow ARVYNO
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs">
                <a
                  href={BRAND.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#c9a227] transition-colors"
                >
                  Facebook
                </a>
                <span className="text-[#333333]">•</span>
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#c9a227] transition-colors"
                >
                  Instagram
                </a>
                <span className="text-[#333333]">•</span>
                <a
                  href={BRAND.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#c9a227] transition-colors"
                >
                  TikTok
                </a>
                <span className="text-[#333333]">•</span>
                <a
                  href={BRAND.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#c9a227] transition-colors"
                >
                  YouTube
                </a>
                <span className="text-[#333333]">•</span>
                <a
                  href={BRAND.social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#c9a227] transition-colors"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
        <p>© 2026 ARVYNO. All Rights Reserved.</p>
        <p className="tracking-widest uppercase text-[10px] text-[#888888]">
          WEAR YOUR IDENTITY — BANGLADESH & WORLDWIDE
        </p>
      </div>
    </footer>
  );
}

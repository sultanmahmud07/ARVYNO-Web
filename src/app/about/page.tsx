import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About The Atelier — Brand Philosophy & Craft",
  description:
    "Discover the story of ARVYNO. Dedicated to heavyweight organic cotton, tailored Egyptian poplin, and modern luxury menswear in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Hero */}
      <div className="relative bg-[#0e0e0e] border-b border-[#1c1c1c] py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/banners/hero-banner.png"
            alt="ARVYNO Atelier"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Breadcrumb items={[{ label: "About The Brand" }]} />
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c9a227]/15 border border-[#c9a227]/30 text-xs font-semibold text-[#e5c76b] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
            <span>The ARVYNO Manifesto</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8f8f6]">
            WEAR YOUR IDENTITY.
          </h1>
          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed font-light">
            We exist to reject disposable fast fashion. Every ARVYNO garment is an
            architectural study in fabric density, structural drape, and quiet
            luxury.
          </p>
        </div>
      </div>

      {/* Philosophy Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c9a227]">
              The Genesis
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6]">
              A New Era of Menswear in Bangladesh
            </h2>
            <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
              Founded with the vision to elevate menswear into an art of personal
              expression, ARVYNO bridges the gap between high-end international
              luxury standards and local sartorial craftsmanship.
            </p>
            <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
              We spent over twelve months perfecting our 260 GSM organic compact
              cotton jersey. The result is a t-shirt that does not cling or
              collapse, but drapes cleanly with architectural presence.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-square rounded-2xl overflow-hidden border border-[#c9a227]/30 shadow-2xl bg-[#141414]">
            <Image
              src="/images/banners/welcome-tee-banner.png"
              alt="ARVYNO Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c9a227]">
              Core Principles
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f8f6]">
              The Three Pillars of ARVYNO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-3">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227] w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                1. Structural Integrity
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed">
                From twin-needle collar ribbing to reinforced plackets, our garments
                are engineered to retain crisp geometry wear after wear.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-3">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227] w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                2. Sourced Excellence
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed">
                We select only long-staple Egyptian cotton poplin, French flax
                linens, and compact combed ring-spun yarns for unmatched breathability.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#242424] space-y-3">
              <div className="p-3 bg-[#c9a227]/10 rounded-xl text-[#c9a227] w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                3. Customer Privilege
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed">
                Complimentary nationwide shipping over ৳3,000, cash on delivery, and
                personalized concierge support for every client.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a227] hover:bg-[#e5c76b] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#c9a227]/15"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

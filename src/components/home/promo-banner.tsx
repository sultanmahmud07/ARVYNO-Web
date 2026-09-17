import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Wind, ShieldCheck, Flame, Crown } from "lucide-react";
import { ScrollReveal } from "@/components/common/scroll-reveal";

interface FeaturePillar {
  icon: React.ElementType;
  label: string;
}

const FEATURE_PILLARS: FeaturePillar[] = [
  { icon: Crown, label: "PREMIUM 220+ GSM" },
  { icon: Wind, label: "100% SOFT COTTON" },
  { icon: ShieldCheck, label: "FACTORY DIRECT QC" },
  { icon: Flame, label: "OVERSIZED DRAPE" },
];

export function PromoBanner() {
  return (
    <section className="py-16 sm:py-20 bg-[#080808] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-[150px] pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <ScrollReveal direction="scale" duration={750}>
          {/* Banner Master Card Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c9a227]/30 shadow-2xl bg-[#0a0a0a] min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between group animate-border-breathing">

            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/banners/secound-banner-design.png"
                alt="ARVYNO Premium Drop Shoulder & Heavyweight Drops"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-right sm:object-[80%_center] lg:object-[85%_center] group-hover:scale-103 transition-transform duration-1000 ease-out"
              />

              {/* Subtle Gradient Overlay - Soft fade to keep text crisp while letting artwork shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-[#0a0a0a]/15 via-45% to-transparent sm:from-[#0a0a0a]/35 sm:via-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Banner Main Content */}
            <div className="relative z-10 max-w-xl sm:max-w-2xl p-6 sm:p-10 lg:p-14 space-y-6 sm:space-y-7 my-auto">

              {/* Gold Outlined Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/15 border border-[#c9a227]/50 text-xs font-semibold text-[#e5c76b] uppercase tracking-[0.25em] shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#c9a227] animate-pulse" />
                <span>Heavyweight Capsule</span>
              </div>

              {/* Headline with Serif & Gold Accent */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f8f8f6] tracking-tight leading-[1.1]">
                STREETWEAR <br />
                ESSENTIALS, <br />
                <span className="gold-text-gradient font-extrabold">ELEVATED.</span>
              </h2>

              {/* Subheadline Description */}
              <p className="text-sm sm:text-base text-[#a8a8a8] leading-relaxed font-light max-w-lg">
                Explore our signature drops: 100% soft cotton 220+ GSM Drop Shoulder tees,
                artisanal Acid Wash silhouettes, and 350+ GSM fleece hoodies.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/categories/drop-shoulder"
                  className="px-8 py-4 bg-gradient-to-r from-[#c9a227] via-[#e5c76b] to-[#c9a227] hover:brightness-110 active:scale-[0.98] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-[#c9a227]/15 flex items-center justify-center gap-2.5 group/btn gold-shimmer-btn"
                >
                  <span>Shop Drop Shoulder</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/categories/hoodies"
                  className="px-7 py-4 bg-black/60 hover:bg-black/90 text-[#f8f8f6] hover:text-[#e5c76b] border border-white/15 hover:border-[#c9a227]/40 text-xs uppercase tracking-[0.2em] font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center"
                >
                  Shop Hoodies
                </Link>
              </div>
            </div>

            {/* Bottom Feature Pillars Bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
                {FEATURE_PILLARS.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={pillar.label}
                      className="flex items-center justify-center gap-2.5 py-4 px-3 sm:px-4 text-center hover:bg-white/5 transition-colors group/pillar cursor-default"
                    >
                      <PillarIcon className="w-4 h-4 text-[#c9a227] group-hover/pillar:scale-115 transition-transform" />
                      <span className="text-[11px] font-semibold tracking-wider text-[#d0d0d0] uppercase">
                        {pillar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export function BrandStatement() {
  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Media Box */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-[#c9a227]/30 shadow-2xl bg-[#141414] group">
              <Image
                src="/images/banners/welcome-tee-banner.jpg"
                alt="ARVYNO Philosophy — A New Identity in Fashion"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl border border-white/10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a227] font-semibold">
                  The ARVYNO Promise
                </p>
                <p className="font-serif text-sm sm:text-base font-bold text-[#f8f8f6] mt-0.5">
                  &ldquo;Designed for those who choose to stand apart.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Brand Manifesto */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#c9a227]">
                Brand Manifesto
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f8f8f6] leading-[1.15]">
                MORE THAN CLOTHING. <br />
                <span className="gold-text-gradient">IT&apos;S YOUR IDENTITY.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed font-light">
              At ARVYNO, we believe what you wear should speak before you do.
              Born from a dedication to precision tailoring and heavy organic
              cottons, every piece is engineered to deliver architectural drape,
              unrivaled comfort, and timeless luxury.
            </p>

            {/* Quality Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 text-left">
                <div className="p-1.5 rounded-full bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f8f8f6]">
                    Heavyweight Structural Knit
                  </h4>
                  <p className="text-xs text-[#888888] mt-0.5">
                    260 GSM organic combed compact ring-spun cotton that holds its
                    shape through hundreds of wears.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-left">
                <div className="p-1.5 rounded-full bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f8f8f6]">
                    Egyptian & French Flax Weaves
                  </h4>
                  <p className="text-xs text-[#888888] mt-0.5">
                    Finely tailored shirts with mother-of-pearl buttons and crisp
                    spread collars.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-left">
                <div className="p-1.5 rounded-full bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f8f8f6]">
                    Uncompromising Gold Detailing
                  </h4>
                  <p className="text-xs text-[#888888] mt-0.5">
                    Precision micro-embroidery with metallic anti-tarnish threads
                    and bespoke packaging.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/about"
                className="px-8 py-3.5 bg-[#161616] hover:bg-[#202020] text-[#f8f8f6] hover:text-[#c9a227] border border-[#2d2d2d] hover:border-[#c9a227]/40 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 group"
              >
                <span>Read The Brand Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

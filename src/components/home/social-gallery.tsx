import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { ScrollReveal } from "@/components/common/scroll-reveal";

const LOOKBOOK_ITEMS = [
  {
    image: "/images/products/black-signature-tee.jpg",
    handle: "@arvyno_bd",
    caption: "The Obsidian Heavy Tee in urban Dhaka.",
    href: "/products",
  },
  {
    image: "/images/products/blue-striped-shirt.jpg",
    handle: "@arvyno.atelier",
    caption: "Egyptian Poplin Striped Shirt with tailored trousers.",
    href: "/products",
  },
  {
    image: "/images/banners/drop-sholder.jpg",
    handle: "@arvyno",
    caption: "Wear Your Identity. The Autumn Winter Collection.",
    href: "/products",
  },
  {
    image: "/images/products/olive-linen-shirt.jpg",
    handle: "@arvyno.daily",
    caption: "Pure French Flax Linen for tropical evenings.",
    href: "/products",
  },
  {
    image: "/images/products/white-signature-tee.jpg",
    handle: "@arvyno.identity",
    caption: "Architectural off-white drape with gold monogram.",
    href: "/products",
  },
];

export function SocialGallery() {
  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#c9a227]/4 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#c9a227] text-xs font-semibold uppercase tracking-[0.3em] mb-1">
                <Camera className="w-4 h-4 animate-pulse" />
                <span>Editorial Lookbook</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6]">
                Styled By The Community
              </h2>
            </div>
            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] transition-colors group"
            >
              <span>Follow {BRAND.social.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {LOOKBOOK_ITEMS.map((item, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 100}
              duration={600}
            >
              <Link
                href={item.href}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#141414] border border-[#222222] hover:border-[#c9a227]/60 transition-all duration-500 shadow-md hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] hover:-translate-y-1 block"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-xs backdrop-blur-[2px]">
                  <span className="text-[10px] text-[#c9a227] font-semibold tracking-wider">
                    {item.handle}
                  </span>
                  <p className="text-white text-[11px] line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#e5c76b] font-medium uppercase tracking-wider">
                    <span>Shop Piece</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  subtitle,
  title,
  description,
  viewAllHref,
  viewAllLabel = "Explore Collection",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 ${align === "center" ? "text-center md:text-center items-center" : ""
        }`}
    >
      <div className="space-y-1.5 max-w-2xl">
        {subtitle && (
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a227]">
            {subtitle}
          </p>
        )}
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#f8f8f6]">
          {title}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-[#888888] leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#e5c76b] hover:text-[#ffffff] group transition-colors flex-shrink-0"
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

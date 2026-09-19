"use client";

import React, { useState } from "react";
import { ANNOUNCEMENT_MESSAGE } from "@/lib/constants";
import { Sparkles, X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#0d0d0d] border-b border-[#222222] text-[11px] md:text-xs font-medium tracking-widest text-[#e5c76b] py-2 px-4 uppercase text-center overflow-hidden z-50 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#c9a227] animate-pulse flex-shrink-0" />
        <span className="truncate">{ANNOUNCEMENT_MESSAGE}</span>
        <Sparkles className="w-3.5 h-3.5 text-[#c9a227] animate-pulse flex-shrink-0 hidden sm:inline-block" />
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#f8f8f6] transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

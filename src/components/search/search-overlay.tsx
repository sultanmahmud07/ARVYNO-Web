"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";

const POPULAR_TAGS = [
  "Heavyweight",
  "Striped",
  "Oversized",
  "Linen",
  "Oxford",
  "Monogram",
  "Sand",
];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          const event = new CustomEvent("open-search");
          window.dispatchEvent(event);
        }
      } else if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Focus input when opened and lock scroll
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen]);

  // Derived search results via useMemo
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      setQuery("");
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen px-4 pt-12 pb-20 flex flex-col items-center">
        <div className="relative w-full max-w-2xl glass-modal rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#2a2a2a] animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close search"
            className="absolute right-4 top-4 p-2 text-[#777777] hover:text-[#f8f8f6] rounded-full hover:bg-[#202020] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heavyweight tees, striped shirts, linen..."
              className="w-full bg-[#161616] border border-[#2d2d2d] rounded-xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-[#f8f8f6] placeholder-[#666666] focus:outline-none focus:border-[#c9a227] transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#777777] hover:text-[#f8f8f6]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <span className="text-[11px] text-[#777777] uppercase tracking-wider flex items-center gap-1 mr-1">
              <TrendingUp className="w-3 h-3 text-[#c9a227]" /> Popular:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 text-xs text-[#b0b0b0] hover:text-[#e5c76b] bg-[#1a1a1a] hover:bg-[#242424] border border-[#2a2a2a] rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          {query.trim() && (
            <div className="mt-6 border-t border-[#222222] pt-4">
              <p className="text-xs uppercase tracking-widest text-[#777777] mb-3">
                {results.length > 0
                  ? `Search Results (${results.length})`
                  : "No products found"}
              </p>

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-4 p-2.5 rounded-lg bg-[#121212] hover:bg-[#1c1c1c] border border-transparent hover:border-[#2e2e2e] transition-all group"
                    >
                      <div className="relative w-12 h-14 rounded bg-[#181818] overflow-hidden flex-shrink-0 border border-[#242424]">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#f8f8f6] group-hover:text-[#c9a227] transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-[#888888] truncate">
                          {product.category} • {product.shortDescription}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-[#e5c76b]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full mt-3 py-2.5 text-xs text-[#c9a227] hover:text-[#e5c76b] font-semibold flex items-center justify-center gap-1.5 hover:underline"
                  >
                    <span>View all results for &ldquo;{query}&rdquo;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm text-[#888888]">
                    No matching pieces found for &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-xs text-[#666666]">
                    Try searching for &ldquo;t-shirt&rdquo;, &ldquo;striped&rdquo;, or &ldquo;black&rdquo;.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

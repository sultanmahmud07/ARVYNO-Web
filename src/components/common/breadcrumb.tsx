import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/common/json-ld";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLdItems = [
    { name: "Home", url: "/" },
    ...items.map((item) => ({
      name: item.label,
      url: item.href || "",
    })),
  ].filter((i) => i.url);

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#888888]">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-[#888888] hover:text-[#c9a227] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#555555] flex-shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#c9a227] transition-colors line-clamp-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#f8f8f6] font-medium line-clamp-1" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

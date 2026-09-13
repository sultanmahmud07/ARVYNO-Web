import React from "react";
import { Product } from "@/types/product";
import { BRAND } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: BRAND.name,
    alternateName: ["ARVYNO", "ARVYNO BD", "ARVYNO Fashion"],
    description: BRAND.description,
    url: BRAND.siteUrl,
    logo: `${BRAND.siteUrl}${BRAND.logo}`,
    image: `${BRAND.siteUrl}/images/banners/hero-banner.png`,
    telephone: BRAND.contact.phone,
    email: BRAND.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.contact.address,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [
      BRAND.social.facebook,
      BRAND.social.instagram,
      BRAND.social.tiktok,
    ],
    priceRange: "৳৳",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    alternateName: ["ARVYNO", "ARVYNO BD", "ARVYNO Fashion"],
    url: BRAND.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BRAND.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : `${BRAND.siteUrl}${img}`
    ),
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    offers: {
      "@type": "Offer",
      url: `${BRAND.siteUrl}/products/${product.slug}`,
      priceCurrency: "BDT",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: BRAND.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewCount || 10,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${BRAND.siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


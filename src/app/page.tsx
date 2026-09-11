import { getTrendingProducts, getNewArrivals, getBestSellers } from "@/lib/services/product-service";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { BrandStatement } from "@/components/home/brand-statement";
import { PromoBanner } from "@/components/home/promo-banner";
import { SocialGallery } from "@/components/home/social-gallery";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductSliderSection } from "@/components/home/product-slider-section";
import { CuratedTabSlider } from "@/components/home/curated-tab-slider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/common/json-ld";

export default async function HomePage() {
  const [trendingProducts, newArrivals, bestSellers] = await Promise.all([
    getTrendingProducts(8),
    getNewArrivals(8),
    getBestSellers(8),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* 1. Dynamic Sliding Luxury Banner */}
      <HeroSection />

      {/* 2. Interactive Curated Tabbed Slider (Trending | New Arrivals | Best Sellers) */}
      <CuratedTabSlider
        trendingProducts={trendingProducts}
        newArrivals={newArrivals}
        bestSellers={bestSellers}
      />

      {/* 3. Featured Category Glass Cards */}
      <FeaturedCategories />

      {/* 4. Dedicated Trending Now Product Slider (Slider for md+, 2-col grid on mobile) */}
      <ProductSliderSection
        subtitle="Curated Essentials"
        title="Trending Now"
        description="The most in-demand pieces defining contemporary luxury menswear this season."
        viewAllHref="/products?sort=trending"
        viewAllLabel="Explore All Trending"
        products={trendingProducts}
        sectionBg="bg-[#080808]"
      />

      {/* 5. Brand Statement / Manifesto */}
      <BrandStatement />

      {/* 6. Dedicated New Arrivals Product Slider (Slider for md+, 2-col grid on mobile) */}
      <ProductSliderSection
        subtitle="Latest Drop"
        title="New Arrivals"
        description="Fresh silhouettes, seasonal striped palettes, and heavyweight organic cotton releases."
        viewAllHref="/categories/new-arrivals"
        viewAllLabel="View All New Drops"
        products={newArrivals}
        sectionBg="bg-[#0a0a0a]"
        hasBorder={true}
      />

      {/* 7. Promotional Striped Shirt Banner */}
      <PromoBanner />

      {/* 8. Dedicated Signature Best Sellers Product Slider (Slider for md+, 2-col grid on mobile) */}
      <ProductSliderSection
        subtitle="Customer Favorites"
        title="Signature Best Sellers"
        description="Time-tested garments celebrated for unrivaled structural drape and long-lasting quality."
        viewAllHref="/categories/best-sellers"
        viewAllLabel="View All Best Sellers"
        products={bestSellers}
        sectionBg="bg-[#080808]"
      />

      {/* 9. Instagram / Lookbook Social Grid */}
      <SocialGallery />

      {/* 10. Private Members Newsletter */}
      <NewsletterSection />
    </>
  );
}

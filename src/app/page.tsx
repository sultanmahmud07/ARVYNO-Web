import { getTrendingProducts, getNewArrivals, getBestSellers } from "@/lib/services/product-service";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { BrandStatement } from "@/components/home/brand-statement";
import { PromoBanner } from "@/components/home/promo-banner";
import { SocialGallery } from "@/components/home/social-gallery";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductSliderSection } from "@/components/home/product-slider-section";
import { CuratedTabSlider } from "@/components/home/curated-tab-slider";
import { ScrollReveal } from "@/components/common/scroll-reveal";
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

      {/* 1. Dynamic Sliding Luxury Banner (Continuous Auto-Play) */}
      <HeroSection />

      {/* 2. Interactive Curated Tabbed Slider (Continuous Auto-Play on md+) */}
      <ScrollReveal direction="up" duration={700}>
        <CuratedTabSlider
          trendingProducts={trendingProducts}
          newArrivals={newArrivals}
          bestSellers={bestSellers}
        />
      </ScrollReveal>

      {/* 3. Featured Category Glass Cards with Scroll Animation */}
      <FeaturedCategories />

      {/* 4. Dedicated Trending Now Product Slider (Continuous Auto-Play on md+) */}
      <ScrollReveal direction="up" duration={700}>
        <ProductSliderSection
          subtitle="Curated Essentials"
          title="Trending Now"
          description="The most in-demand pieces defining contemporary luxury menswear this season."
          viewAllHref="/products?sort=trending"
          viewAllLabel="Explore All Trending"
          products={trendingProducts}
          sectionBg="bg-[#080808]"
          autoPlayInterval={4400}
        />
      </ScrollReveal>

      {/* 5. Brand Statement / Manifesto */}
      <BrandStatement />

      {/* 6. Dedicated New Arrivals Product Slider (Continuous Auto-Play on md+) */}
      <ScrollReveal direction="up" duration={700}>
        <ProductSliderSection
          subtitle="Latest Drop"
          title="New Arrivals"
          description="Fresh silhouettes, seasonal striped palettes, and heavyweight organic cotton releases."
          viewAllHref="/categories/new-arrivals"
          viewAllLabel="View All New Drops"
          products={newArrivals}
          sectionBg="bg-[#0a0a0a]"
          hasBorder={true}
          autoPlayInterval={4900}
        />
      </ScrollReveal>

      {/* 7. Promotional Striped Shirt Banner */}
      <PromoBanner />

      {/* 8. Dedicated Signature Best Sellers Product Slider (Continuous Auto-Play on md+) */}
      <ScrollReveal direction="up" duration={700}>
        <ProductSliderSection
          subtitle="Customer Favorites"
          title="Signature Best Sellers"
          description="Time-tested garments celebrated for unrivaled structural drape and long-lasting quality."
          viewAllHref="/categories/best-sellers"
          viewAllLabel="View All Best Sellers"
          products={bestSellers}
          sectionBg="bg-[#080808]"
          autoPlayInterval={5400}
        />
      </ScrollReveal>

      {/* 9. Instagram / Lookbook Social Grid */}
      <SocialGallery />

      {/* 10. Private Members Newsletter */}
      <NewsletterSection />
    </>
  );
}

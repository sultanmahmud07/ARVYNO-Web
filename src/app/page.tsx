import { getTrendingProducts, getNewArrivals, getBestSellers } from "@/lib/services/product-service";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { BrandStatement } from "@/components/home/brand-statement";
import { PromoBanner } from "@/components/home/promo-banner";
import { SocialGallery } from "@/components/home/social-gallery";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/common/json-ld";

export default async function HomePage() {
  const [trendingProducts, newArrivals, bestSellers] = await Promise.all([
    getTrendingProducts(4),
    getNewArrivals(4),
    getBestSellers(4),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Category Glass Cards */}
      <FeaturedCategories />

      {/* Trending Now Section */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Curated Essentials"
            title="Trending Now"
            description="The most in-demand pieces defining contemporary luxury menswear this season."
            viewAllHref="/products?sort=trending"
            viewAllLabel="Explore All Trending"
          />
          <ProductGrid products={trendingProducts} />
        </div>
      </section>

      {/* Brand Statement / Manifesto */}
      <BrandStatement />

      {/* New Arrivals Section */}
      <section className="py-20 bg-[#0a0a0a] border-y border-[#181818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Latest Drop"
            title="New Arrivals"
            description="Fresh silhouettes, seasonal striped palettes, and heavyweight organic cotton releases."
            viewAllHref="/categories/new-arrivals"
            viewAllLabel="View All New Drops"
          />
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Promotional Striped Shirt Banner */}
      <PromoBanner />

      {/* Best Sellers Section */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Customer Favorites"
            title="Signature Best Sellers"
            description="Time-tested garments celebrated for unrivaled structural drape and long-lasting quality."
            viewAllHref="/categories/best-sellers"
            viewAllLabel="View All Best Sellers"
          />
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Instagram / Lookbook Social Grid */}
      <SocialGallery />

      {/* Private Members Newsletter */}
      <NewsletterSection />
    </>
  );
}

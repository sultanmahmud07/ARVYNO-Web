import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/lib/services/product-service";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ProductJsonLd } from "@/components/common/json-ld";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ARVYNO Luxury Atelier`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ARVYNO`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ARVYNO`,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.categorySlug,
    4
  );

  return (
    <div className="min-h-screen bg-[#080808] pb-24">
      {/* Product JSON-LD Schema */}
      <ProductJsonLd product={product} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: "Shop", href: "/products" },
            {
              label: product.category,
              href: `/categories/${product.categorySlug}`,
            },
            { label: product.name },
          ]}
        />

        {/* Product Details Section */}
        <div className="mt-6">
          <ProductDetailView product={product} />
        </div>

        {/* Related Products / You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#1c1c1c]">
            <SectionHeading
              subtitle="Curated Recommendations"
              title="You May Also Like"
              description="Complementary silhouettes designed to pair effortlessly with this piece."
              viewAllHref={`/categories/${product.categorySlug}`}
              viewAllLabel={`Explore All ${product.category}`}
            />
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

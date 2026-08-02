import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { FeaturesSection } from "@/components/home/features-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { PromoSection } from "@/components/home/promo-section"
import { CartProvider } from "@/lib/cart-context"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <CategoriesSection />
          <PromoSection />
          <FeaturedProducts />
          <FeaturesSection />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

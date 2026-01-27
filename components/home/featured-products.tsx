import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/products"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Best Sellers
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Our most popular products, loved by athletes around the world.
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0 text-primary hover:text-primary/80 self-start md:self-auto">
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

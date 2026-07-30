import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/products"
import { ArrowRight, Flame } from "lucide-react"

export function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section className="py-16 md:py-24 bg-[#050A14]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-orange-400 fill-orange-400" />
              <p className="text-orange-400 text-sm font-bold uppercase tracking-widest">Hot Right Now</p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Best Sellers
            </h2>
            <p className="mt-2 text-white/40 max-w-xl text-sm">
              Most-loved by Cambodian athletes. Fast delivery nationwide.
            </p>
          </div>
          <Button asChild variant="ghost" id="bestsellers-view-all" className="mt-4 md:mt-0 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 self-start md:self-auto rounded-xl group border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <Link href="/shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "Orders $30+" },
            { icon: "🔒", title: "Secure Payment", desc: "ABA, Wing, QR" },
            { icon: "↩️", title: "Easy Returns", desc: "7-day policy" },
            { icon: "💬", title: "Telegram Support", desc: "24/7 chat" },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm font-bold text-white">{item.title}</div>
                <div className="text-xs text-white/40">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

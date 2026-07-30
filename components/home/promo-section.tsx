"use client"

import Link from "next/link"
import { ArrowRight, Zap, TrendingUp } from "lucide-react"

const deals = [
  { tag: "NEW", label: "Jordan Court Shoes", price: "$89", original: "$129", off: "31%", emoji: "👟" },
  { tag: "HOT", label: "Training Gloves Set", price: "$19", original: "$35", off: "46%", emoji: "🥊" },
  { tag: "SALE", label: "Running Pro Kit", price: "$45", original: "$75", off: "40%", emoji: "🏃" },
]

export function PromoSection() {
  return (
    <section className="py-12 md:py-16 bg-[#080D18] relative overflow-hidden">
      {/* Orange glow */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Flash sale card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600/20 via-orange-500/10 to-transparent border border-orange-500/25 p-6 md:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-orange-400 fill-orange-400" />
                <span className="text-orange-400 text-sm font-black uppercase tracking-widest">Flash Sale</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Up to 70% Off
              </h3>
              <p className="text-white/50 text-sm mb-6">Today only. Shop before it ends!</p>

              <div className="space-y-3 mb-6">
                {deals.map(deal => (
                  <div key={deal.label} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{deal.emoji}</span>
                      <div>
                        <span className="text-xs font-bold text-orange-400 uppercase">{deal.tag}</span>
                        <div className="text-sm text-white font-medium">{deal.label}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{deal.price}</div>
                      <div className="text-white/30 text-xs line-through">{deal.original}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                id="promo-flash-sale"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 group"
              >
                Shop All Deals
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Trending section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent border border-blue-500/25 p-6 md:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 text-sm font-black uppercase tracking-widest">Trending Now 🇰🇭</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Popular in Cambodia
              </h3>
              <p className="text-white/50 text-sm mb-6">Most searched this week by Cambodian athletes</p>

              <div className="space-y-3 mb-6">
                {[
                  { rank: 1, name: "Nike Running Shoes", searches: "12.4K", change: "+18%" },
                  { rank: 2, name: "Football Cleats", searches: "9.8K", change: "+12%" },
                  { rank: 3, name: "Gym Resistance Bands", searches: "7.2K", change: "+34%" },
                  { rank: 4, name: "Basketball Jersey", searches: "5.9K", change: "+8%" },
                ].map(item => (
                  <div key={item.rank} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <span className="text-white/30 text-xs font-bold w-4">#{item.rank}</span>
                    <span className="flex-1 text-sm text-white font-medium">{item.name}</span>
                    <span className="text-xs text-green-400 font-bold">{item.change}</span>
                    <span className="text-xs text-white/30">{item.searches}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                id="promo-trending"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                Shop Trending
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

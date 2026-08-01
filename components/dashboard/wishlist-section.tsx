"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, X } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"
import { Button } from "@/components/ui/button"

export function WishlistSection() {
  const { items, removeItem } = useWishlist()

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
      <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Wishlist
        {items.length > 0 && (
          <span className="ml-2 text-sm font-normal text-white/40">({items.length})</span>
        )}
      </h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Heart className="h-12 w-12 text-white/20 mb-3" />
          <p className="text-sm text-white/45 mb-4">Your wishlist is empty.</p>
          <Link href="/shop">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 p-3 hover:border-orange-500/20 transition-colors"
            >
              <Link
                href={`/product/${product.id}`}
                className="relative h-16 w-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.id}`}>
                  <p className="text-sm font-semibold text-white hover:text-orange-400 transition-colors line-clamp-1">
                    {product.name}
                  </p>
                </Link>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-white/45">{product.rating}</span>
                </div>
                <p className="text-sm font-bold text-orange-400 mt-1">${product.price.toFixed(2)}</p>
              </div>

              <button
                onClick={() => removeItem(product.id)}
                aria-label="Remove from wishlist"
                className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

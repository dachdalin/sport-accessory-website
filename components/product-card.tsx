"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/4 border border-white/8 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5">
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-white/5">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-108"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Zap className="h-2.5 w-2.5 fill-white" />
            Low Stock
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
          >
            Quick Add
          </button>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-3 md:p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-white text-sm hover:text-orange-400 transition-colors line-clamp-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-white/40">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
          <span className="text-base font-black text-white">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            id={`add-to-cart-${product.id}`}
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg h-8 text-xs px-3 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

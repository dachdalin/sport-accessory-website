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

// ─── Shared discount helpers ────────────────────────────────────────────────────
export function getDiscountInfo(product: Product): {
  hasDiscount: boolean
  badgeLabel: string
  savings: number
  pctOff: number
} {
  if (!product.originalPrice || product.originalPrice <= product.price) {
    return { hasDiscount: false, badgeLabel: "", savings: 0, pctOff: 0 }
  }
  const savings = product.originalPrice - product.price
  const pctOff = Math.round((savings / product.originalPrice) * 100)

  const badgeLabel =
    product.discountType === "amount"
      ? `-$${savings % 1 === 0 ? savings.toFixed(0) : savings.toFixed(2)}`
      : `-${pctOff}%`

  return { hasDiscount: true, badgeLabel, savings, pctOff }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { hasDiscount, badgeLabel } = getDiscountInfo(product)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-muted/50 border border-border hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5">

      {/* ── Image area ────────────────────────────────────────────────────────── */}
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-muted/50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />

        {/* Top-left: discount badge OR low-stock badge */}
        {hasDiscount ? (
          <span className="absolute top-2 left-2 z-10 bg-gradient-to-br from-red-500 to-rose-600 text-white text-[11px] font-black px-2 py-1 rounded-lg shadow-lg shadow-red-500/30 leading-none tracking-wide">
            {badgeLabel}
          </span>
        ) : product.stock < 10 && product.stock > 0 ? (
          <span className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Zap className="h-2.5 w-2.5 fill-white" />
            Low Stock
          </span>
        ) : null}

        {/* Low-stock badge alongside discount */}
        {hasDiscount && product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 z-10 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <Zap className="h-2 w-2 fill-white" />
            Low
          </span>
        )}

        {/* Quick Add overlay */}
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

      {/* ── Info area ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-3 md:p-4">
        <Link href={`/product/${product.id}`}>
          <h3
            className="font-bold text-foreground text-sm hover:text-orange-600 dark:hover:text-orange-400 transition-colors line-clamp-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-muted-foreground/40">{product.rating}</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                {/* Sale price */}
                <span className="text-base font-black text-red-600 dark:text-red-400 leading-tight">
                  ${product.price.toFixed(2)}
                </span>
                {/* Original price, struck through */}
                <span className="text-xs text-muted-foreground/35 line-through leading-tight mt-0.5">
                  ${product.originalPrice!.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-base font-black text-foreground">${product.price.toFixed(2)}</span>
            )}
          </div>

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

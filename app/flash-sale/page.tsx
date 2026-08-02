"use client"

import { useEffect, useMemo, useState } from "react"
import { Zap } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { getFlashSaleProducts } from "@/lib/products"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const SALE_DURATION_MS = 6 * 60 * 60 * 1000 // 6 hours from page load
const ITEMS_PER_PAGE = 4

function useCountdown(targetTime: number) {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTime - Date.now()))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, targetTime - Date.now()))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetTime])

  return {
    hours: Math.floor(remaining / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
    expired: remaining <= 0,
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card border border-border shadow-sm">
        <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1.5">{label}</span>
    </div>
  )
}

function paginationRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: (number | "ellipsis")[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("ellipsis")
    result.push(p)
  })
  return result
}

function FlashSaleContent() {
  const [targetTime] = useState(() => Date.now() + SALE_DURATION_MS)
  const { hours, minutes, seconds, expired } = useCountdown(targetTime)
  const saleProducts = useMemo(() => getFlashSaleProducts(), [])
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(saleProducts.length / ITEMS_PER_PAGE))
  const pageProducts = saleProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  function goToPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        {/* Hero / countdown */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600/20 via-orange-500/10 to-transparent border border-orange-500/25 p-6 md:p-10 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400" />
              <span className="text-orange-600 dark:text-orange-400 text-sm font-black uppercase tracking-widest">
                Limited Time
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-black text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ⚡ Flash Sale
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md">
              Up to 40% off top gear. Grab your favorites before the timer runs out!
            </p>

            {expired ? (
              <p className="text-red-600 dark:text-red-400 font-bold text-lg">This flash sale has ended.</p>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4">
                <CountdownUnit value={hours} label="Hours" />
                <span className="text-2xl font-black text-muted-foreground/40 -mt-4">:</span>
                <CountdownUnit value={minutes} label="Minutes" />
                <span className="text-2xl font-black text-muted-foreground/40 -mt-4">:</span>
                <CountdownUnit value={seconds} label="Seconds" />
              </div>
            )}
          </div>
        </section>

        {/* Product grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            {saleProducts.length} Deal{saleProducts.length !== 1 ? "s" : ""} Available
          </h2>
        </div>

        {saleProducts.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center rounded-2xl border border-border bg-card/80">
            <Zap className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No flash sale deals right now — check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        goToPage(page - 1)
                      }}
                      className={page === 1 ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>

                  {paginationRange(page, totalPages).map((p, i) =>
                    p === "ellipsis" ? (
                      <PaginationItem key={`e-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault()
                            goToPage(p)
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        goToPage(page + 1)
                      }}
                      className={page === totalPages ? "pointer-events-none opacity-40" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function FlashSalePage() {
  return (
    <CartProvider>
      <FlashSaleContent />
    </CartProvider>
  )
}

"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard, getDiscountInfo } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { products, categories } from "@/lib/products"
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  Star,
  Package,
  Flame,
  TrendingUp,
  Check,
  RotateCcw,
} from "lucide-react"

const categoryEmojis: Record<string, string> = {
  all: "🛒",
  fitness: "💪",
  football: "⚽",
  basketball: "🏀",
  running: "🏃",
  gym: "🏋️",
  outdoor: "🌿",
}

const sortOptions = [
  { value: "popular", label: "Most Popular", icon: Flame },
  { value: "rating", label: "Highest Rated", icon: Star },
  { value: "price-low", label: "Price: Low → High", icon: TrendingUp },
  { value: "price-high", label: "Price: High → Low", icon: TrendingUp },
  { value: "newest", label: "Newest", icon: Package },
]

// HOT/NEW labels (separate from discount badges handled by ProductCard)
const productLabels: Record<string, { label: string; color: string }> = {
  "5": { label: "HOT", color: "bg-orange-500" },
  "3": { label: "NEW", color: "bg-blue-500" },
  "8": { label: "NEW", color: "bg-blue-500" },
}

function RangeSlider({
  min, max, value, onChange,
}: { min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const getPercent = (v: number) => ((v - min) / (max - min)) * 100

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const v = Math.round((min + pct * (max - min)) / 10) * 10
    const midpoint = (value[0] + value[1]) / 2
    if (v < midpoint) onChange([Math.min(v, value[1] - 10), value[1]])
    else onChange([value[0], Math.max(v, value[0] + 10)])
  }

  return (
    <div className="px-1 pt-2 pb-4">
      <div
        ref={trackRef}
        className="relative h-1.5 bg-muted rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className="absolute h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
          style={{ left: `${getPercent(value[0])}%`, right: `${100 - getPercent(value[1])}%` }}
        />
        {[0, 1].map((i) => (
          <input
            key={i}
            type="range"
            min={min}
            max={max}
            step={10}
            value={value[i]}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (i === 0) onChange([Math.min(v, value[1] - 10), value[1]])
              else onChange([value[0], Math.max(v, value[0] + 10)])
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        ))}
        {[0, 1].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/40 pointer-events-none"
            style={{ left: `calc(${getPercent(value[i])}% - 8px)` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3">
        <span className="text-xs bg-muted border border-border text-muted-foreground px-2.5 py-1 rounded-lg font-mono font-medium">${value[0]}</span>
        <span className="text-xs bg-muted border border-border text-muted-foreground px-2.5 py-1 rounded-lg font-mono font-medium">${value[1]}</span>
      </div>
    </div>
  )
}

function FilterPanel({
  selectedCategory, setSelectedCategory,
  priceRange, setPriceRange,
  minRating, setMinRating,
  inStockOnly, setInStockOnly,
  saleOnly, setSaleOnly,
  onClear,
}: {
  selectedCategory: string; setSelectedCategory: (c: string) => void
  priceRange: [number, number]; setPriceRange: (r: [number, number]) => void
  minRating: number; setMinRating: (r: number) => void
  inStockOnly: boolean; setInStockOnly: (v: boolean) => void
  saleOnly: boolean; setSaleOnly: (v: boolean) => void
  onClear: () => void
}) {
  const allCategories = [{ id: "all", name: "All Products", icon: "Target" }, ...categories]

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Category
        </h3>
        <div className="space-y-1">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                selectedCategory === cat.id
                  ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
              }`}
            >
              <span className="text-base w-5 text-center">{categoryEmojis[cat.id] || "🏅"}</span>
              <span className="flex-1 text-left">{cat.name}</span>
              {selectedCategory === cat.id && <Check className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-muted" />

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Price Range
        </h3>
        <RangeSlider min={0} max={200} value={priceRange} onChange={setPriceRange} />
      </div>

      <div className="h-px bg-muted" />

      {/* Min Rating */}
      <div>
        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Minimum Rating
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          {[0, 4, 4.3, 4.5, 4.7].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                minRating === r
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400"
                  : "border-border text-muted-foreground hover:border-border hover:text-muted-foreground"
              }`}
            >
              {r === 0 ? "All" : (
                <>
                  <Star className="h-3 w-3 fill-current" />
                  {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-muted" />

      {/* Sale Only */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-red-600 dark:text-red-400 text-xs font-black bg-red-500/15 border border-red-500/25 px-1.5 py-0.5 rounded-md">SALE</span>
            On Sale Only
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Show discounted items only</p>
        </div>
        <button
          onClick={() => setSaleOnly(!saleOnly)}
          className={`relative w-11 h-6 rounded-full transition-colors ${saleOnly ? "bg-red-500" : "bg-muted"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${saleOnly ? "translate-x-5" : ""}`} />
        </button>
      </div>

      <div className="h-px bg-muted" />

      {/* In Stock */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>In Stock Only</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Hide out-of-stock items</p>
        </div>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`relative w-11 h-6 rounded-full transition-colors ${inStockOnly ? "bg-orange-500" : "bg-muted"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${inStockOnly ? "translate-x-5" : ""}`} />
        </button>
      </div>

      <div className="h-px bg-muted" />

      {/* Clear */}
      <button
        onClick={onClear}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border text-muted-foreground hover:border-orange-500/30 hover:text-orange-600 dark:hover:text-orange-400 text-sm font-medium transition-all"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Filters
      </button>
    </div>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [saleOnly, setSaleOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (mobileFilterOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileFilterOpen])

  const activeFilterCount = [
    selectedCategory !== "all",
    priceRange[0] > 0 || priceRange[1] < 200,
    minRating > 0,
    inStockOnly,
    saleOnly,
  ].filter(Boolean).length

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (selectedCategory !== "all") filtered = filtered.filter((p) => p.category === selectedCategory)
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (minRating > 0) filtered = filtered.filter((p) => p.rating >= minRating)
    if (inStockOnly) filtered = filtered.filter((p) => p.stock > 0)
    if (saleOnly) filtered = filtered.filter((p) => p.originalPrice && p.originalPrice > p.price)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }
    switch (sortBy) {
      case "price-low": filtered.sort((a, b) => a.price - b.price); break
      case "price-high": filtered.sort((a, b) => b.price - a.price); break
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break
      case "newest": filtered.sort((a, b) => Number(b.id) - Number(a.id)); break
      default: filtered.sort((a, b) => b.rating - a.rating)
    }
    return filtered
  }, [selectedCategory, sortBy, priceRange, minRating, inStockOnly, searchQuery])

  const clearAll = () => {
    setSelectedCategory("all")
    setPriceRange([0, 200])
    setMinRating(0)
    setInStockOnly(false)
    setSaleOnly(false)
    setSearchQuery("")
  }

  const currentSort = sortOptions.find((s) => s.value === sortBy)!

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">

        {/* ── Shop Hero Banner ─────────────────────────────────────────────── */}
        <div className="relative bg-card border-b border-border/50 overflow-hidden">
          {/* Glow accents */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 py-10 md:py-14 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest">Sport Accessories</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-xs">{products.length} products</span>
              </div>
              <h1
                className="text-3xl md:text-5xl font-black text-foreground leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Shop Premium
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  Sport Gear
                </span>
              </h1>
              <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-lg">
                Discover Cambodia&apos;s widest selection of sport accessories — fitness, football, basketball & more.
              </p>

              {/* Search bar */}
              <div className="relative mt-6 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="shop-search"
                  className="w-full bg-muted/50 border border-border text-foreground placeholder-muted-foreground text-sm pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-muted transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Pills (horizontal scroll) ───────────────────────────── */}
        <div className="bg-card border-b border-border/50 sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
              {[{ id: "all", name: "All Products" }, ...categories].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <span>{categoryEmojis[cat.id] || "🏅"}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main layout ─────────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6 lg:gap-8">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-32 bg-muted/50 border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                    <SlidersHorizontal className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    Filters
                  </h2>
                  {activeFilterCount > 0 && (
                    <span className="text-xs bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-bold">
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
                <FilterPanel
                  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange} setPriceRange={setPriceRange}
                  minRating={minRating} setMinRating={setMinRating}
                  inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
                  saleOnly={saleOnly} setSaleOnly={setSaleOnly}
                  onClear={clearAll}
                />
              </div>
            </aside>

            {/* Product area */}
            <div className="flex-1 min-w-0">

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    id="mobile-filter-btn"
                    className="lg:hidden flex items-center gap-2 bg-muted/50 border border-border hover:border-orange-500/30 text-muted-foreground hover:text-foreground text-sm font-semibold px-3.5 py-2 rounded-xl transition-all"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-orange-500 text-white text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center leading-none px-1">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Product count */}
                  <span className="text-muted-foreground text-sm">
                    <span className="text-foreground font-bold">{filteredProducts.length}</span> products
                  </span>

                  {/* Active filter chips */}
                  {selectedCategory !== "all" && (
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-orange-500/20 transition-all"
                    >
                      {categoryEmojis[selectedCategory]} {categories.find(c => c.id === selectedCategory)?.name}
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                  {minRating > 0 && (
                    <button
                      onClick={() => setMinRating(0)}
                      className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-amber-500/20 transition-all"
                    >
                      <Star className="h-2.5 w-2.5 fill-current" />{minRating}+
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 200) && (
                    <button
                      onClick={() => setPriceRange([0, 200])}
                      className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-blue-500/20 transition-all"
                    >
                      ${priceRange[0]}–${priceRange[1]}
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Sort dropdown */}
                  <div ref={sortRef} className="relative">
                    <button
                      onClick={() => setSortOpen(v => !v)}
                      className="flex items-center gap-2 bg-muted/50 border border-border hover:border-border text-muted-foreground hover:text-foreground text-sm font-semibold px-3.5 py-2 rounded-xl transition-all"
                    >
                      <currentSort.icon className="h-3.5 w-3.5" />
                      {currentSort.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-popover border border-border rounded-xl shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden z-40">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                            className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm font-medium transition-all ${
                              sortBy === opt.value
                                ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <opt.icon className="h-3.5 w-3.5" />
                            {opt.label}
                            {sortBy === opt.value && <Check className="h-3.5 w-3.5 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View mode toggle */}
                  <div className="flex bg-muted/50 border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 transition-all ${viewMode === "grid" ? "bg-orange-500/20 text-orange-600 dark:text-orange-400" : "text-muted-foreground/70 hover:text-muted-foreground"}`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 transition-all ${viewMode === "list" ? "bg-orange-500/20 text-orange-600 dark:text-orange-400" : "text-muted-foreground/70 hover:text-muted-foreground"}`}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid / List */}
              {filteredProducts.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="relative">
                        {/* HOT/NEW label (top-right, discount badge is top-left on card) */}
                        {productLabels[product.id] && (
                          <span className={`absolute top-2 right-2 z-20 ${productLabels[product.id].color} text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg pointer-events-none`}>
                            {productLabels[product.id].label}
                          </span>
                        )}
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredProducts.map((product) => {
                      const { hasDiscount, badgeLabel } = getDiscountInfo(product)
                      return (
                        <div
                          key={product.id}
                          className="flex gap-4 bg-muted/50 border border-border rounded-2xl p-4 hover:border-orange-500/25 transition-all group"
                        >
                          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Discount badge */}
                            {hasDiscount && (
                              <span className="absolute top-1.5 left-1.5 bg-gradient-to-br from-red-500 to-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-lg leading-none">
                                {badgeLabel}
                              </span>
                            )}
                            {/* HOT/NEW label */}
                            {!hasDiscount && productLabels[product.id] && (
                              <span className={`absolute top-1.5 left-1.5 ${productLabels[product.id].color} text-white text-[9px] font-black px-1.5 py-0.5 rounded-full`}>
                                {productLabels[product.id].label}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div>
                              <div className="flex items-start gap-2 flex-wrap">
                                <h3 className="font-bold text-foreground text-sm md:text-base line-clamp-1 flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                                  {product.name}
                                </h3>
                                {hasDiscount && (
                                  <span className="text-[10px] font-black bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {badgeLabel} OFF
                                  </span>
                                )}
                              </div>
                              <p className="text-muted-foreground text-xs md:text-sm mt-1 line-clamp-2">{product.description}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-600 dark:text-amber-400" />
                                <span className="text-xs text-muted-foreground">{product.rating}</span>
                                <span className="text-muted-foreground text-xs mx-1">·</span>
                                <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div>
                                {hasDiscount ? (
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black text-red-600 dark:text-red-400">${product.price.toFixed(2)}</span>
                                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice!.toFixed(2)}</span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-black text-foreground">${product.price.toFixed(2)}</span>
                                )}
                              </div>
                              <button
                                className="bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              ) : (
                /* Empty state */
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    No products found
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try a different keyword.`
                      : "No products match your current filters. Try adjusting them."
                    }
                  </p>
                  <button
                    onClick={clearAll}
                    className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* ── Mobile Filter Drawer ─────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileFilterOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[300px] bg-card border-r border-border flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <h2 className="font-black text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Filters</h2>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterPanel
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            priceRange={priceRange} setPriceRange={setPriceRange}
            minRating={minRating} setMinRating={setMinRating}
            inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
            saleOnly={saleOnly} setSaleOnly={setSaleOnly}
            onClear={clearAll}
          />
        </div>

        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/25"
          >
            Show {filteredProducts.length} Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  )
}

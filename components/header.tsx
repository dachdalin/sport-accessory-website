"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ShoppingCart, Menu, Dumbbell, Search, Zap, Heart,
  User, UserPlus, X, ChevronDown, LogIn, ArrowRight,
  Clock, TrendingUp, Star, Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useLanguage, type Language } from "@/lib/language-context"
import { products } from "@/lib/products"

// ─── Flag SVGs ─────────────────────────────────────────────────────────────────
function FlagEN() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-sm flex-shrink-0">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="3" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4.5" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  )
}

function FlagKH() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-sm flex-shrink-0">
      <rect width="20" height="14" fill="#032EA1" />
      <rect y="3.5" width="20" height="7" fill="#E00025" />
      <rect x="8" y="5" width="4" height="5" fill="#fff" />
      <polygon points="10,4 8,5 12,5" fill="#fff" />
      <rect x="7" y="6.5" width="1" height="3.5" fill="#fff" />
      <rect x="12" y="6.5" width="1" height="3.5" fill="#fff" />
    </svg>
  )
}

// ─── Language Switcher ──────────────────────────────────────────────────────────
function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const options: { value: Language; label: string; short: string; Flag: () => React.ReactElement }[] = [
    { value: "en", label: "English", short: "EN", Flag: FlagEN },
    { value: "km", label: "ខ្មែរ", short: "KH", Flag: FlagKH },
  ]
  const current = options.find(o => o.value === language)!

  return (
    <div ref={ref} className="relative" id="language-switcher">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 font-semibold transition-all rounded-lg px-2 py-1.5 ${
          mobile
            ? "text-foreground/70 hover:text-foreground hover:bg-muted text-sm w-full"
            : "text-muted-foreground hover:text-foreground hover:bg-muted text-xs"
        }`}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <current.Flag />
        <span>{current.short}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-popover border border-border shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map(({ value, label, Flag }) => (
            <button
              key={value}
              onClick={() => { setLanguage(value); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium transition-all ${
                value === language
                  ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Flag />
              <span>{label}</span>
              {value === language && <span className="ml-auto text-orange-600 dark:text-orange-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Search Modal ───────────────────────────────────────────────────────────────
const RECENT_KEY = "sg_recent_searches"
const TRENDING = ["Running Shoes", "Football", "Gym Gloves", "Basketball", "Yoga Mat", "Jump Rope"]
const QUICK_CATEGORIES = [
  { id: "fitness", label: "💪 Fitness" },
  { id: "football", label: "⚽ Football" },
  { id: "basketball", label: "🏀 Basketball" },
  { id: "running", label: "🏃 Running" },
  { id: "gym", label: "🏋️ Gym" },
  { id: "outdoor", label: "🌿 Outdoor" },
]

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [recents, setRecents] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recents from localStorage
  useEffect(() => {
    if (open) {
      try {
        const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
        setRecents(saved)
      } catch { setRecents([]) }
      // Focus input after transition
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery("")
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  // Keyboard shortcut: Cmd/Ctrl+K handled by parent

  const productResults = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  const handleSearch = useCallback((q: string) => {
    if (!q.trim()) return
    // Save to recents
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
      const updated = [q, ...saved.filter(s => s !== q)].slice(0, 5)
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
    } catch { /* noop */ }
    onClose()
    router.push(`/shop?search=${encodeURIComponent(q.trim())}`)
  }, [onClose, router])

  const clearRecents = () => {
    localStorage.removeItem(RECENT_KEY)
    setRecents([])
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 left-0 right-0 z-[90] mx-auto max-w-2xl px-4 pt-4 md:pt-16">
        <div className="bg-popover border border-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden">

          {/* Search input row */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-5 w-5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSearch(query) }}
              placeholder="Search products, categories…"
              id="header-search-input"
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-base focus:outline-none"
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all text-xs font-bold ml-1"
            >
              ESC
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {/* Product results */}
            {productResults.length > 0 && (
              <div className="p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-2 mb-2">Products</p>
                {productResults.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => { handleSearch(query) }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
                        <span className="text-muted-foreground/50 text-xs">·</span>
                        <span className="flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}

                {/* View all results */}
                <button
                  onClick={() => handleSearch(query)}
                  className="flex items-center justify-center gap-2 w-full mt-2 py-2.5 rounded-xl border border-border hover:border-orange-500/30 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 text-sm font-medium transition-all group"
                >
                  View all results for &ldquo;<span className="text-foreground font-bold">{query}</span>&rdquo;
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}

            {/* No results */}
            {query.trim().length > 0 && productResults.length === 0 && (
              <div className="px-4 py-8 text-center">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-muted-foreground text-sm">No products found for &ldquo;<span className="text-foreground font-medium">{query}</span>&rdquo;</p>
                <p className="text-muted-foreground/70 text-xs mt-1">Try a different keyword or browse categories below</p>
              </div>
            )}

            {/* Default state: recents + trending + categories */}
            {query.trim().length === 0 && (
              <div className="p-3 space-y-5">
                {/* Recent searches */}
                {recents.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Recent Searches</p>
                      <button onClick={clearRecents} className="text-[10px] text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
                        Clear
                      </button>
                    </div>
                    {recents.map(r => (
                      <button
                        key={r}
                        onClick={() => { setQuery(r); handleSearch(r) }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl hover:bg-muted text-left group transition-all"
                      >
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/70 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{r}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground/50 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trending */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-2 mb-2 flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3" />
                    Trending in Cambodia
                  </p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {TRENDING.map(term => (
                      <button
                        key={term}
                        onClick={() => { setQuery(term); handleSearch(term) }}
                        className="text-xs bg-muted border border-border text-muted-foreground hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/8 px-3 py-1.5 rounded-full transition-all font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick categories */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-2 mb-2 flex items-center gap-1.5">
                    <Package className="h-3 w-3" />
                    Browse Categories
                  </p>
                  <div className="grid grid-cols-3 gap-2 px-2">
                    {QUICK_CATEGORIES.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 border border-border hover:border-orange-500/30 hover:bg-orange-500/8 rounded-xl text-xs font-semibold text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Main Header ────────────────────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { t } = useLanguage()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Cmd/Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen, searchOpen])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/shop", label: t.shop },
    { href: "/flash-sale", label: t.flashSaleNav, highlight: true },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ]

  // Exact match for Home, prefix match for others
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white text-xs font-bold text-center py-2 px-4">
        <span className="flex items-center justify-center gap-2">
          <Zap className="h-3 w-3 fill-white flex-shrink-0" />
          <span className="truncate">{t.flashSale}</span>
          <Zap className="h-3 w-3 fill-white flex-shrink-0" />
        </span>
      </div>

      {/* ── Sticky header ───────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5 dark:shadow-black/20"
            : "bg-background border-b border-border/50"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" id="header-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Sport<span className="text-orange-600 dark:text-orange-400">Gear</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 group ${
                    link.highlight
                      ? active
                        ? "text-red-600 dark:text-red-400 bg-red-500/10"
                        : "text-red-600 dark:text-red-400 hover:bg-red-500/10"
                      : active
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.highlight && <Zap className="h-3.5 w-3.5 fill-current" />}
                  {link.label}
                  {/* Active underline indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      link.highlight ? "bg-red-500" : "bg-orange-500 dark:bg-orange-400"
                    } ${
                      active ? "w-5 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* Search button — desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              id="header-search"
              aria-label={t.search}
              className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/70 border border-border hover:border-border rounded-lg pl-3 pr-2 py-1.5 text-sm transition-all group"
            >
              <Search className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs text-muted-foreground/80 group-hover:text-muted-foreground transition-colors hidden xl:block">
                Search…
              </span>
              <kbd className="hidden xl:flex items-center gap-0.5 text-[10px] bg-background border border-border text-muted-foreground px-1.5 py-0.5 rounded font-mono ml-1">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher — desktop */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Wishlist */}
            <Link href="/wishlist" id="header-wishlist" aria-label={t.wishlist}
              className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                isActive("/wishlist")
                  ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-[1.1rem] h-[1.1rem] items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg leading-none px-1">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" id="header-cart" aria-label={t.cart}
              className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                isActive("/cart")
                  ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-[1.1rem] h-[1.1rem] items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-lg leading-none px-1">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Dashboard / Account — desktop */}
            <Link
              href="/dashboard"
              id="header-account"
              aria-label="My Account"
              className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                isActive("/dashboard")
                  ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Login / Register — desktop */}
            <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-border">
              <Link href="/login" id="header-login"
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                  isActive("/login")
                    ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <LogIn className="h-4 w-4" />
                {t.login}
              </Link>
              <Link href="/register" id="header-register"
                className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg transition-all shadow-lg ${
                  isActive("/register")
                    ? "bg-orange-400 text-white shadow-orange-400/40"
                    : "bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                {t.register}
              </Link>
            </div>

            {/* Mobile: search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label={t.search}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              id="header-mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Search Modal ─────────────────────────────────────────────────────── */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile Drawer backdrop ────────────────────────────────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer panel ───────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[300px] bg-card border-l border-border flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-black text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Sport<span className="text-orange-600 dark:text-orange-400">Gear</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Close menu"
            id="mobile-menu-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile search shortcut */}
        <div className="px-4 pt-4">
          <button
            onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
            className="flex items-center gap-2.5 w-full bg-muted border border-border hover:border-orange-500/30 rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Search products…</span>
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Nav links */}
          <nav className="flex flex-col gap-1 mb-5" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                    link.highlight
                      ? active
                        ? "text-red-600 dark:text-red-400 bg-red-500/12 border border-red-500/20"
                        : "text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-transparent"
                      : active
                        ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                  }`}
                >
                  {link.highlight ? (
                    <Zap className="h-4 w-4 flex-shrink-0 fill-current" />
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? "bg-orange-400" : "bg-muted-foreground/30"}`} />
                  )}
                  {link.label}
                  {active && <span className="ml-auto text-xs text-orange-600/70 dark:text-orange-400/70 font-medium">Current</span>}
                </Link>
              )
            })}
          </nav>

          <div className="h-px bg-border mb-4" />

          {/* Language Switcher */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold px-1 mb-2">{t.language}</p>
            <LanguageSwitcher mobile />
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Theme toggle */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold px-1 mb-2">Appearance</p>
            <ThemeToggle mobile />
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Login / Register */}
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              id="mobile-login"
              className={`flex items-center gap-2.5 text-sm font-semibold px-3 py-3 rounded-xl transition-all ${
                isActive("/login")
                  ? "text-orange-600 dark:text-orange-400 bg-orange-500/12 border border-orange-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <LogIn className="h-4 w-4" />
              </div>
              {t.login}
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              id="mobile-register"
              className="flex items-center gap-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-400 px-3 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <UserPlus className="h-4 w-4" />
              </div>
              {t.register}
            </Link>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center justify-center gap-6 mb-3">
            {[
              { href: "/wishlist", icon: Heart, label: t.wishlist, badge: wishlistCount, badgeColor: "bg-rose-500" },
              { href: "/cart", icon: ShoppingCart, label: t.cart, badge: itemCount, badgeColor: "bg-orange-500" },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive(item.href) ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.badge > 0 && (
                    <span className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full ${item.badgeColor} text-[9px] font-bold text-white`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive("/dashboard") ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground/70">© 2025 SportGear · Cambodia 🇰🇭</p>
        </div>
      </div>
    </>
  )
}

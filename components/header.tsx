"use client"

import React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  ShoppingCart,
  Menu,
  Dumbbell,
  Search,
  Zap,
  Heart,
  User,
  UserPlus,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useLanguage, type Language } from "@/lib/language-context"

// ─── Flag SVGs ────────────────────────────────────────────────────────────────
function FlagEN() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-sm">
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
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-sm">
      <rect width="20" height="14" fill="#032EA1" />
      <rect y="3.5" width="20" height="7" fill="#E00025" />
      {/* Simple temple silhouette */}
      <rect x="8" y="5" width="4" height="5" fill="#fff" />
      <polygon points="10,4 8,5 12,5" fill="#fff" />
      <rect x="7" y="6.5" width="1" height="3.5" fill="#fff" />
      <rect x="12" y="6.5" width="1" height="3.5" fill="#fff" />
    </svg>
  )
}

// ─── Language Dropdown ─────────────────────────────────────────────────────────
function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
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
        className={`flex items-center gap-1.5 font-semibold transition-all rounded-lg px-2 py-1.5
          ${mobile
            ? "text-white/70 hover:text-white hover:bg-white/8 text-sm w-full"
            : "text-white/60 hover:text-white hover:bg-white/8 text-xs"
          }`}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <current.Flag />
        <span>{current.short}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#0D1525] border border-white/12 shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map(({ value, label, Flag }) => (
            <button
              key={value}
              onClick={() => { setLanguage(value); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium transition-all
                ${value === language
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
                }`}
            >
              <Flag />
              <span>{label}</span>
              {value === language && <span className="ml-auto text-orange-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Header ───────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/shop", label: t.shop },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ]

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

      {/* ── Sticky header ────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#050A14]/95 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20"
            : "bg-[#050A14] border-b border-white/5"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" id="header-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Sport<span className="text-orange-400">Gear</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 px-4 py-2 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* Search — desktop only */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/8 rounded-lg hidden lg:flex"
              id="header-search"
              aria-label={t.search}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Switcher — desktop */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" id="header-wishlist" aria-label={t.wishlist}>
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white hover:bg-white/8 rounded-lg">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg leading-none px-1">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" id="header-cart" aria-label={t.cart}>
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white hover:bg-white/8 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-lg leading-none px-1">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Login / Register — desktop */}
            <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-white/10">
              <Link href="/login" id="header-login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/8 rounded-lg text-sm font-medium gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  {t.login}
                </Button>
              </Link>
              <Link href="/register" id="header-register">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg text-sm gap-1.5 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  {t.register}
                </Button>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
              id="header-mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ─────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel — slides from right */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[300px] bg-[#080D18] border-l border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Sport<span className="text-orange-400">Gear</span>
            </span>
          </Link>

          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/12 text-white/50 hover:text-white transition-all"
            aria-label="Close menu"
            id="mobile-menu-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {/* Nav links */}
          <nav className="flex flex-col gap-1 mb-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-base font-semibold text-white/70 hover:text-white hover:bg-white/8 px-3 py-3 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-white/8 mb-5" />

          {/* Language Switcher mobile */}
          <div className="mb-5">
            <p className="text-xs text-white/30 uppercase tracking-widest font-bold px-3 mb-2">{t.language}</p>
            <LanguageSwitcher mobile />
          </div>

          <div className="h-px bg-white/8 mb-5" />

          {/* Login / Register */}
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              id="mobile-login"
              className="flex items-center gap-2.5 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 px-3 py-3 rounded-xl transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8">
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
        <div className="px-5 py-4 border-t border-white/8">
          <div className="flex items-center justify-center gap-6 mb-3">
            <Link
              href="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-orange-400 transition-colors"
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs">{t.wishlist}</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-orange-400 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs">{t.cart}</span>
            </Link>
            <button className="flex flex-col items-center gap-1 text-white/40 hover:text-orange-400 transition-colors">
              <Search className="h-5 w-5" />
              <span className="text-xs">{t.search}</span>
            </button>
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-orange-400 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Link>
          </div>
          <p className="text-center text-xs text-white/20">© 2025 SportGear · Cambodia 🇰🇭</p>
        </div>
      </div>
    </>
  )
}

"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, Dumbbell, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white text-xs font-bold text-center py-2 px-4">
        <span className="flex items-center justify-center gap-2">
          <Zap className="h-3 w-3 fill-white" />
          FLASH SALE — FREE SHIPPING ON ORDERS $30+ · VALID TODAY ONLY
          <Zap className="h-3 w-3 fill-white" />
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#050A14]/95 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20"
            : "bg-[#050A14] border-b border-white/5"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" id="header-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Sport<span className="text-orange-400">Gear</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/8 rounded-lg hidden md:flex" id="header-search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/cart" id="header-cart">
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white hover:bg-white/8 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/8 rounded-lg" id="header-mobile-menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-[#080D18] border-white/10">
                <div className="flex items-center gap-2.5 mb-8 mt-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700">
                    <Dumbbell className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Sport<span className="text-orange-400">Gear</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-white/70 hover:text-white hover:bg-white/8 px-3 py-2.5 rounded-lg transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

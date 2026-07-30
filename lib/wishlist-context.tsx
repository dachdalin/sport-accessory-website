"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/cart-context"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  toggleItem: (product: Product) => void
  isWishlisted: (id: string) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const addItem = useCallback((product: Product) => {
    setItems(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product])
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }, [])

  const toggleItem = useCallback((product: Product) => {
    setItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isWishlisted = useCallback((id: string) => {
    return items.some(p => p.id === id)
  }, [items])

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted, itemCount: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
}

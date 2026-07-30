"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number          // price before discount
  discountType?: "percent" | "amount"  // show as "30% OFF" or "$10 OFF"
  image: string
  category: string
  rating: number
  description: string
  stock: number
  sizes?: string[]
  colors?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      )
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...currentItems, { ...product, quantity, selectedSize: size, selectedColor: color }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

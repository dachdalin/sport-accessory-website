import type { ElementType } from "react"
import { User, ShoppingBag, Heart, MapPin } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Tab = "profile" | "orders" | "wishlist" | "address"

export interface UserProfile {
  name: string
  email: string
  phone: string
  initials: string
  memberSince: string
}

export interface Address {
  id: string
  label: string
  line1: string
  city: string
  state: string
  zip: string
  country: string
}

export interface OrderProduct {
  id: string
  name: string
  image: string
  price: number
  qty: number
  size?: string
  color?: string
}

export interface Order {
  id: string
  date: string
  status: string
  products: OrderProduct[]
  subtotal: number
  shipping: number
  discount: number
  total: number
}

export interface NavItem {
  key: Tab
  label: string
  icon: ElementType
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_USER: UserProfile = {
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 234-5678",
  initials: "AJ",
  memberSince: "Jan 2024",
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "#ORD-1001",
    date: "Jul 15, 2026",
    status: "Delivered",
    products: [
      { id: "5", name: "Running Shoes Pro", image: "/products/shoes.jpg", price: 89.99, qty: 1, size: "US 9", color: "Black/White" },
    ],
    subtotal: 89.99,
    shipping: 0,
    discount: 0,
    total: 89.99,
  },
  {
    id: "#ORD-0988",
    date: "Jun 28, 2026",
    status: "Delivered",
    products: [
      { id: "6", name: "Yoga Mat Premium", image: "/products/yoga-mat.jpg", price: 34.99, qty: 1, color: "Purple" },
      { id: "7", name: "Jump Rope Speed", image: "/products/jump-rope.jpg", price: 9.99, qty: 2, color: "Black" },
      { id: "2", name: "Resistance Bands Set", image: "/products/bands.jpg", price: 14.00, qty: 1 },
    ],
    subtotal: 69.97,
    shipping: 0,
    discount: 15.00,
    total: 54.97,
  },
  {
    id: "#ORD-0921",
    date: "May 10, 2026",
    status: "Delivered",
    products: [
      { id: "1", name: "Pro Training Gloves", image: "/products/gloves.jpg", price: 29.99, qty: 1, size: "M", color: "Black" },
    ],
    subtotal: 29.99,
    shipping: 5.99,
    discount: 5.99,
    total: 29.99,
  },
]

export const NAV_ITEMS: NavItem[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "orders", label: "Order History", icon: ShoppingBag },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "address", label: "Address", icon: MapPin },
]

// ─── Utilities ────────────────────────────────────────────────────────────────

export function orderStatusClass(status: string): string {
  const map: Record<string, string> = {
    Delivered: "bg-green-500/15 text-green-400 border border-green-500/20",
    Shipped:   "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    Processing:"bg-amber-500/15 text-amber-400 border border-amber-500/20",
    Cancelled: "bg-red-500/15 text-red-400 border border-red-500/20",
  }
  return map[status] ?? "bg-white/10 text-white/50 border border-white/10"
}

export function downloadInvoice(order: Order): void {
  const lines = [
    "============================================",
    "         SPORTGEAR PRO — INVOICE",
    "============================================",
    `Order:    ${order.id}`,
    `Date:     ${order.date}`,
    `Status:   ${order.status}`,
    "",
    "--------------------------------------------",
    "ITEMS",
    "--------------------------------------------",
    ...order.products.map(
      (p) =>
        `${p.name}${p.size ? ` (${p.size})` : ""}${p.color ? ` / ${p.color}` : ""}` +
        `\n  Qty: ${p.qty}  ×  $${p.price.toFixed(2)} = $${(p.price * p.qty).toFixed(2)}`
    ),
    "",
    "--------------------------------------------",
    "SUMMARY",
    "--------------------------------------------",
    `Subtotal:  $${order.subtotal.toFixed(2)}`,
    `Shipping:  ${order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}`,
    ...(order.discount > 0 ? [`Discount:  -$${order.discount.toFixed(2)}`] : []),
    "--------------------------------------------",
    `TOTAL:     $${order.total.toFixed(2)}`,
    "",
    "Thank you for shopping with SportGear Pro!",
    "============================================",
  ].join("\n")

  const blob = new Blob([lines], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `invoice-${order.id.replace("#", "")}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Trash2,
  Package,
  Pencil,
  Check,
  X,
  Plus,
  Star,
  ChevronRight,
  Home,
  Shield,
  Eye,
  EyeOff,
  ChevronLeft,
  Download,
  FileText,
  Tag,
} from "lucide-react"

// ─── Types & constants ────────────────────────────────────────────────────────

type Tab = "profile" | "orders" | "wishlist" | "address"

interface UserProfile {
  name: string
  email: string
  phone: string
  initials: string
  memberSince: string
}

interface Address {
  id: string
  label: string
  line1: string
  city: string
  state: string
  zip: string
  country: string
}

const MOCK_USER: UserProfile = {
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 234-5678",
  initials: "AJ",
  memberSince: "Jan 2024",
}

interface OrderProduct {
  id: string
  name: string
  image: string
  price: number
  qty: number
  size?: string
  color?: string
}

interface Order {
  id: string
  date: string
  status: string
  products: OrderProduct[]
  subtotal: number
  shipping: number
  discount: number
  total: number
}

const MOCK_ORDERS: Order[] = [
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

const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "orders", label: "Order History", icon: ShoppingBag },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "address", label: "Address", icon: MapPin },
]

function orderStatusClass(status: string) {
  const map: Record<string, string> = {
    Delivered: "bg-green-500/15 text-green-400 border border-green-500/20",
    Shipped: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    Processing: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    Cancelled: "bg-red-500/15 text-red-400 border border-red-500/20",
  }
  return map[status] ?? "bg-white/10 text-white/50 border border-white/10"
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const { items: wishlistItems, removeItem: removeWishlistItem } = useWishlist()

  // Profile state
  const [user, setUser] = useState<UserProfile>(MOCK_USER)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email, phone: user.phone })

  // Order detail state
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  // Password state
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Home", line1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US" },
  ])
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddr, setNewAddr] = useState<Omit<Address, "id">>({
    label: "", line1: "", city: "", state: "", zip: "", country: "US",
  })

  // ── Handlers ────────────────────────────────────────────────────────────────

  function saveProfile() {
    const initials = editForm.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    setUser((prev) => ({ ...prev, ...editForm, initials }))
    setIsEditing(false)
  }

  function savePassword() {
    setPasswordError("")
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match.")
      return
    }
    setPasswordSuccess(true)
    setPasswordForm({ newPassword: "", confirmPassword: "" })
    setIsChangingPassword(false)
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  function downloadInvoice(order: Order) {
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

  function submitNewAddress() {
    if (!newAddr.line1 || !newAddr.city) return
    setAddresses((prev) => [...prev, { ...newAddr, id: String(Date.now()) }])
    setNewAddr({ label: "", line1: "", city: "", state: "", zip: "", country: "US" })
    setShowAddAddress(false)
  }

  function deleteAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  // ── Section: Profile ─────────────────────────────────────────────────────────

  function renderProfile() {
    return (
      <div className="space-y-4">
        {/* Personal info card */}
        <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Personal Info
            </h2>
            {!isEditing ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditForm({ name: user.name, email: user.email, phone: user.phone })
                  setIsEditing(true)
                }}
                className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 gap-1.5 h-8"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={saveProfile}
                  className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-8"
                >
                  <Check className="h-3.5 w-3.5" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-white/60 hover:text-white hover:bg-white/5 h-8"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Avatar row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
              {user.initials}
            </div>
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-sm text-white/45">Member since {user.memberSince}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              {(
                [
                  { id: "name", label: "Full Name", type: "text", key: "name" as const },
                  { id: "email", label: "Email", type: "email", key: "email" as const },
                  { id: "phone", label: "Phone", type: "tel", key: "phone" as const },
                ] as const
              ).map(({ id, label, type, key }) => (
                <div key={id} className="space-y-1.5">
                  <Label htmlFor={id} className="text-white/70 text-sm">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    type={type}
                    value={editForm[key]}
                    onChange={(e) => setEditForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-white/6">
              {[
                { label: "Full Name", value: user.name },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 first:pt-0 last:pb-0">
                  <span className="text-sm text-white/45 sm:w-32 flex-shrink-0">{label}</span>
                  <span className="text-sm text-white">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security card */}
        <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4 text-orange-400" />
              <h2 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Security
              </h2>
            </div>
            {!isChangingPassword && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPasswordForm({ newPassword: "", confirmPassword: "" })
                  setPasswordError("")
                  setIsChangingPassword(true)
                }}
                className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 gap-1.5 h-8"
              >
                <Pencil className="h-3.5 w-3.5" />
                Change Password
              </Button>
            )}
          </div>

          {/* Success banner */}
          {passwordSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/12 border border-green-500/20 px-4 py-3 text-sm text-green-400 mb-4">
              <Check className="h-4 w-4 flex-shrink-0" />
              Password updated successfully.
            </div>
          )}

          {isChangingPassword ? (
            <div className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <Label htmlFor="new-password" className="text-white/70 text-sm">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) => {
                      setPasswordError("")
                      setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                    }}
                    className="h-11 border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-white/70 text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => {
                      setPasswordError("")
                      setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                    }}
                    className="h-11 border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Strength hint */}
              {passwordForm.newPassword.length > 0 && (
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => {
                    const len = passwordForm.newPassword.length
                    const hasUpper = /[A-Z]/.test(passwordForm.newPassword)
                    const hasNum = /\d/.test(passwordForm.newPassword)
                    const hasSymbol = /[^A-Za-z0-9]/.test(passwordForm.newPassword)
                    const strength = (len >= 8 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSymbol ? 1 : 0)
                    const colors = ["bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-green-500"]
                    return (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= strength ? colors[strength - 1] : "bg-white/10"
                        }`}
                      />
                    )
                  })}
                </div>
              )}

              {/* Error */}
              {passwordError && (
                <p className="flex items-center gap-1.5 text-sm text-red-400">
                  <X className="h-3.5 w-3.5 flex-shrink-0" />
                  {passwordError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={savePassword}
                  className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-9"
                >
                  <Check className="h-3.5 w-3.5" />
                  Update Password
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsChangingPassword(false)
                    setPasswordError("")
                    setPasswordForm({ newPassword: "", confirmPassword: "" })
                  }}
                  className="text-white/55 hover:text-white hover:bg-white/5 h-9"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/40">
              {passwordSuccess ? "" : "Keep your account secure with a strong password."}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Section: Order History ────────────────────────────────────────────────────

  function renderOrders() {
    const selectedOrder = MOCK_ORDERS.find((o) => o.id === selectedOrderId)

    // ── Detail view ────────────────────────────────────────────────────────────
    if (selectedOrder) {
      return (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setSelectedOrderId(null)}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Orders
            </button>
            <Button
              size="sm"
              onClick={() => downloadInvoice(selectedOrder)}
              className="bg-white/8 hover:bg-white/14 border border-white/10 hover:border-white/20 text-white gap-1.5 h-8"
            >
              <Download className="h-3.5 w-3.5" />
              Download Invoice
            </Button>
          </div>

          {/* Order meta card */}
          <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {selectedOrder.id}
                  </p>
                  <p className="text-xs text-white/45 mt-0.5">{selectedOrder.date}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto ${orderStatusClass(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>

          {/* Product list */}
          <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-5">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Items ({selectedOrder.products.length})
            </h3>
            <div className="space-y-3">
              {selectedOrder.products.map((product, i) => (
                <div key={`${product.id}-${i}`} className="flex items-center gap-4">
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-16 w-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/8"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <p className="text-sm font-semibold text-white hover:text-orange-400 transition-colors line-clamp-1">
                        {product.name}
                      </p>
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                      {product.size && (
                        <span className="text-xs text-white/45">Size: {product.size}</span>
                      )}
                      {product.color && (
                        <span className="text-xs text-white/45">Color: {product.color}</span>
                      )}
                      <span className="text-xs text-white/45">Qty: {product.qty}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-white">
                      ${(product.price * product.qty).toFixed(2)}
                    </p>
                    {product.qty > 1 && (
                      <p className="text-xs text-white/35 mt-0.5">${product.price.toFixed(2)} each</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-5">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Shipping</span>
                <span className={selectedOrder.shipping === 0 ? "text-green-400 font-medium" : "text-white"}>
                  {selectedOrder.shipping === 0 ? "FREE" : `$${selectedOrder.shipping.toFixed(2)}`}
                </span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-white/60">
                    <Tag className="h-3.5 w-3.5 text-green-400" />
                    Discount
                  </span>
                  <span className="text-green-400 font-medium">−${selectedOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="h-px bg-white/8 my-1" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Total</span>
                <span className="text-lg font-black text-orange-400">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // ── List view ──────────────────────────────────────────────────────────────
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
        <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Order History
        </h2>

        {MOCK_ORDERS.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Package className="h-12 w-12 text-white/20 mb-3" />
            <p className="text-sm text-white/45 mb-4">No orders yet.</p>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/3 p-4 hover:border-orange-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-2 decoration-orange-400/40 hover:decoration-orange-300 text-sm transition-colors text-left"
                    >
                      {order.id}
                    </button>
                    <p className="text-xs text-white/45 mt-0.5">
                      {order.date} · {order.products.length} item{order.products.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${orderStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-1.5 sm:flex-col sm:items-end">
                    <span className="font-bold text-white text-sm">${order.total.toFixed(2)}</span>
                    <Button
                      size="sm"
                      onClick={() => downloadInvoice(order)}
                      className="h-7 px-2.5 bg-white/6 hover:bg-white/12 border border-white/10 text-white/60 hover:text-white gap-1 text-xs"
                    >
                      <Download className="h-3 w-3" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Section: Wishlist ────────────────────────────────────────────────────────

  function renderWishlist() {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
        <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Wishlist
          {wishlistItems.length > 0 && (
            <span className="ml-2 text-sm font-normal text-white/40">({wishlistItems.length})</span>
          )}
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Heart className="h-12 w-12 text-white/20 mb-3" />
            <p className="text-sm text-white/45 mb-4">Your wishlist is empty.</p>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 p-3 hover:border-orange-500/20 transition-colors"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-16 w-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/product/${product.id}`}>
                    <p className="text-sm font-semibold text-white hover:text-orange-400 transition-colors line-clamp-1">
                      {product.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-white/45">{product.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-orange-400 mt-1">${product.price.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeWishlistItem(product.id)}
                  aria-label="Remove from wishlist"
                  className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Section: Address ─────────────────────────────────────────────────────────

  function renderAddress() {
    return (
      <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Saved Addresses
          </h2>
          <Button
            size="sm"
            onClick={() => setShowAddAddress((v) => !v)}
            className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-8"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {/* New address form */}
        {showAddAddress && (
          <div className="mb-5 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 space-y-3">
            <p className="text-sm font-semibold text-orange-400">New Address</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label className="text-white/65 text-xs">Label (e.g. Home, Office)</Label>
                <Input
                  placeholder="Home"
                  value={newAddr.label}
                  onChange={(e) => setNewAddr((p) => ({ ...p, label: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-white/65 text-xs">Street Address</Label>
                <Input
                  placeholder="123 Main St"
                  value={newAddr.line1}
                  onChange={(e) => setNewAddr((p) => ({ ...p, line1: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white/65 text-xs">City</Label>
                <Input
                  placeholder="New York"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr((p) => ({ ...p, city: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white/65 text-xs">State / Region</Label>
                <Input
                  placeholder="NY"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr((p) => ({ ...p, state: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white/65 text-xs">ZIP / Postal Code</Label>
                <Input
                  placeholder="10001"
                  value={newAddr.zip}
                  onChange={(e) => setNewAddr((p) => ({ ...p, zip: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white/65 text-xs">Country</Label>
                <Input
                  placeholder="US"
                  value={newAddr.country}
                  onChange={(e) => setNewAddr((p) => ({ ...p, country: e.target.value }))}
                  className="h-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={submitNewAddress} className="bg-orange-500 hover:bg-orange-600 text-white h-8">
                Save Address
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAddAddress(false)}
                className="text-white/55 hover:text-white hover:bg-white/5 h-8"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {addresses.length === 0 && !showAddAddress ? (
          <div className="flex flex-col items-center py-12 text-center">
            <MapPin className="h-12 w-12 text-white/20 mb-3" />
            <p className="text-sm text-white/45">No saved addresses.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-white/3 p-4 hover:border-orange-500/20 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="h-9 w-9 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Home className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{addr.label || "Address"}</p>
                    <p className="text-xs text-white/45 mt-0.5">{addr.line1}</p>
                    <p className="text-xs text-white/45">
                      {addr.city}
                      {addr.state ? `, ${addr.state}` : ""} {addr.zip}
                    </p>
                    <p className="text-xs text-white/45">{addr.country}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteAddress(addr.id)}
                  aria-label="Remove address"
                  className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Logout dialog ────────────────────────────────────────────────────────────

  function LogoutDialog({ triggerClassName, iconOnly }: { triggerClassName?: string; iconOnly?: boolean }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className={
              triggerClassName ??
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all text-left"
            }
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!iconOnly && "Logout"}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#0D1525] border-white/10 text-white max-w-sm">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                <LogOut className="h-5 w-5 text-white/70" />
              </div>
              <AlertDialogTitle className="text-white text-lg">Log out?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-white/50 text-sm leading-relaxed">
              You will be signed out of your account. Your cart and wishlist will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-500 hover:bg-orange-600 text-white border-0"
              onClick={() => router.push("/login")}
            >
              Yes, log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // ── Delete account dialog ────────────────────────────────────────────────────

  function DeleteAccountDialog({ triggerClassName }: { triggerClassName?: string }) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className={
              triggerClassName ??
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
            }
          >
            <Trash2 className="h-4 w-4 flex-shrink-0" />
            Delete Account
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#0D1525] border-white/10 text-white max-w-sm">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>
              <AlertDialogTitle className="text-white text-lg">Delete account?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-white/50 text-sm leading-relaxed">
              This will permanently erase your account, order history, saved addresses, and wishlist.
              This action <span className="text-white font-medium">cannot be undone</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              onClick={() => router.push("/login")}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-[#050A14]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
          <aside className="hidden lg:flex lg:flex-col gap-3 w-60 flex-shrink-0 sticky top-8">
            {/* User card */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{user.name}</p>
                  <p className="text-xs text-white/45 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-2">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === key
                      ? "bg-orange-500/15 text-orange-400"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                  {activeTab === key && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
                </button>
              ))}
            </nav>

            {/* Logout + Delete */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-2">
              <LogoutDialog />
              <DeleteAccountDialog />
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Mobile: user card + tab strip */}
            <div className="lg:hidden mb-5 space-y-3">
              <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
                  {user.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-sm truncate">{user.name}</p>
                  <p className="text-xs text-white/45 truncate">{user.email}</p>
                </div>
                <LogoutDialog triggerClassName="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors flex items-center" iconOnly />
              </div>

              {/* Horizontal tab strip */}
              <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
                {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                      activeTab === key
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-white/50 bg-white/4 border border-white/8 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active section */}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "orders" && renderOrders()}
            {activeTab === "wishlist" && renderWishlist()}
            {activeTab === "address" && renderAddress()}

            {/* Mobile: delete account */}
            <div className="lg:hidden mt-4">
              <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-2">
                <DeleteAccountDialog triggerClassName="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <CartProvider>
      <DashboardContent />
    </CartProvider>
  )
}

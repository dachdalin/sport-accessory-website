"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPin, Truck, CreditCard, CheckCircle, Tag, ChevronRight, ChevronLeft,
  Zap, Banknote, Smartphone, AlertCircle, Package, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "@/lib/cart-context"

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVINCES = [
  "Phnom Penh", "Siem Reap", "Battambang", "Preah Sihanouk", "Kampong Cham",
  "Kampot", "Takéo", "Kandal", "Prey Veng", "Svay Rieng", "Kampong Thom",
  "Pursat", "Kratie", "Stung Treng", "Ratanakiri", "Mondulkiri",
  "Oddar Meanchey", "Banteay Meanchey", "Koh Kong", "Preah Vihear",
  "Kampong Speu", "Kampong Chhnang", "Kep", "Pailin", "Tbong Khmum",
]

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", days: "2 – 5 business days", price: 2.5,  icon: Truck },
  { id: "express",  label: "Express Delivery",  days: "1 – 2 business days", price: 5.0,  icon: Zap   },
]

const PAYMENT_METHODS = [
  { id: "cod",  label: "Cash on Delivery",   note: "Pay when you receive",  icon: Banknote   },
  { id: "aba",  label: "ABA Mobile Pay",     note: "Scan QR to pay",        icon: Smartphone },
  { id: "wing", label: "Wing Money",          note: "Transfer via Wing app", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard",     icon: CreditCard },
]

const COUPONS: Record<string, { type: "percent" | "shipping"; value: number; label: string }> = {
  SPORT10:  { type: "percent",  value: 10, label: "10% off your order" },
  GEAR20:   { type: "percent",  value: 20, label: "20% off your order" },
  FREESHIP: { type: "shipping", value: 0,  label: "Free shipping"       },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddressForm {
  name: string; phone: string; street: string
  city: string; province: string; note: string
}

type Step = 1 | 2 | 3 | 4

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "Address"  },
  { n: 2, label: "Delivery" },
  { n: 3, label: "Payment"  },
  { n: 4, label: "Success"  },
]

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center">
      {STEPS.map((s, i) => {
        const done   = current > s.n
        const active = current === s.n
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done   ? "bg-green-500 text-white"
                : active ? "bg-orange-500 text-white ring-4 ring-orange-500/25"
                         : "bg-white/8 text-white/30 border border-white/10"}`}>
                {done ? <CheckCircle className="h-4 w-4" /> : s.n}
              </div>
              <span className={`text-xs font-medium ${active ? "text-orange-400" : done ? "text-green-400" : "text-white/30"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-10 sm:w-16 mx-2 mb-5 transition-colors ${done ? "bg-green-500" : "bg-white/10"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const inputCls = "h-11 border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-white/45">{label}</Label>
      {children}
    </div>
  )
}

// ─── Step 1 — Address ─────────────────────────────────────────────────────────

function StepAddress({
  form, onChange, onNext, onBack,
}: {
  form: AddressForm
  onChange: (f: AddressForm) => void
  onNext: () => void
  onBack: () => void
}) {
  const set = (key: keyof AddressForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...form, [key]: e.target.value })

  const valid = form.name && form.phone && form.street && form.city && form.province

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <Input placeholder="Dara Chan" value={form.name} onChange={set("name")} className={inputCls} />
        </Field>
        <Field label="Phone Number">
          <Input placeholder="+855 12 345 678" value={form.phone} onChange={set("phone")} className={inputCls} />
        </Field>
      </div>
      <Field label="Street Address">
        <Input placeholder="Street 271, House 45A" value={form.street} onChange={set("street")} className={inputCls} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="City / District">
          <Input placeholder="Chamkarmon" value={form.city} onChange={set("city")} className={inputCls} />
        </Field>
        <Field label="Province">
          <select
            value={form.province}
            onChange={set("province")}
            className="w-full h-11 rounded-md border border-white/10 bg-white/5 text-white text-sm px-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25"
          >
            <option value="" className="bg-[#0D1525]">Select province…</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p} className="bg-[#0D1525]">{p}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Delivery Note (Optional)">
        <Input placeholder="Near the blue gate…" value={form.note} onChange={set("note")} className={inputCls} />
      </Field>

      <div className="flex gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="h-11 px-5 text-white/50 hover:text-white hover:bg-white/5">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold gap-2"
        >
          Continue to Delivery <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 2 — Delivery ────────────────────────────────────────────────────────

function StepDelivery({
  province, selected, onSelect, onNext, onBack,
}: {
  province: string
  selected: string
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const isFreeZone = province === "Phnom Penh"

  return (
    <div className="space-y-5">
      <p className="text-sm text-white/50">
        Delivering to <span className="font-semibold text-white">{province}</span>
      </p>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((opt) => {
          const price    = isFreeZone && opt.id === "standard" ? 0 : opt.price
          const isActive = selected === opt.id
          const Icon     = opt.icon
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full flex items-center gap-4 rounded-xl border p-5 text-left transition-all
                ${isActive ? "border-orange-500 bg-orange-500/10" : "border-white/8 bg-white/3 hover:border-white/20"}`}
            >
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0
                ${isActive ? "bg-orange-500/20 text-orange-400" : "bg-white/6 text-white/35"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isActive ? "text-white" : "text-white/70"}`}>{opt.label}</p>
                <p className="text-sm text-white/40 mt-0.5">{opt.days}</p>
              </div>
              <div className="text-right flex-shrink-0">
                {price === 0
                  ? <span className="text-base font-bold text-green-400">FREE</span>
                  : <span className={`text-base font-bold ${isActive ? "text-orange-400" : "text-white/55"}`}>${price.toFixed(2)}</span>
                }
              </div>
              <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                ${isActive ? "border-orange-500 bg-orange-500" : "border-white/20"}`}>
                {isActive && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {isFreeZone && (
        <div className="flex items-start gap-2.5 rounded-xl bg-green-500/8 border border-green-500/15 px-4 py-3">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/60">
            Standard delivery is <span className="text-green-400 font-semibold">FREE</span> for Phnom Penh orders.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="h-11 px-5 text-white/50 hover:text-white hover:bg-white/5">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold gap-2"
        >
          Continue to Payment <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Step 3 — Payment ─────────────────────────────────────────────────────────

function StepPayment({
  product, quantity, size, color, deliveryId, province, onPlace, onBack,
}: {
  product: Product; quantity: number; size?: string; color?: string
  deliveryId: string; province: string
  onPlace: (orderNum: string) => void
  onBack: () => void
}) {
  const [coupon,      setCoupon]    = useState("")
  const [applied,     setApplied]   = useState<string | null>(null)
  const [couponError, setCouponErr] = useState("")
  const [payMethod,   setPayMethod] = useState("cod")
  const [placing,     setPlacing]   = useState(false)

  const isFreeZone   = province === "Phnom Penh"
  const deliveryOpt  = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!
  const baseShipping = isFreeZone && deliveryId === "standard" ? 0 : deliveryOpt.price
  const subtotal     = product.price * quantity
  const couponData   = applied ? COUPONS[applied] : null
  const discount     = couponData?.type === "percent" ? subtotal * (couponData.value / 100) : 0
  const shipping     = couponData?.type === "shipping" ? 0 : baseShipping
  const total        = subtotal - discount + shipping

  function applyCoupon() {
    const code = coupon.trim().toUpperCase()
    if (COUPONS[code]) {
      setApplied(code)
      setCoupon("")
      setCouponErr("")
    } else {
      setCouponErr("Invalid coupon code. Try SPORT10, GEAR20, or FREESHIP.")
    }
  }

  async function handlePlace() {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1200))
    const num = "SPG-" + Math.floor(100000 + Math.random() * 900000)
    onPlace(num)
  }

  return (
    <div className="space-y-5">

      {/* Order summary */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">Order Summary</p>
        <div className="flex gap-4">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white line-clamp-2">{product.name}</p>
            <div className="flex flex-wrap gap-x-3 mt-1">
              {size  && <span className="text-xs text-white/40">Size: {size}</span>}
              {color && <span className="text-xs text-white/40">Color: {color}</span>}
              <span className="text-xs text-white/40">Qty: {quantity}</span>
            </div>
          </div>
          <p className="font-bold text-white flex-shrink-0">${subtotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Coupon */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Coupon Code</p>
        {applied ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">{applied}</span>
              <span className="text-sm text-white/50">— {couponData?.label}</span>
            </div>
            <button onClick={() => setApplied(null)} className="text-white/30 hover:text-red-400 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code (e.g. SPORT10)"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponErr("") }}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                className={`${inputCls} flex-1`}
              />
              <Button
                onClick={applyCoupon}
                disabled={!coupon.trim()}
                className="h-11 px-5 bg-white/8 hover:bg-white/14 border border-white/10 text-white font-semibold"
              >
                Apply
              </Button>
            </div>
            {couponError && (
              <p className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {couponError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/55">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1.5 text-green-400"><Tag className="h-3.5 w-3.5" />Discount</span>
            <span className="text-green-400 font-medium">−${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-white/55">Shipping ({deliveryOpt.label})</span>
          <span className={shipping === 0 ? "text-green-400 font-medium" : "text-white"}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="h-px bg-white/8" />
        <div className="flex justify-between items-center">
          <span className="font-bold text-white text-base">Total</span>
          <span className="text-2xl font-black text-orange-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Payment Method</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((m) => {
            const Icon     = m.icon
            const isActive = payMethod === m.id
            return (
              <button
                key={m.id}
                onClick={() => setPayMethod(m.id)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all
                  ${isActive ? "border-orange-500 bg-orange-500/10" : "border-white/8 bg-white/3 hover:border-white/20"}`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isActive ? "bg-orange-500/20 text-orange-400" : "bg-white/6 text-white/35"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/65"}`}>{m.label}</p>
                  <p className="text-xs text-white/35 mt-0.5">{m.note}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="h-12 px-5 text-white/50 hover:text-white hover:bg-white/5">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          onClick={handlePlace}
          disabled={placing}
          className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base"
        >
          {placing ? (
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Placing Order…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Place Order · ${total.toFixed(2)}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Step 4 — Success ─────────────────────────────────────────────────────────

function StepSuccess({ orderNum }: { orderNum: string }) {
  return (
    <div className="flex flex-col items-center text-center py-4 space-y-6">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-400" />
        </div>
        <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
          <Package className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
          Order Placed!
        </h2>
        <p className="text-white/55 leading-6">
          Thank you for shopping with SportGear Pro. We will confirm your order shortly via Telegram or phone.
        </p>
      </div>

      <div className="w-full rounded-xl border border-white/8 bg-white/3 p-5 space-y-3 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Order Number</span>
          <span className="font-bold text-orange-400">{orderNum}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Status</span>
          <span className="font-semibold text-green-400">Confirmed</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Estimated Delivery</span>
          <span className="font-semibold text-white">2 – 5 business days</span>
        </div>
      </div>

      <div className="flex items-start gap-3 w-full rounded-xl bg-blue-500/8 border border-blue-500/15 px-4 py-3.5 text-left">
        <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/60">
          Our team will contact you via <span className="text-white font-semibold">Telegram or WhatsApp</span> within
          30 minutes to confirm your order and delivery details.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
        <Link href="/shop" className="flex-1">
          <Button variant="outline" className="w-full h-11 border-white/15 text-white/70 hover:text-white hover:bg-white/5">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            View My Orders
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ─── Main client component ────────────────────────────────────────────────────

const STEP_TITLES: Record<Step, string> = {
  1: "Delivery Address",
  2: "Choose Delivery",
  3: "Checkout",
  4: "Order Confirmed",
}

export function BuyNowClient({
  product,
  quantity,
  size,
  color,
}: {
  product: Product
  quantity: number
  size?: string
  color?: string
}) {
  const router = useRouter()
  const [step,       setStep]    = useState<Step>(1)
  const [address,    setAddress] = useState<AddressForm>({ name: "", phone: "", street: "", city: "", province: "", note: "" })
  const [deliveryId, setDelivery] = useState("standard")
  const [orderNum,   setOrderNum] = useState("")

  return (
    <div className="min-h-screen bg-[#050A14]">
      {/* Page header bar */}
      <div className="border-b border-white/8 bg-[#0D1525] px-4 py-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
          {step < 4 ? (
            <button
              onClick={() => step === 1 ? router.back() : setStep((s) => (s - 1) as Step)}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 1 ? "Back to Product" : "Back"}
            </button>
          ) : <div />}
          <div className="text-right">
            <p className="text-xs text-white/35 font-medium uppercase tracking-wider">Buy Now</p>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {STEP_TITLES[step]}
            </p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="border-b border-white/8 bg-[#0D1525] px-4 py-5">
        <div className="mx-auto max-w-2xl">
          <StepIndicator current={step} />
        </div>
      </div>

      {/* Product mini-card (steps 1–3) */}
      {step < 4 && (
        <div className="border-b border-white/8 bg-[#0D1525]/50 px-4 py-4">
          <div className="mx-auto max-w-2xl flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white line-clamp-1">{product.name}</p>
              <div className="flex flex-wrap gap-x-3 mt-0.5">
                {size  && <span className="text-xs text-white/40">Size: {size}</span>}
                {color && <span className="text-xs text-white/40">Color: {color}</span>}
                <span className="text-xs text-white/40">Qty: {quantity}</span>
              </div>
            </div>
            <p className="text-sm font-bold text-orange-400 flex-shrink-0">
              ${(product.price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Step content */}
      <main className="px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-white/8 bg-[#0D1525]/70 p-6 md:p-8">
            {step === 1 && (
              <StepAddress
                form={address}
                onChange={setAddress}
                onNext={() => setStep(2)}
                onBack={() => router.back()}
              />
            )}
            {step === 2 && (
              <StepDelivery
                province={address.province}
                selected={deliveryId}
                onSelect={setDelivery}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepPayment
                product={product}
                quantity={quantity}
                size={size}
                color={color}
                deliveryId={deliveryId}
                province={address.province}
                onPlace={(num) => { setOrderNum(num); setStep(4) }}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <StepSuccess orderNum={orderNum} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

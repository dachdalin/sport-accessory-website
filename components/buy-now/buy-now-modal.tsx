"use client"

import { useState } from "react"
import Image from "next/image"
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  Tag,
  ChevronRight,
  Zap,
  Banknote,
  Smartphone,
  AlertCircle,
  Package,
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
  {
    id: "standard",
    label: "Standard Delivery",
    days: "2 – 5 business days",
    price: 2.5,
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "express",
    label: "Express Delivery",
    days: "1 – 2 business days",
    price: 5.0,
    icon: <Zap className="h-5 w-5" />,
  },
]

const PAYMENT_METHODS = [
  { id: "cod",  label: "Cash on Delivery",  note: "Pay when you receive",  icon: <Banknote className="h-5 w-5" /> },
  { id: "aba",  label: "ABA Mobile Pay",    note: "Scan QR to pay",        icon: <Smartphone className="h-5 w-5" /> },
  { id: "wing", label: "Wing Money",         note: "Transfer via Wing app", icon: <Smartphone className="h-5 w-5" /> },
  { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard",    icon: <CreditCard className="h-5 w-5" /> },
]

const COUPONS: Record<string, { type: "percent" | "shipping"; value: number; label: string }> = {
  SPORT10:  { type: "percent",  value: 10, label: "10% off your order" },
  GEAR20:   { type: "percent",  value: 20, label: "20% off your order" },
  FREESHIP: { type: "shipping", value: 0,  label: "Free shipping" },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddressForm {
  name: string
  phone: string
  street: string
  city: string
  province: string
  note: string
}

type Step = 1 | 2 | 3 | 4

const STEPS = [
  { n: 1, label: "Address",  icon: <MapPin className="h-4 w-4" /> },
  { n: 2, label: "Delivery", icon: <Truck className="h-4 w-4" /> },
  { n: 3, label: "Payment",  icon: <CreditCard className="h-4 w-4" /> },
  { n: 4, label: "Success",  icon: <CheckCircle className="h-4 w-4" /> },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0 px-4">
      {STEPS.map((s, i) => {
        const done    = current > s.n
        const active  = current === s.n
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${done   ? "bg-green-500 text-white"
                  : active ? "bg-orange-500 text-white ring-4 ring-orange-500/25"
                           : "bg-white/8 text-white/30 border border-white/10"}`}
              >
                {done ? <CheckCircle className="h-4 w-4" /> : s.n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-orange-400" : done ? "text-green-400" : "text-white/30"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 sm:w-12 mx-1 mb-5 transition-colors ${done ? "bg-green-500" : "bg-white/10"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</Label>
      {children}
    </div>
  )
}

const inputCls = "h-10 border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepAddress({
  form,
  onChange,
  onNext,
}: {
  form: AddressForm
  onChange: (f: AddressForm) => void
  onNext: () => void
}) {
  const set = (key: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange({ ...form, [key]: e.target.value })

  const valid = form.name && form.phone && form.street && form.city && form.province

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Full Name">
          <Input placeholder="Dara Chan" value={form.name} onChange={set("name")} className={inputCls} />
        </FieldRow>
        <FieldRow label="Phone Number">
          <Input placeholder="+855 12 345 678" value={form.phone} onChange={set("phone")} className={inputCls} />
        </FieldRow>
      </div>
      <FieldRow label="Street Address">
        <Input placeholder="Street 271, House 45A" value={form.street} onChange={set("street")} className={inputCls} />
      </FieldRow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="City / District">
          <Input placeholder="Chamkarmon" value={form.city} onChange={set("city")} className={inputCls} />
        </FieldRow>
        <FieldRow label="Province">
          <select
            value={form.province}
            onChange={set("province")}
            className="w-full h-10 rounded-md border border-white/10 bg-white/5 text-white text-sm px-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25"
          >
            <option value="" className="bg-[#0D1525]">Select province…</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p} className="bg-[#0D1525]">{p}</option>
            ))}
          </select>
        </FieldRow>
      </div>
      <FieldRow label="Delivery Note (Optional)">
        <Input placeholder="Near the blue gate…" value={form.note} onChange={set("note")} className={inputCls} />
      </FieldRow>
      <Button
        onClick={onNext}
        disabled={!valid}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-11 font-semibold gap-2 mt-2"
      >
        Continue to Delivery
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function StepDelivery({
  province,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  province: string
  selected: string
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const isFreeShipping = province === "Phnom Penh"

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50">
        Delivering to <span className="font-semibold text-white">{province}</span>
      </p>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((opt) => {
          const price = isFreeShipping && opt.id === "standard" ? 0 : opt.price
          const isActive = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all
                ${isActive
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-white/8 bg-white/3 hover:border-white/20"}`}
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-orange-500/20 text-orange-400" : "bg-white/6 text-white/40"}`}>
                {opt.icon}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-white/70"}`}>{opt.label}</p>
                <p className="text-xs text-white/40 mt-0.5">{opt.days}</p>
              </div>
              <div className="text-right flex-shrink-0">
                {price === 0
                  ? <span className="text-sm font-bold text-green-400">FREE</span>
                  : <span className={`text-sm font-bold ${isActive ? "text-orange-400" : "text-white/60"}`}>${price.toFixed(2)}</span>}
              </div>
              <div className={`h-4 w-4 rounded-full border-2 flex-shrink-0 ${isActive ? "border-orange-500 bg-orange-500" : "border-white/20"}`}>
                {isActive && <div className="h-full w-full rounded-full bg-white scale-50" />}
              </div>
            </button>
          )
        })}
      </div>

      {isFreeShipping && (
        <div className="flex items-start gap-2 rounded-xl bg-green-500/8 border border-green-500/15 px-3 py-2.5">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60">Standard delivery is <span className="text-green-400 font-semibold">FREE</span> for Phnom Penh orders.</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="flex-1 text-white/50 hover:text-white hover:bg-white/5 h-11">
          Back
        </Button>
        <Button onClick={onNext} disabled={!selected} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-11 font-semibold gap-2">
          Continue to Payment
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function StepPayment({
  product,
  quantity,
  size,
  color,
  deliveryId,
  province,
  onPlace,
  onBack,
}: {
  product: Product
  quantity: number
  size?: string
  color?: string
  deliveryId: string
  province: string
  onPlace: (orderNum: string) => void
  onBack: () => void
}) {
  const [coupon, setCoupon]       = useState("")
  const [appliedCode, setApplied] = useState<string | null>(null)
  const [couponError, setCouponErr] = useState("")
  const [payMethod, setPayMethod] = useState("cod")
  const [placing, setPlacing]     = useState(false)

  const isFreeShipping = province === "Phnom Penh"
  const deliveryOpt    = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!
  const baseShipping   = isFreeShipping && deliveryId === "standard" ? 0 : deliveryOpt.price
  const subtotal       = product.price * quantity

  const couponData    = appliedCode ? COUPONS[appliedCode] : null
  const discount      = couponData?.type === "percent" ? subtotal * (couponData.value / 100) : 0
  const shipping      = couponData?.type === "shipping" ? 0 : baseShipping
  const total         = subtotal - discount + shipping

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

  function removeCoupon() {
    setApplied(null)
    setCouponErr("")
  }

  async function handlePlace() {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1200))
    const orderNum = "SPG-" + Math.floor(100000 + Math.random() * 900000)
    onPlace(orderNum)
  }

  return (
    <div className="space-y-4">
      {/* Order summary */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">Order Summary</p>
        <div className="flex gap-3">
          <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0 border border-white/8">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="56px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white line-clamp-1">{product.name}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
              {size  && <span className="text-xs text-white/40">Size: {size}</span>}
              {color && <span className="text-xs text-white/40">Color: {color}</span>}
              <span className="text-xs text-white/40">Qty: {quantity}</span>
            </div>
          </div>
          <p className="text-sm font-bold text-white flex-shrink-0">${subtotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Coupon */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Coupon Code</p>
        {appliedCode ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">{appliedCode}</span>
              <span className="text-xs text-white/50">— {couponData?.label}</span>
            </div>
            <button onClick={removeCoupon} className="text-white/30 hover:text-red-400 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponErr("") }}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                className={`${inputCls} flex-1`}
              />
              <Button
                onClick={applyCoupon}
                disabled={!coupon.trim()}
                className="bg-white/8 hover:bg-white/14 border border-white/10 text-white text-sm px-4 h-10"
              >
                Apply
              </Button>
            </div>
            {couponError && (
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {couponError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-2.5">
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
        <div className="flex justify-between">
          <span className="font-bold text-white">Total</span>
          <span className="text-lg font-black text-orange-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Payment Method</p>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setPayMethod(m.id)}
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all
                ${payMethod === m.id
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-white/8 bg-white/3 hover:border-white/20"}`}
            >
              <span className={payMethod === m.id ? "text-orange-400" : "text-white/40"}>{m.icon}</span>
              <div>
                <p className={`text-xs font-semibold ${payMethod === m.id ? "text-white" : "text-white/60"}`}>{m.label}</p>
                <p className="text-xs text-white/30 mt-0.5">{m.note}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="text-white/50 hover:text-white hover:bg-white/5 h-11 px-5">
          Back
        </Button>
        <Button
          onClick={handlePlace}
          disabled={placing}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-11 font-semibold"
        >
          {placing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Placing Order…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Place Order · ${total.toFixed(2)}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

function StepSuccess({ orderNum, onClose }: { orderNum: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-6 space-y-5">
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-orange-500 flex items-center justify-center">
          <Package className="h-4 w-4 text-white" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
          Order Placed!
        </h3>
        <p className="text-sm text-white/50 mt-1.5">
          Thank you for your purchase. We will confirm your order shortly via Telegram or phone.
        </p>
      </div>

      <div className="w-full rounded-xl border border-white/8 bg-white/3 p-4 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Order Number</span>
          <span className="font-bold text-orange-400">{orderNum}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Status</span>
          <span className="text-green-400 font-semibold">Confirmed</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Estimated Delivery</span>
          <span className="font-semibold text-white">2 – 5 business days</span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 w-full rounded-xl bg-blue-500/8 border border-blue-500/15 px-4 py-3 text-left">
        <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/55">
          Our team will contact you via <span className="text-white font-medium">Telegram or WhatsApp</span> within 30 minutes to confirm your order and delivery details.
        </p>
      </div>

      <Button onClick={onClose} className="w-full bg-orange-500 hover:bg-orange-600 text-white h-11 font-semibold">
        Continue Shopping
      </Button>
    </div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface BuyNowModalProps {
  product: Product
  quantity: number
  size?: string
  color?: string
  onClose: () => void
}

const STEP_TITLES: Record<Step, string> = {
  1: "Delivery Address",
  2: "Choose Delivery",
  3: "Checkout",
  4: "Order Placed",
}

export function BuyNowModal({ product, quantity, size, color, onClose }: BuyNowModalProps) {
  const [step, setStep]       = useState<Step>(1)
  const [address, setAddress] = useState<AddressForm>({ name: "", phone: "", street: "", city: "", province: "", note: "" })
  const [deliveryId, setDeliveryId] = useState("standard")
  const [orderNum, setOrderNum]     = useState("")

  function handleSuccess(num: string) {
    setOrderNum(num)
    setStep(4)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0D1525] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/8 flex-shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/35">Buy Now</p>
            <h2 className="text-base font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-heading)" }}>
              {STEP_TITLES[step]}
            </h2>
          </div>
          {step !== 4 && (
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Step indicator */}
        <div className="px-5 py-4 border-b border-white/8 flex-shrink-0">
          <StepIndicator current={step} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === 1 && (
            <StepAddress form={address} onChange={setAddress} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepDelivery
              province={address.province}
              selected={deliveryId}
              onSelect={setDeliveryId}
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
              onPlace={handleSuccess}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepSuccess orderNum={orderNum} onClose={onClose} />
          )}
        </div>

      </div>
    </div>
  )
}

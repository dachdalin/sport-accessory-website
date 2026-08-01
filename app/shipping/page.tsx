import {
  Truck,
  MapPin,
  Clock,
  Package,
  CreditCard,
  Phone,
  CheckCircle,
  AlertCircle,
  Banknote,
  RefreshCcw,
  Zap,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CartProvider } from "@/lib/cart-context"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0D1525]/70 p-6 md:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/6 last:border-0">
      <span className="text-sm text-white/60">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-green-400" : "text-white"}`}>{value}</span>
    </div>
  )
}

function Badge({ children, color = "orange" }: { children: React.ReactNode; color?: "orange" | "green" | "blue" | "amber" }) {
  const cls = {
    orange: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    green:  "bg-green-500/15 text-green-400 border-green-500/20",
    blue:   "bg-blue-500/15 text-blue-400 border-blue-500/20",
    amber:  "bg-amber-500/15 text-amber-400 border-amber-500/20",
  }[color]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {children}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShippingPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#050A14]">
        <Header />

        <main className="flex-1">

          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <section className="relative border-b border-white/10 bg-[#0D1525] px-4 py-16 text-center md:py-24 overflow-hidden">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
            </div>

            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-lg shadow-orange-500/25">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
                Shipping Policy
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/55">
                Fast, reliable delivery across Cambodia — from Phnom Penh to every province.
                Learn about our delivery zones, fees, timelines, and support options.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge color="green">Free shipping over $30</Badge>
                <Badge color="blue">Cash on Delivery available</Badge>
                <Badge color="orange">1–5 business days</Badge>
              </div>
            </div>
          </section>

          {/* ── Content ───────────────────────────────────────────────────────── */}
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-6">

              {/* Shipping Fees */}
              <SectionCard icon={<CreditCard className="h-5 w-5 text-orange-400" />} title="Shipping Fees">
                <div className="rounded-xl border border-white/8 overflow-hidden">
                  <div className="grid grid-cols-3 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                    <span>Order Value</span>
                    <span className="text-center">Phnom Penh</span>
                    <span className="text-right">Provinces</span>
                  </div>
                  {[
                    { range: "Under $15",   capital: "$2.50", province: "$4.00" },
                    { range: "$15 – $29.99",capital: "$1.50", province: "$2.50" },
                    { range: "$30 and above",capital: "FREE", province: "FREE" },
                  ].map(({ range, capital, province }) => (
                    <div key={range} className="grid grid-cols-3 border-t border-white/6 px-4 py-3.5">
                      <span className="text-sm text-white/70">{range}</span>
                      <span className={`text-sm font-semibold text-center ${capital === "FREE" ? "text-green-400" : "text-white"}`}>
                        {capital}
                      </span>
                      <span className={`text-sm font-semibold text-right ${province === "FREE" ? "text-green-400" : "text-white"}`}>
                        {province}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/45">
                  Shipping fees are calculated at checkout based on your delivery address and order total.
                  Promotional free-shipping codes may apply during special campaigns.
                </p>
              </SectionCard>

              {/* Delivery Time */}
              <SectionCard icon={<Clock className="h-5 w-5 text-orange-400" />} title="Delivery Time">
                <div className="space-y-0">
                  <Row label="Phnom Penh (standard)"     value="1 – 2 business days" />
                  <Row label="Phnom Penh (express)"      value="Same day or next day"  highlight />
                  <Row label="Siem Reap / Battambang"    value="2 – 3 business days" />
                  <Row label="Sihanoukville / Kampot"    value="2 – 3 business days" />
                  <Row label="Kampong Cham / Takéo"      value="2 – 4 business days" />
                  <Row label="Remote provinces"           value="3 – 5 business days" />
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-amber-500/8 border border-amber-500/15 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Delivery times are estimates and may be affected by public holidays, weather conditions,
                    or high-demand periods such as Khmer New Year and Pchum Ben.
                  </p>
                </div>
              </SectionCard>

              {/* Order Processing */}
              <SectionCard icon={<Package className="h-5 w-5 text-orange-400" />} title="Order Processing">
                <div className="space-y-0">
                  <Row label="Order cut-off time"    value="3:00 PM (GMT+7)" />
                  <Row label="Processing time"       value="Same business day" />
                  <Row label="Business days"         value="Monday – Saturday" />
                  <Row label="Sunday & public holidays" value="No dispatch" />
                </div>
                <p className="mt-5 text-sm text-white/50 leading-6">
                  Orders placed before 3:00 PM (Cambodia Time) on business days are dispatched the same day.
                  Orders placed after 3:00 PM or on non-business days are dispatched the following business day.
                  You will receive a confirmation message via Telegram or email once your order is dispatched.
                </p>
              </SectionCard>

              {/* Delivery Coverage */}
              <SectionCard icon={<MapPin className="h-5 w-5 text-orange-400" />} title="Delivery Coverage">
                <p className="text-sm text-white/55 mb-4 leading-6">
                  We deliver to all 25 provinces and capital across Cambodia. Coverage includes:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Phnom Penh",
                    "Siem Reap",
                    "Battambang",
                    "Sihanoukville",
                    "Kampong Cham",
                    "Kampot",
                    "Takéo",
                    "Kandal",
                    "Prey Veng",
                    "Svay Rieng",
                    "Kampong Thom",
                    "Pursat",
                    "Kratie",
                    "Stung Treng",
                    "Ratanakiri",
                    "Mondulkiri",
                    "Oddar Meanchey",
                    "Banteay Meanchey",
                    "Koh Kong",
                    "Preah Vihear",
                    "Kampong Speu",
                    "Kampong Chhnang",
                    "Kep",
                    "Pailin",
                    "Preah Sihanouk",
                  ].map((province) => (
                    <div key={province} className="flex items-center gap-2 text-sm text-white/65">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                      {province}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Deliveries to remote districts or rural villages may require collection from the nearest
                    courier hub. Our team will contact you if this applies to your address.
                  </p>
                </div>
              </SectionCard>

              {/* Delivery Partners */}
              <SectionCard icon={<Truck className="h-5 w-5 text-orange-400" />} title="Delivery Partners">
                <p className="text-sm text-white/55 mb-5 leading-6">
                  We work with trusted logistics partners operating across Cambodia to ensure your order arrives safely.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Kerry Express Cambodia",  note: "Nationwide — Phnom Penh & provinces",    badge: "Primary" },
                    { name: "J&T Express Cambodia",    note: "Nationwide — fast urban delivery",        badge: "Express" },
                    { name: "Ninja Van Cambodia",       note: "Provinces & cross-border",               badge: "Provinces" },
                    { name: "Cambodia Post",            note: "Remote districts & rural areas",          badge: "Rural" },
                  ].map(({ name, note, badge }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{name}</p>
                        <p className="text-xs text-white/45 mt-0.5">{note}</p>
                      </div>
                      <Badge color="blue">{badge}</Badge>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Payment & Cash on Delivery */}
              <SectionCard icon={<Banknote className="h-5 w-5 text-orange-400" />} title="Payment & Cash on Delivery (COD)">
                <p className="text-sm text-white/55 mb-5 leading-6">
                  We support multiple payment methods to make shopping convenient for customers across Cambodia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { method: "Cash on Delivery (COD)", detail: "Pay in cash when your order arrives" },
                    { method: "ABA Mobile",              detail: "Instant transfer via ABA Pay" },
                    { method: "Wing Money",              detail: "Mobile wallet & agent network" },
                    { method: "ACLEDA Bank",             detail: "Online banking & ACLEDA Unity" },
                    { method: "Credit / Debit Card",     detail: "Visa, Mastercard via secure gateway" },
                    { method: "Pi Pay",                  detail: "QR payment across merchants" },
                  ].map(({ method, detail }) => (
                    <div key={method} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                      <p className="text-sm font-semibold text-white">{method}</p>
                      <p className="text-xs text-white/45 mt-0.5">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-green-500/8 border border-green-500/15 px-4 py-3">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Cash on Delivery is available for all orders up to <span className="text-white font-medium">$200</span>.
                    Our delivery agent will collect payment when handing over your package.
                    Please prepare the exact amount where possible.
                  </p>
                </div>
              </SectionCard>

              {/* Order Tracking */}
              <SectionCard icon={<Zap className="h-5 w-5 text-orange-400" />} title="Order Tracking">
                <p className="text-sm text-white/55 leading-6 mb-4">
                  Once your order is dispatched you will receive a tracking number via Telegram message or email.
                  Use the tracking number on the courier's website or contact our support team for a live update.
                </p>
                <div className="space-y-0">
                  <Row label="Confirmation"   value="Immediately after order" />
                  <Row label="Dispatch notice" value="When courier picks up" />
                  <Row label="Tracking update" value="Via Telegram / Email" />
                  <Row label="Delivery notice" value="Before arrival call / message" />
                </div>
              </SectionCard>

              {/* Failed Delivery & Returns */}
              <SectionCard icon={<RefreshCcw className="h-5 w-5 text-orange-400" />} title="Failed Delivery & Returns">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  If a delivery attempt is unsuccessful, the courier will leave a notice or contact you directly.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: "1st attempt fails",
                      action: "Courier contacts you to reschedule — no extra charge.",
                    },
                    {
                      step: "2nd attempt fails",
                      action: "Package returns to our warehouse. We will reach out to confirm re-delivery.",
                    },
                    {
                      step: "Re-delivery requested",
                      action: "A new shipping fee applies for re-dispatch after a failed 2nd attempt.",
                    },
                    {
                      step: "Order refused on delivery",
                      action: "COD orders refused without valid reason may be subject to a handling fee.",
                    },
                  ].map(({ step, action }) => (
                    <div key={step} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{step}</p>
                        <p className="text-xs text-white/50 mt-0.5">{action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Contact Support */}
              <SectionCard icon={<Phone className="h-5 w-5 text-orange-400" />} title="Shipping Support">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  Have a question about your delivery? Our Cambodia-based support team is here to help.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Telegram",         value: "@SportGearPro_KH",   note: "Fastest response" },
                    { label: "Phone / WhatsApp",  value: "+855 12 345 678",   note: "Mon – Sat, 8am – 6pm" },
                    { label: "Email",             value: "support@sportgear.kh", note: "Reply within 24 hours" },
                    { label: "Facebook Page",     value: "SportGear Pro KH",  note: "Messages & comments" },
                  ].map(({ label, value, note }) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-orange-400">{value}</p>
                      <p className="text-xs text-white/40 mt-0.5">{note}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Last updated */}
              <p className="text-center text-xs text-white/25 pt-2">
                Shipping policy last updated: August 2026 · Applies to orders within the Kingdom of Cambodia 🇰🇭
              </p>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

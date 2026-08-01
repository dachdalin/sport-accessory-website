import {
  RefreshCcw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Banknote,
  Phone,
  AlertCircle,
  ArrowLeftRight,
  ShieldCheck,
  FileText,
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

function Badge({
  children,
  color = "orange",
}: {
  children: React.ReactNode
  color?: "orange" | "green" | "blue" | "red" | "amber"
}) {
  const cls = {
    orange: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    green:  "bg-green-500/15  text-green-400  border-green-500/20",
    blue:   "bg-blue-500/15   text-blue-400   border-blue-500/20",
    red:    "bg-red-500/15    text-red-400     border-red-500/20",
    amber:  "bg-amber-500/15  text-amber-400  border-amber-500/20",
  }[color]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {children}
    </span>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="h-8 w-8 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-black flex items-center justify-center flex-shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/50 mt-0.5 leading-5">{description}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReturnsPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#050A14]">
        <Header />

        <main className="flex-1">

          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <section className="relative border-b border-white/10 bg-[#0D1525] px-4 py-16 text-center md:py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
            </div>

            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-lg shadow-orange-500/25">
                <RefreshCcw className="h-8 w-8 text-white" />
              </div>
              <h1
                className="font-heading text-3xl font-bold text-white md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Returns &amp; Refunds
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/55">
                Not happy with your purchase? We make returns simple for customers across Cambodia.
                Read our policy below to understand your options.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge color="green">14-day return window</Badge>
                <Badge color="blue">Free returns in Phnom Penh</Badge>
                <Badge color="orange">Refund within 3–5 days</Badge>
              </div>
            </div>
          </section>

          {/* ── Content ───────────────────────────────────────────────────────── */}
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-6">

              {/* At a glance */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Return Window",    value: "14 days",   sub: "from delivery date" },
                  { label: "Exchange Window",  value: "14 days",   sub: "same policy" },
                  { label: "Refund Timeline",  value: "3–5 days",  sub: "after inspection" },
                  { label: "Return Shipping",  value: "Free",      sub: "Phnom Penh only" },
                ].map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/8 bg-[#0D1525]/70 px-4 py-4 text-center"
                  >
                    <p className="text-xl font-black text-orange-400">{value}</p>
                    <p className="text-xs font-semibold text-white mt-0.5">{label}</p>
                    <p className="text-xs text-white/35 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Eligible Items */}
              <SectionCard icon={<CheckCircle className="h-5 w-5 text-orange-400" />} title="Eligible for Return">
                <p className="text-sm text-white/55 leading-6 mb-4">
                  We accept returns on items that meet all of the following conditions:
                </p>
                <div className="space-y-2.5">
                  {[
                    "Returned within 14 days of delivery",
                    "Item is unused, unworn, and in its original condition",
                    "All original tags, labels, and packaging are intact",
                    "Item is free from damage caused by the customer",
                    "Proof of purchase (order number or receipt) is provided",
                    "Item matches what was originally ordered (correct product, SKU, size, color)",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Non-Eligible Items */}
              <SectionCard icon={<XCircle className="h-5 w-5 text-orange-400" />} title="Non-Returnable Items">
                <p className="text-sm text-white/55 leading-6 mb-4">
                  The following items cannot be returned or exchanged:
                </p>
                <div className="space-y-2.5">
                  {[
                    "Items returned after the 14-day window",
                    "Items that have been used, washed, or show signs of wear",
                    "Underwear, socks, and inner garments (hygiene reasons)",
                    "Customised or personalised products",
                    "Items purchased during final sale or clearance promotions",
                    "Gift cards and store credits",
                    "Items damaged due to misuse, accidents, or improper care",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-amber-500/8 border border-amber-500/15 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    If you receive a defective or wrong item, it is eligible for a full return or free exchange
                    regardless of the above conditions. Please contact us within <span className="text-white font-medium">48 hours</span> of delivery.
                  </p>
                </div>
              </SectionCard>

              {/* How to Return */}
              <SectionCard icon={<FileText className="h-5 w-5 text-orange-400" />} title="How to Start a Return">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  Follow these steps to initiate a return or exchange:
                </p>
                <div className="space-y-5">
                  <Step
                    number={1}
                    title="Contact our team"
                    description="Message us on Telegram (@SportGearPro_KH), WhatsApp (+855 12 345 678), or email support@sportgear.kh with your order number and reason for return."
                  />
                  <Step
                    number={2}
                    title="Receive return approval"
                    description="Our team will review your request within 1 business day and send you a Return Authorisation (RA) number along with return instructions."
                  />
                  <Step
                    number={3}
                    title="Pack and send the item"
                    description="Repack the item securely in its original packaging. Write your RA number on the outside of the parcel. Drop it off at your nearest Kerry Express, J&T, or Ninja Van agent."
                  />
                  <Step
                    number={4}
                    title="Item inspection"
                    description="We inspect all returned items within 1–2 business days of receipt at our warehouse to confirm eligibility."
                  />
                  <Step
                    number={5}
                    title="Refund or exchange issued"
                    description="Once approved, your refund is processed within 3–5 business days, or your replacement item is dispatched the next business day."
                  />
                </div>
              </SectionCard>

              {/* Return Shipping */}
              <SectionCard icon={<Package className="h-5 w-5 text-orange-400" />} title="Return Shipping Costs">
                <div className="space-y-3">
                  {[
                    {
                      scenario: "Defective or wrong item received",
                      cost:     "Free — we cover the full return cost",
                      color:    "green" as const,
                    },
                    {
                      scenario: "Phnom Penh — change of mind",
                      cost:     "Free — we arrange pickup",
                      color:    "green" as const,
                    },
                    {
                      scenario: "Provinces — change of mind",
                      cost:     "Customer bears return shipping cost",
                      color:    "amber" as const,
                    },
                    {
                      scenario: "COD order returned",
                      cost:     "Refund issued via ABA/Wing after inspection",
                      color:    "blue" as const,
                    },
                  ].map(({ scenario, cost, color }) => (
                    <div
                      key={scenario}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
                    >
                      <span className="text-sm text-white/65">{scenario}</span>
                      <Badge color={color}>{cost}</Badge>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/45 leading-6">
                  For province returns, we recommend using Kerry Express or J&T Express for reliable tracking.
                  Please keep your courier receipt until the refund is confirmed.
                </p>
              </SectionCard>

              {/* Refund Methods */}
              <SectionCard icon={<Banknote className="h-5 w-5 text-orange-400" />} title="Refund Methods">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  Refunds are returned using the same method as your original payment where possible.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { method: "ABA Mobile Pay",       timeline: "1 – 2 business days",  note: "Instant once processed" },
                    { method: "Wing Money",            timeline: "1 – 2 business days",  note: "Via Wing agent or app" },
                    { method: "ACLEDA Bank",           timeline: "2 – 3 business days",  note: "Bank transfer" },
                    { method: "Credit / Debit Card",   timeline: "5 – 10 business days", note: "Depends on your bank" },
                    { method: "COD (Cash on Delivery)", timeline: "3 – 5 business days", note: "Via ABA or Wing transfer" },
                    { method: "Store Credit",          timeline: "Same day",             note: "Applied to your account" },
                  ].map(({ method, timeline, note }) => (
                    <div key={method} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                      <p className="text-sm font-semibold text-white">{method}</p>
                      <p className="text-xs text-orange-400 font-medium mt-0.5">{timeline}</p>
                      <p className="text-xs text-white/40 mt-0.5">{note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Original shipping fees are non-refundable unless the return is due to our error
                    (wrong item, defective product, or failed delivery on our part).
                  </p>
                </div>
              </SectionCard>

              {/* Exchanges */}
              <SectionCard icon={<ArrowLeftRight className="h-5 w-5 text-orange-400" />} title="Exchanges">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  Want a different size or colour? We make exchanges easy within the 14-day window.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: "Size or colour exchange",
                      detail:
                        "Contact us with your order number and the new size/colour you want. Subject to stock availability.",
                    },
                    {
                      title: "Same item — defective",
                      detail:
                        "We replace defective items at no cost. Free return pickup + free re-dispatch.",
                    },
                    {
                      title: "Different product exchange",
                      detail:
                        "Return the original item for a refund and place a new order for the item you want.",
                    },
                  ].map(({ title, detail }) => (
                    <div
                      key={title}
                      className="rounded-xl border border-white/8 bg-white/3 px-4 py-3.5"
                    >
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-white/50 mt-1 leading-5">{detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-green-500/8 border border-green-500/15 px-4 py-3">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Exchange items are dispatched once the original item is received and passes inspection.
                    Phnom Penh exchanges are typically completed within <span className="text-white font-medium">3 business days</span>.
                  </p>
                </div>
              </SectionCard>

              {/* Damaged or Wrong Items */}
              <SectionCard icon={<ShieldCheck className="h-5 w-5 text-orange-400" />} title="Damaged or Wrong Items">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  If your order arrives damaged or is not what you ordered, you are fully protected.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Document the issue",
                      detail: "Take clear photos or a short video of the damaged/wrong item and the packaging before opening it further.",
                    },
                    {
                      step: "2",
                      title: "Contact us within 48 hours",
                      detail: "Send the photos to our Telegram or WhatsApp along with your order number. Reports made after 48 hours may not be accepted.",
                    },
                    {
                      step: "3",
                      title: "We resolve it quickly",
                      detail: "We will offer a free replacement, full refund, or store credit — your choice. We cover all return and re-dispatch costs.",
                    },
                  ].map(({ step, title, detail }) => (
                    <div key={step} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-sm font-black flex items-center justify-center flex-shrink-0">
                        {step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{title}</p>
                        <p className="text-xs text-white/50 mt-0.5 leading-5">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Return Timeline */}
              <SectionCard icon={<Clock className="h-5 w-5 text-orange-400" />} title="Full Return Timeline">
                <div className="space-y-0">
                  {[
                    { event: "Submit return request",              time: "Day 0" },
                    { event: "Approval confirmation from us",      time: "Within 1 business day" },
                    { event: "Ship item back to us",               time: "Day 1 – 3 (customer action)" },
                    { event: "Item received at warehouse",         time: "Depends on location" },
                    { event: "Inspection completed",              time: "1 – 2 business days" },
                    { event: "Refund / exchange processed",        time: "3 – 5 business days" },
                    { event: "Refund reflects in your account",    time: "Depends on payment method" },
                  ].map(({ event, time }) => (
                    <div
                      key={event}
                      className="flex items-center justify-between gap-4 py-3 border-b border-white/6 last:border-0"
                    >
                      <span className="text-sm text-white/60">{event}</span>
                      <span className="text-sm font-semibold text-white text-right">{time}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Contact */}
              <SectionCard icon={<Phone className="h-5 w-5 text-orange-400" />} title="Returns Support">
                <p className="text-sm text-white/55 leading-6 mb-5">
                  Our Cambodia-based support team handles all return and refund requests.
                  We aim to respond within 2 hours during business hours.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Telegram",          value: "@SportGearPro_KH",     note: "Fastest response" },
                    { label: "Phone / WhatsApp",  value: "+855 12 345 678",      note: "Mon – Sat, 8am – 6pm" },
                    { label: "Email",             value: "returns@sportgear.kh", note: "Reply within 24 hours" },
                    { label: "Facebook Page",     value: "SportGear Pro KH",     note: "Messages & comments" },
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
                Returns policy last updated: August 2026 · Applies to orders within the Kingdom of Cambodia 🇰🇭
              </p>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

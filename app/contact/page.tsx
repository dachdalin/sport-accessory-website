import { Mail, Phone, MapPin, Clock, MessageCircle, Facebook, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CartProvider } from "@/lib/cart-context"

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHANNELS = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    label: "Telegram",
    value: "@SportGearPro_KH",
    note: "Fastest response — usually within 30 minutes",
    href: "https://t.me/SportGearPro_KH",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/20",
    badge: "Recommended",
    badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Phone / WhatsApp",
    value: "+855 12 345 678",
    note: "Mon – Sat, 8:00 AM – 6:00 PM (GMT+7)",
    href: "https://wa.me/85512345678",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/15",
    border: "border-green-500/20",
    badge: null,
    badgeColor: "",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "support@sportgear.kh",
    note: "We reply within 24 hours on business days",
    href: "mailto:support@sportgear.kh",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/15",
    border: "border-orange-500/20",
    badge: null,
    badgeColor: "",
  },
  {
    icon: <Facebook className="h-6 w-6" />,
    label: "Facebook Page",
    value: "SportGear Pro KH",
    note: "Follow us for promotions and new arrivals",
    href: "https://facebook.com/SportGearProKH",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/15",
    border: "border-indigo-500/20",
    badge: null,
    badgeColor: "",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1">

          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <section className="relative border-b border-border bg-card px-4 py-16 text-center md:py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
            </div>
            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-lg shadow-orange-500/25">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1
                className="font-heading text-3xl font-bold text-foreground md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact Us
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                We are based in Phnom Penh, Cambodia. Reach us on any channel below —
                our team speaks both Khmer and English.
              </p>
            </div>
          </section>

          {/* ── Content ───────────────────────────────────────────────────────── */}
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-10">

              {/* Contact Channels */}
              <div>
                <h2
                  className="text-base font-semibold uppercase tracking-widest text-muted-foreground mb-5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Get in Touch
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CHANNELS.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card/70 p-5 hover:border-orange-500/30 transition-all duration-200 hover:bg-card"
                    >
                      <div className={`h-12 w-12 rounded-xl ${ch.bg} border ${ch.border} flex items-center justify-center flex-shrink-0 ${ch.color}`}>
                        {ch.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{ch.label}</p>
                          {ch.badge && (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ch.badgeColor}`}>
                              {ch.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-base font-bold mt-0.5 ${ch.color} group-hover:underline underline-offset-2 truncate`}>
                          {ch.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 leading-5">{ch.note}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-muted-foreground flex-shrink-0 mt-1 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    Business Hours
                  </h2>
                </div>
                <div className="space-y-0">
                  {[
                    { day: "Monday – Friday",  hours: "8:00 AM – 6:00 PM" },
                    { day: "Saturday",          hours: "8:00 AM – 12:00 PM" },
                    { day: "Sunday",            hours: "Closed" },
                    { day: "Public Holidays",   hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div
                      key={day}
                      className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">{day}</span>
                      <span className={`text-sm font-semibold ${hours === "Closed" ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-5">
                  All times are in Cambodia Standard Time (GMT+7). Telegram messages sent outside business
                  hours will be replied to the next business day.
                </p>
              </div>

              {/* Location + Map */}
              <div className="rounded-2xl border border-border bg-card/70 overflow-hidden">
                {/* Address header */}
                <div className="flex items-start gap-4 p-6">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                      Our Location
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">SportGear Pro KH Showroom</p>
                    <p className="text-sm text-muted-foreground">Street 271, Sangkat Toul Tumpung Ti Muoy</p>
                    <p className="text-sm text-muted-foreground">Khan Chamkarmon, Phnom Penh, Cambodia</p>
                    <a
                      href="https://maps.google.com/?q=Phnom+Penh+Cambodia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                {/* Map embed */}
                <div className="relative h-72 md:h-96 w-full border-t border-border">
                  <iframe
                    title="SportGear Pro KH location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125184.84702685!2d104.82000!3d11.56245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    className="dark:invert-[.9] dark:hue-rotate-180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* FAQ link */}
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    Have a common question?
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Check our FAQ for instant answers about orders, shipping, and returns.
                  </p>
                </div>
                <a
                  href="/faq"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
                >
                  View FAQ
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

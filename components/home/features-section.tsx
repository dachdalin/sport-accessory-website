import { CheckCircle, Truck, CreditCard, RotateCcw } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    emoji: "🏆",
    title: "Premium Quality",
    description: "Internationally certified materials tested by professional athletes.",
    color: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Truck,
    emoji: "🚚",
    title: "Nationwide Delivery",
    description: "Fast delivery across Cambodia — Phnom Penh, Siem Reap, Battambang & more.",
    color: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: CreditCard,
    emoji: "💳",
    title: "Local Payments",
    description: "Pay with ABA Bank, ACLEDA, Wing, or scan QR codes. Safe & instant.",
    color: "from-green-500/20 to-green-600/5 border-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: RotateCcw,
    emoji: "↩️",
    title: "Hassle-Free Returns",
    description: "7-day easy return policy. Contact us on Telegram for instant help.",
    color: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    iconColor: "text-purple-400",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#080D18] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Why Us</p>
          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Built for Cambodian Athletes
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm">
            We understand what local athletes need — fast, affordable, and trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative flex flex-col p-6 rounded-2xl bg-gradient-to-br ${feature.color} border backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5`}
            >
              <div className="text-3xl mb-4">{feature.emoji}</div>
              <h3
                className="text-base font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          {[
            { value: "50,000+", label: "Happy customers" },
            { value: "4.9/5", label: "Average rating" },
            { value: "24/7", label: "Telegram support" },
            { value: "48h", label: "Avg. delivery time" },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </span>
              <span className="text-xs text-white/40 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

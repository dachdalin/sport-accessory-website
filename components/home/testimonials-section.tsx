import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dara S.",
    location: "Phnom Penh",
    avatar: "DS",
    rating: 5,
    text: "ទំនិញល្អណាស់! ដឹកដោយ ABA ដូរ QR Code ងាយស្រួលណាស់។ ខ្ញុំណែនាំដល់មិត្តទាំងអស់!",
    textEn: "Amazing products! Paid via ABA QR so easy. I recommend to all friends!",
    sport: "Running 🏃",
    verified: true,
  },
  {
    name: "Vannak K.",
    location: "Siem Reap",
    avatar: "VK",
    rating: 5,
    text: "ទំនិញស្ថិតមុន, ផ្ញើដល់ Siem Reap ក្នុង 2 ថ្ងៃ។ ខ្ញុំ order ជាញឹកញាប់!",
    textEn: "Authentic gear, shipped to Siem Reap in 2 days. I order regularly!",
    sport: "Football ⚽",
    verified: true,
  },
  {
    name: "Chanthou M.",
    location: "Battambang",
    avatar: "CM",
    rating: 5,
    text: "Gym gloves are perfect for my training! Great quality and the Telegram support team helped me choose the right size.",
    textEn: "",
    sport: "Gym 🏋️",
    verified: true,
  },
  {
    name: "Sopheap R.",
    location: "Phnom Penh",
    avatar: "SR",
    rating: 5,
    text: "Best basketball shoes I've ever bought in Cambodia. Price is fair and delivery was super fast!",
    textEn: "",
    sport: "Basketball 🏀",
    verified: true,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#050A14] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D18] to-[#050A14]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Reviews</p>
          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What Customers Say
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm">
            Trusted by over 50,000 athletes across Cambodia 🇰🇭
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-white/40 text-sm">/ 5 (2,847 reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative bg-white/4 hover:bg-white/6 border border-white/8 hover:border-orange-500/20 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="font-bold text-white text-sm">{t.name}</span>
                      {t.verified && (
                        <span className="ml-2 text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 mb-3">
                    <span className="text-xs text-white/40">📍 {t.location}</span>
                    <span className="text-xs text-white/30">·</span>
                    <span className="text-xs text-white/40">{t.sport}</span>
                  </div>

                  {/* Khmer text (if any) */}
                  {t.textEn ? (
                    <div>
                      <p className="text-white/70 text-sm leading-relaxed mb-1">&ldquo;{t.text}&rdquo;</p>
                      <p className="text-white/40 text-xs italic">{t.textEn}</p>
                    </div>
                  ) : (
                    <p className="text-white/70 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telegram CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="bg-[#0088cc]/15 border border-[#0088cc]/30 rounded-2xl px-6 py-4 flex items-center gap-4">
            <span className="text-3xl">💬</span>
            <div className="text-left">
              <div className="text-white font-bold text-sm">Chat with us on Telegram</div>
              <div className="text-white/40 text-xs mt-0.5">Get instant help, order tracking & deals</div>
            </div>
            <a
              href="https://t.me/sportgearcambodia"
              target="_blank"
              rel="noopener noreferrer"
              id="telegram-cta"
              className="ml-2 bg-[#0088cc] hover:bg-[#0077b5] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              Open Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

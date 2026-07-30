import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  shop: [
    { href: "/shop?category=fitness", label: "Fitness" },
    { href: "/shop?category=football", label: "Football" },
    { href: "/shop?category=basketball", label: "Basketball" },
    { href: "/shop?category=running", label: "Running" },
    { href: "/shop?category=outdoor", label: "Outdoor" },
  ],
  support: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Policy" },
    { href: "/returns", label: "Returns" },
  ],
}

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook", color: "hover:text-blue-400" },
  { href: "#", icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
  { href: "#", icon: Youtube, label: "YouTube", color: "hover:text-red-400" },
]

export function Footer() {
  return (
    <footer className="bg-[#030710] border-t border-white/8">
      {/* Payment strip */}
      <div className="border-b border-white/8 py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="text-white/40 text-xs">Accepted Payments:</span>
          {["ABA Bank", "ACLEDA", "Wing", "Pi Pay", "Visa", "Mastercard"].map(p => (
            <span key={p} className="text-xs text-white/60 font-semibold border border-white/15 px-3 py-1 rounded-lg bg-white/4">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" id="footer-logo">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Sport<span className="text-orange-400">Gear</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              Cambodia&apos;s trusted sport accessories store. Premium gear delivered fast to every province.
            </p>
            <p className="text-xs text-white/30">
              📍 Phnom Penh, Cambodia<br />
              💬 Telegram: @sportgearcambodia<br />
              📞 +855 12 345 678
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-white/40 ${social.color} transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
              {/* Telegram */}
              <a
                href="https://t.me/sportgearcambodia"
                className="text-white/40 hover:text-[#0088cc] transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10"
                aria-label="Telegram"
                id="footer-telegram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-white/30">
            © {new Date().getFullYear()} SportGear Pro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

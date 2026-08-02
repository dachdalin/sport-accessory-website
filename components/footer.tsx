import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Youtube } from "lucide-react"

// ─── Payment Logos ──────────────────────────────────────────────────────────────
function LogoVisa() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="Visa">
      <rect width="48" height="30" rx="4" fill="#fff" />
      <text x="24" y="20" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="13" fill="#1A1F71">VISA</text>
    </svg>
  )
}

function LogoMastercard() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="Mastercard">
      <rect width="48" height="30" rx="4" fill="#fff" />
      <circle cx="20" cy="15" r="9" fill="#EB001B" />
      <circle cx="28" cy="15" r="9" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  )
}

function LogoABA() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="ABA Bank">
      <rect width="48" height="30" rx="4" fill="#8B1E3F" />
      <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#fff">ABA</text>
    </svg>
  )
}

function LogoAcleda() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="ACLEDA Bank">
      <rect width="48" height="30" rx="4" fill="#00458B" />
      <text x="24" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="8.5" fill="#fff">ACLEDA</text>
    </svg>
  )
}

function LogoWing() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="Wing">
      <rect width="48" height="30" rx="4" fill="#00A19A" />
      <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="800" fontSize="12" fill="#fff">Wing</text>
    </svg>
  )
}

function LogoPiPay() {
  return (
    <svg viewBox="0 0 48 30" width="40" height="25" role="img" aria-label="Pi Pay">
      <rect width="48" height="30" rx="4" fill="#F26522" />
      <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10.5" fill="#fff">PiPay</text>
    </svg>
  )
}

const paymentLogos = [
  { label: "Visa", Logo: LogoVisa },
  { label: "Mastercard", Logo: LogoMastercard },
  { label: "ABA Bank", Logo: LogoABA },
  { label: "ACLEDA", Logo: LogoAcleda },
  { label: "Wing", Logo: LogoWing },
  { label: "Pi Pay", Logo: LogoPiPay },
]

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
  { href: "#", icon: Facebook, label: "Facebook", color: "hover:text-blue-500 dark:hover:text-blue-400" },
  { href: "#", icon: Instagram, label: "Instagram", color: "hover:text-pink-500 dark:hover:text-pink-400" },
  { href: "#", icon: Youtube, label: "YouTube", color: "hover:text-red-500 dark:hover:text-red-400" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Payment strip */}
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="text-muted-foreground text-xs mr-1">Accepted Payments:</span>
          {paymentLogos.map(({ label, Logo }) => (
            <span
              key={label}
              className="flex items-center justify-center rounded-lg border border-border bg-white p-1 shadow-sm"
              title={label}
            >
              <Logo />
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
              <span className="text-xl font-black tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Sport<span className="text-orange-600 dark:text-orange-400">Gear</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Cambodia&apos;s trusted sport accessories store. Premium gear delivered fast to every province.
            </p>
            <p className="text-xs text-muted-foreground/80">
              📍 Phnom Penh, Cambodia<br />
              💬 Telegram: @sportgearcambodia<br />
              📞 +855 12 345 678
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-muted-foreground ${social.color} transition-colors p-2 bg-muted rounded-lg hover:bg-muted/70`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
              {/* Telegram */}
              <a
                href="https://t.me/sportgearcambodia"
                className="text-muted-foreground hover:text-[#0088cc] transition-colors p-2 bg-muted rounded-lg hover:bg-muted/70"
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
            <h3 className="font-bold text-foreground text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-foreground text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-muted-foreground/80">
            © {new Date().getFullYear()} SportGear Pro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

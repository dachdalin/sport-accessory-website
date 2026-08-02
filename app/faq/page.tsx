import {
  HelpCircle,
  ShoppingCart,
  Truck,
  RefreshCcw,
  Package,
  User,
  Banknote,
  ChevronDown,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CartProvider } from "@/lib/cart-context"

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  icon: React.ReactNode
  title: string
  color: string
  items: FAQItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: FAQCategory[] = [
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "Ordering",
    color: "text-blue-600 dark:text-blue-400",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our shop, select the product you want, choose your size and colour, then add it to your cart. Proceed to checkout, fill in your delivery address and choose your payment method. You will receive a confirmation via Telegram or email once your order is placed.",
      },
      {
        question: "Can I order by Telegram or Facebook Messenger?",
        answer:
          "Yes. Many customers in Cambodia prefer to order directly via Telegram (@SportGearPro_KH) or Facebook Page (SportGear Pro KH). Send us the product name, size, colour, and your delivery address. Our team will confirm stock and send a payment link or COD confirmation.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer:
          "You can modify or cancel your order within 2 hours of placing it, before it is dispatched. Contact us immediately on Telegram or WhatsApp. Once the item has been handed to the courier, we are unable to cancel it, but you may return it after delivery.",
      },
      {
        question: "Is there a minimum order amount?",
        answer:
          "There is no minimum order amount. However, orders under $15 incur a small shipping fee. Orders of $30 or more qualify for free shipping anywhere in Cambodia.",
      },
      {
        question: "Do you offer bulk or wholesale orders?",
        answer:
          "Yes. For bulk orders of 10 or more items, contact our team directly on Telegram or email to discuss pricing and delivery arrangements.",
      },
    ],
  },
  {
    icon: <Banknote className="h-5 w-5" />,
    title: "Payments & COD",
    color: "text-green-600 dark:text-green-400",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Cash on Delivery (COD), ABA Mobile Pay, Wing Money, ACLEDA Bank transfer, Pi Pay, and Credit/Debit Card (Visa and Mastercard) via our secure checkout. All prices are in USD.",
      },
      {
        question: "Is Cash on Delivery (COD) available everywhere in Cambodia?",
        answer:
          "COD is available across all 25 provinces. For orders in Phnom Penh, COD is always available. For provincial orders, COD is available for orders up to $200. Please prepare the exact amount as our delivery agents may not carry large change.",
      },
      {
        question: "How do I pay with ABA Mobile Pay?",
        answer:
          "At checkout, select ABA Mobile Pay. You will receive a QR code to scan in your ABA Mobile app. Complete the payment and your order will be confirmed automatically. You can also transfer directly to our ABA account — contact us for account details.",
      },
      {
        question: "How do I pay with Wing Money?",
        answer:
          "Select Wing Money at checkout. Transfer the total amount to our Wing account number (shown at checkout) from the Wing app or any Wing agent. Send us the Wing transaction reference number via Telegram to confirm your order.",
      },
      {
        question: "Are prices in USD or Khmer Riel (KHR)?",
        answer:
          "All prices on our website are displayed in US Dollars (USD). If you pay with ABA or Wing, you can transfer in KHR at the current exchange rate displayed at the time of payment. COD payments can be made in either USD or KHR.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. Online card payments are processed through a PCI-DSS compliant payment gateway. We never store your card details. ABA and Wing transfers are made directly within those apps' own secure environments.",
      },
    ],
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Shipping & Delivery",
    color: "text-orange-600 dark:text-orange-400",
    items: [
      {
        question: "How long does delivery take in Phnom Penh?",
        answer:
          "Standard delivery in Phnom Penh takes 1 – 2 business days. Same-day or next-day express delivery is also available for orders placed before 11 AM. Contact us to arrange express delivery.",
      },
      {
        question: "How long does delivery take to provinces?",
        answer:
          "Delivery to Siem Reap, Battambang, Sihanoukville, and Kampong Cham typically takes 2 – 3 business days. More remote provinces may take 3 – 5 business days. We partner with Kerry Express, J&T Express, and Ninja Van Cambodia.",
      },
      {
        question: "Do you deliver to all provinces in Cambodia?",
        answer:
          "Yes. We deliver to all 25 provinces and the capital Phnom Penh. For remote villages or districts without courier coverage, we will contact you to arrange collection from the nearest courier hub.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is dispatched, you will receive a tracking number via Telegram or email. Enter this number on the courier's website (Kerry Express, J&T Express, or Ninja Van) to see real-time updates. You can also message us and we will check for you.",
      },
      {
        question: "What happens if I miss the delivery?",
        answer:
          "The courier will contact you to reschedule at no extra charge. If a second delivery attempt also fails, the package returns to our warehouse and we will reach out to confirm a re-delivery. A new shipping fee may apply for the re-dispatch.",
      },
      {
        question: "How much does shipping cost?",
        answer:
          "Shipping is FREE for orders $30 and above. For orders under $15, shipping is $2.50 to Phnom Penh and $4.00 to provinces. For orders $15 – $29.99, it is $1.50 to Phnom Penh and $2.50 to provinces. See our full Shipping Policy for details.",
      },
    ],
  },
  {
    icon: <RefreshCcw className="h-5 w-5" />,
    title: "Returns & Refunds",
    color: "text-red-600 dark:text-red-400",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 14 days of delivery for unused items in original condition with all tags and packaging intact. Proof of purchase is required. See our full Returns & Refunds page for complete details.",
      },
      {
        question: "How do I start a return?",
        answer:
          "Contact us on Telegram or WhatsApp with your order number and reason for return. We will issue a Return Authorisation (RA) number and instructions. Do not send items back without approval as we may not be able to process them.",
      },
      {
        question: "I received a wrong or damaged item. What do I do?",
        answer:
          "Take clear photos or a short video of the issue and contact us within 48 hours of delivery. We will arrange a free return pickup and send the correct item or issue a full refund — whichever you prefer.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Once we receive and inspect the returned item (1 – 2 business days), refunds are processed within 3 – 5 business days. ABA and Wing refunds typically appear within 1 – 2 days. Card refunds may take 5 – 10 business days depending on your bank.",
      },
      {
        question: "Can I exchange for a different size or colour?",
        answer:
          "Yes, exchanges are accepted within the 14-day window subject to stock availability. Contact us with your preferred size or colour and we will reserve it for you before you send back the original item.",
      },
      {
        question: "Are return shipping costs covered?",
        answer:
          "Return shipping is free for Phnom Penh customers (we arrange pickup) and for all defective or wrong item returns. For province customers returning due to change of mind, the return shipping cost is borne by the customer.",
      },
    ],
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Products & Sizing",
    color: "text-purple-600 dark:text-purple-400",
    items: [
      {
        question: "How do I find the right size?",
        answer:
          "Each product page includes a size guide with measurements in centimetres. We recommend measuring yourself and comparing to the chart rather than going by your usual size, as sizing can vary between brands and product types.",
      },
      {
        question: "Are your products authentic?",
        answer:
          "Yes. All products sold on SportGear Pro are 100% authentic and sourced from authorised distributors and brand partners. We do not sell counterfeit or replica goods.",
      },
      {
        question: "A product I want is out of stock. Will it come back?",
        answer:
          "Popular items are usually restocked within 1 – 3 weeks. Message us on Telegram with the product name and your size and we will notify you as soon as it is available again.",
      },
      {
        question: "Do you sell products suitable for Cambodia's hot weather?",
        answer:
          "Yes. We stock lightweight, moisture-wicking, and breathable sportswear designed for hot and humid climates. Look for products tagged with 'Quick Dry', 'Breathable', or 'Cooling' in the product description.",
      },
      {
        question: "Can I see the product before buying?",
        answer:
          "We do not have a physical store, but you are welcome to visit our Phnom Penh pickup point by prior appointment. Message us on Telegram to arrange a visit.",
      },
    ],
  },
  {
    icon: <User className="h-5 w-5" />,
    title: "Account & Support",
    color: "text-amber-600 dark:text-amber-400",
    items: [
      {
        question: "Do I need to create an account to order?",
        answer:
          "No, you can place an order as a guest. However, creating an account lets you track orders, view your order history, save your address, and manage your wishlist more easily.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "Click 'Forgot Password' on the login page and enter your email address. We will send you a one-time password (OTP) or reset link. If you registered via Telegram and do not have an email set, contact our support team directly.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "The fastest way to reach us is via Telegram (@SportGearPro_KH) or WhatsApp (+855 12 345 678). We are available Monday to Saturday, 8 AM – 6 PM (Cambodia Time). You can also email support@sportgear.kh for non-urgent queries.",
      },
      {
        question: "Do you have a Telegram channel for promotions?",
        answer:
          "Yes. Join our Telegram channel @SportGearProDeals for the latest promotions, flash sales, and new arrivals. We also post on our Facebook Page (SportGear Pro KH) regularly.",
      },
      {
        question: "Can I use the website in Khmer (ភាសាខ្មែរ)?",
        answer:
          "Partial Khmer language support is available in the navigation. We are actively expanding Khmer language support across all pages. In the meantime, feel free to message us in Khmer on Telegram — our support team speaks Khmer fluently.",
      },
    ],
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function FAQAccordion({ item }: { item: FAQItem }) {
  return (
    <details className="group border-b border-border/50 last:border-0">
      <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-semibold text-foreground group-open:text-orange-600 dark:text-orange-400 transition-colors leading-6 pr-2">
          {item.question}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180 group-open:text-orange-600 dark:text-orange-400" />
      </summary>
      <p className="pb-5 text-sm leading-7 text-muted-foreground pr-8">{item.answer}</p>
    </details>
  )
}

function CategoryCard({ category }: { category: FAQCategory }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-6 md:p-7">
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 ${category.color}`}>
          {category.icon}
        </div>
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          {category.title}
        </h2>
      </div>
      <div className="mt-4">
        {category.items.map((item) => (
          <FAQAccordion key={item.question} item={item} />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
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
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h1
                className="font-heading text-3xl font-bold text-foreground md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Find answers to the most common questions from our customers in Cambodia.
                Can&apos;t find what you&apos;re looking for? Message us on Telegram — we reply fast.
              </p>

              {/* Quick topic pills */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.title}
                    href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/8 transition-colors"
                  >
                    <span className={cat.color}>{cat.icon}</span>
                    {cat.title}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── Content ───────────────────────────────────────────────────────── */}
          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-6">

              {CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                >
                  <CategoryCard category={cat} />
                </div>
              ))}

              {/* Still have questions */}
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-7 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15">
                  <HelpCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Still have a question?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our Cambodia-based support team is available Monday – Saturday, 8 AM – 6 PM.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-orange-600 dark:text-orange-400">
                    Telegram: @SportGearPro_KH
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-orange-600 dark:text-orange-400">
                    WhatsApp: +855 12 345 678
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-orange-600 dark:text-orange-400">
                    support@sportgear.kh
                  </span>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground pt-2">
                FAQ last updated: August 2026 · SportGear Pro — Cambodia 🇰🇭
              </p>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CartProvider } from "@/lib/cart-context"

export default function TermsPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <section className="border-b border-border bg-card px-4 py-16 text-center md:py-20">
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
              Terms and Conditions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Please read these terms carefully before using SportGear Pro or placing an order.
            </p>
          </section>

          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                By accessing this website, browsing products, creating an account, or placing an order, customers agree to use SportGear Pro responsibly and follow these terms. Customers must provide accurate information and may not use the website for fraudulent, harmful, or unlawful activity.
              </p>
              <p>
                Product details, prices, promotions, and availability may change without prior notice. We work to keep information accurate, but errors may occur. SportGear Pro may correct product information, update pricing, cancel unavailable items, or refuse orders when necessary.
              </p>
              <p>
                Customers are responsible for reviewing order details before confirming a purchase. Once an order is submitted, processing, delivery, return, and exchange handling will follow the policies shown on this website and any instructions provided during checkout.
              </p>
              <p>
                Website content, including text, images, branding, layouts, and product presentation, belongs to SportGear Pro or its content providers. Customers may not copy, reuse, or distribute website content for commercial purposes without permission.
              </p>
              <p>
                SportGear Pro may update these terms to reflect business, service, product, or legal changes. Continued use of the website after updates means the customer accepts the latest version of these terms.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

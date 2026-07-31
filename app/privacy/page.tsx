import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CartProvider } from "@/lib/cart-context"

export default function PolicyPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#050A14]">
        <Header />
        <main className="flex-1">
          <section className="border-b border-white/10 bg-[#0D1525] px-4 py-16 text-center md:py-20">
            <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Store Policy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/55">
              Please read our store policy carefully before placing an order with SportGear Pro.
            </p>
          </section>

          <section className="px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl space-y-5 text-base leading-8 text-white/65">
              <p>
                SportGear Pro is committed to providing quality sport accessories, clear product information, and a reliable shopping experience. Product images, descriptions, sizes, colors, and prices are presented as accurately as possible, but small differences may occur because of screen settings, supplier updates, or product availability.
              </p>
              <p>
                Orders are processed after the submitted customer details are reviewed. Customers are responsible for providing correct contact information, delivery address, and payment details. If an order cannot be confirmed because of incomplete or incorrect information, delivery may be delayed or canceled.
              </p>
              <p>
                Returns and exchanges are accepted only for eligible items that are unused, undamaged, and returned with their original packaging. Items damaged by misuse, normal wear, or improper care are not eligible for return. Customers should contact support as soon as possible if they receive the wrong product or a damaged item.
              </p>
              <p>
                Customer information is used only to process orders, provide support, improve service, and communicate important updates. We do not sell personal information to third parties. Payment and account details should be kept private by the customer at all times.
              </p>
              <p>
                By using this website, customers agree to follow these policies and any additional terms shown during checkout. SportGear Pro may update this policy when needed to reflect service, product, or legal changes.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export default function OrderSuccessPage() {
  const orderNumber = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>

                <h1 
                  className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Thank You for Your Order!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your order has been successfully placed and is being processed.
                </p>

                <div className="bg-secondary rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Package className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Order Number</p>
                        <p className="font-semibold text-foreground">{orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">Confirmation</p>
                        <p className="font-semibold text-foreground">Sent to your email</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-left mb-8">
                  <h2 
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    What happens next?
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium shrink-0">1</span>
                      <span>We will send you an email confirmation with your order details.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium shrink-0">2</span>
                      <span>Your order will be prepared and shipped within 1-2 business days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium shrink-0">3</span>
                      <span>You will receive tracking information once your order ships.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link href="/shop">
                      Continue Shopping
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

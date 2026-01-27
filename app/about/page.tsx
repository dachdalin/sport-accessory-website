import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Shield, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide athletes with premium quality gear that enhances performance and makes every workout count.",
  },
  {
    icon: Heart,
    title: "Our Passion",
    description: "We are athletes ourselves. We understand the dedication it takes to push your limits every day.",
  },
  {
    icon: Shield,
    title: "Quality Promise",
    description: "Every product is tested and approved by professional athletes before it reaches your hands.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join thousands of athletes who trust SportGear for their training and competition needs.",
  },
]

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background">
          {/* Hero Section */}
          <section className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 
                className="text-3xl md:text-5xl font-bold text-foreground mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                About SportGear Pro
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are passionate about helping athletes achieve their best. Since 2015, 
                we have been providing premium sport accessories to athletes around the world.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 
                  className="text-2xl md:text-3xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Who We Are
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    SportGear Pro started with a simple idea: athletes deserve better gear. 
                    Our founders, former professional athletes themselves, were frustrated with 
                    the lack of quality options available in the market.
                  </p>
                  <p>
                    Today, we work directly with manufacturers and athletes to create products 
                    that meet the highest standards of quality and performance. Every item in 
                    our store has been tested in real-world conditions by real athletes.
                  </p>
                  <p>
                    We believe that great gear should be accessible to everyone, from weekend 
                    warriors to professional competitors. That is why we offer competitive 
                    prices without compromising on quality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 
                className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                What Drives Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => (
                  <Card key={value.title} className="bg-background border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 
                            className="text-lg font-semibold text-foreground mb-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div 
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    50K+
                  </div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <div 
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    500+
                  </div>
                  <p className="text-muted-foreground">Products</p>
                </div>
                <div>
                  <div 
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    30+
                  </div>
                  <p className="text-muted-foreground">Countries</p>
                </div>
                <div>
                  <div 
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    4.8
                  </div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Why Customers Trust Us
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
                Our commitment to quality, fast shipping, and excellent customer service 
                has earned us the trust of athletes worldwide. We stand behind every product 
                we sell with our 30-day money-back guarantee.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

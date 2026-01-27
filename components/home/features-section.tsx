import { CheckCircle, Truck, CreditCard, RotateCcw } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "High Quality Products",
    description: "Premium materials and rigorous quality testing for every item.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Quick delivery to your doorstep. Free shipping on orders over $50.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Your transactions are protected with industry-leading encryption.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns if you are not completely satisfied.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Why Choose Us
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 
                className="text-lg font-semibold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

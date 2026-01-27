import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Best sports gear I have ever purchased! The quality is amazing and shipping was super fast.",
    sport: "Running",
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "Great customer service and the products exceeded my expectations. Will definitely buy again!",
    sport: "Fitness",
  },
  {
    name: "Emma K.",
    rating: 5,
    text: "The training gloves are perfect for my gym sessions. Comfortable fit and durable material.",
    sport: "Gym",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of athletes worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4">{`"${testimonial.text}"`}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{testimonial.name}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.sport}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

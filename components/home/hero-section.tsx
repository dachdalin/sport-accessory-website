import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-athlete.jpg"
          alt="Athlete in action"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Premium Sport Accessories for Every Athlete
          </h1>
          <p className="mt-6 text-lg md:text-xl text-background/80 max-w-lg">
            Quality gear that keeps up with your performance. Fast delivery and trusted by athletes worldwide.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground bg-transparent">
              <Link href="/shop">
                View Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

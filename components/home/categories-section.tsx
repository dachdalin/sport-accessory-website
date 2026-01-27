import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const categories = [
  { id: "fitness", name: "Fitness", image: "/categories/fitness.jpg" },
  { id: "football", name: "Football", image: "/categories/football.jpg" },
  { id: "basketball", name: "Basketball", image: "/categories/basketball.jpg" },
  { id: "running", name: "Running", image: "/categories/running.jpg" },
  { id: "gym", name: "Gym Accessories", image: "/categories/gym.jpg" },
  { id: "outdoor", name: "Outdoor Sports", image: "/categories/outdoor.jpg" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Shop by Category
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Find the perfect gear for your sport. Browse our curated collection of premium accessories.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.id}`}>
              <Card className="group relative overflow-hidden aspect-square cursor-pointer border-0">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <h3 
                    className="text-lg md:text-xl font-semibold text-background group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

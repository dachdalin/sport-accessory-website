import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  { id: "fitness", name: "Fitness", emoji: "💪", image: "/categories/fitness.jpg", desc: "Build your best body" },
  { id: "football", name: "Football", emoji: "⚽", image: "/categories/football.jpg", desc: "Dominate the pitch" },
  { id: "basketball", name: "Basketball", emoji: "🏀", image: "/categories/basketball.jpg", desc: "Court-ready gear" },
  { id: "running", name: "Running", emoji: "🏃", image: "/categories/running.jpg", desc: "Go the extra mile" },
  { id: "gym", name: "Gym Accessories", emoji: "🏋️", image: "/categories/gym.jpg", desc: "Train harder" },
  { id: "outdoor", name: "Outdoor Sports", emoji: "🌿", image: "/categories/outdoor.jpg", desc: "Explore freely" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-widest mb-2">Browse</p>
            <h2
              className="text-3xl md:text-4xl font-black text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground/50 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group"
            id="categories-view-all"
          >
            View all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/shop?category=${category.id}`} id={`category-${category.id}`}>
              <div
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  index === 0 ? "md:col-span-2 aspect-[2/1]" : "aspect-square"
                } md:aspect-auto md:h-52`}
              >
                {/* Background image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/60 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-2xl mb-1 block">{category.emoji}</span>
                    <h3
                      className="text-lg md:text-xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.desc}
                    </p>
                  </div>
                </div>

                {/* Hover neon border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/50 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

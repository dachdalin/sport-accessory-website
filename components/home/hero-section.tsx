"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"


export function HeroSection() {
  const { language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 23 })

  const content = {
    en: {
      badge: "FLASH SALE — UP TO 70% OFF · LIMITED TIME",
      endsIn: "Ends in:",
      heading1: "GEAR UP.",
      heading2: "LEVEL UP.",
      sub: "Cambodia's #1 sport accessories store. Premium quality gear delivered fast to Phnom Penh, Siem Reap & nationwide.",
      cta1: "Shop Flash Sale",
      cta2: "View All Products",
      stats: [{ value: "50K+", label: "Athletes" }, { value: "4.9★", label: "Rating" }, { value: "Free", label: "Shipping >$30" }],
      accepted: "Accepted:",
      ticker: ["🔥 Sok Dara from Phnom Penh bought Running Shoes", "⚡ Vanna from Siem Reap bought Gym Gloves", "🏆 Chanthou from Battambang bought Football Kit", "✅ Free shipping on orders over $30", "💳 QR Pay accepted — ABA & Wing"],
    },
    km: {
      badge: "លក់ Flash — បញ្ចុះតម្លៃ 70% · ពេលវេលាមានកំណត់",
      endsIn: "បញ្ចប់ក្នុង:",
      heading1: "ត្រៀមខ្លួន.",
      heading2: "ឈ្នះ.",
      sub: "ហាងលក់គ្រឿងកីឡា #1 នៅកម្ពុជា។ ទំនិញប្រណីត ដឹកជូនលឿន ភ្នំពេញ សៀមរាប & ទូទាំងប្រទេស។",
      cta1: "ទិញ Flash Sale",
      cta2: "មើលផលិតផលទាំងអស់",
      stats: [{ value: "50K+", label: "អ្នកកីឡា" }, { value: "4.9★", label: "ការវាយតម្លៃ" }, { value: "ឥតគិតថ្លៃ", label: "ដឹក >$30" }],
      accepted: "ទទួល:",
      ticker: ["🔥 សុខ ដារា ពីភ្នំពេញ បានទិញ Running Shoes", "⚡ វណ្ណា ពីសៀមរាប បានទិញ Gym Gloves", "🏆 ចន្ថូ ពីបាត់ដំបង បានទិញ Football Kit", "✅ ដឹកជញ្ជូនឥតគិតថ្លៃ លើ $30", "💳 ទទួល QR — ABA & Wing"],
    },
  }
  const c = content[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#050A14]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-athlete.jpg"
          alt="Athlete in action"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] via-[#050A14]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        {/* Neon glow accents */}
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Flash sale badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm animate-pulse">
            <Zap className="h-3 w-3 fill-orange-400" />
            {c.badge}
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/50 text-sm font-medium">{c.endsIn}</span>
            {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-white/10 backdrop-blur border border-white/20 text-white font-mono font-bold text-lg px-2.5 py-1 rounded-md min-w-[2.5rem] text-center">
                  {val}
                </span>
                {i < 2 && <span className="text-orange-400 font-bold">:</span>}
              </span>
            ))}
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {c.heading1}{" "}
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {c.heading2}
              </span>
            </span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl leading-relaxed">
            {c.sub}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" id="hero-shop-now" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:scale-105 active:scale-95 rounded-xl text-base h-13 px-8">
              <Link href="/shop">
                {c.cta1}
                <Zap className="ml-2 h-4 w-4 fill-white" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" id="hero-categories" className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur rounded-xl text-base h-13 px-8 transition-all hover:border-white/40">
              <Link href="/shop">
                {c.cta2}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-6 md:gap-10">
            {c.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <span className="text-white/30 text-xs">{c.accepted}</span>
            {["ABA Bank", "ACLEDA", "Wing", "QR Pay"].map(p => (
              <span key={p} className="text-xs bg-white/8 border border-white/15 text-white/60 px-2.5 py-1 rounded-lg backdrop-blur-sm font-medium">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom social proof ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur border-t border-white/10 py-2 overflow-hidden">
        <div className="flex items-center gap-8 animate-[ticker_20s_linear_infinite]" style={{ width: "max-content" }}>
          {Array.from({ length: 4 }).flatMap(() => c.ticker).map((item, i) => (
            <span key={i} className="text-white/50 text-sm whitespace-nowrap flex items-center gap-1">
              {item}
              <span className="mx-4 text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

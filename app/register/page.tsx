import Link from "next/link"
import { Chrome, Dumbbell, LockKeyhole, Mail, Phone, Send, User } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartProvider } from "@/lib/cart-context"

export default function RegisterPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#050A14]">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
          <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1525]/95 p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <Link
                href="/"
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                aria-label="SportGear Pro home"
              >
                <Dumbbell className="h-8 w-8" />
              </Link>
              <h1 className="font-heading text-2xl font-bold text-white">Create account</h1>
              <p className="mt-2 text-sm text-white/55">Register to save favorites and checkout faster.</p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Name
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    required
                    className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      required
                      className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Phone"
                      required
                      className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create password"
                    required
                    className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
              >
                Register
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium uppercase tracking-wider text-white/35">Other register</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Chrome className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Send className="h-4 w-4" />
                Telegram
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-white/45">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-orange-400 hover:text-orange-300">
                Login
              </Link>
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

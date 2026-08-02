"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell, Mail, LockKeyhole, Chrome, Send } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartProvider } from "@/lib/cart-context"

function LoginContent() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
        <section className="w-full max-w-md rounded-2xl border border-border bg-card/95 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link
              href="/"
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/25"
              aria-label="SportGear Pro home"
            >
              <Dumbbell className="h-8 w-8" />
            </Link>
            <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Login to continue shopping your sport gear.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email-or-phone" className="text-muted-foreground">
                  Email or phone
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email-or-phone"
                    name="emailOrPhone"
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    placeholder="Email or phone number"
                    className="h-12 border-border bg-muted/50 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="password" className="text-muted-foreground">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 border-border bg-muted/50 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
              >
                Login
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-muted" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Other login</span>
              <span className="h-px flex-1 bg-muted" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-border bg-muted/50 text-foreground hover:bg-muted hover:text-foreground"
              >
                <Chrome className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-border bg-muted/50 text-foreground hover:bg-muted hover:text-foreground"
              >
                <Send className="h-4 w-4" />
                Telegram
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                Sign up
              </Link>
            </p>
          </section>
        </main>
        <Footer />
      </div>
  )
}

export default function LoginPage() {
  return (
    <CartProvider>
      <LoginContent />
    </CartProvider>
  )
}

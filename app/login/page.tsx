import Link from "next/link"
import { Dumbbell, Mail, LockKeyhole, Chrome, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050A14] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1525]/95 p-6 shadow-2xl shadow-black/40 sm:p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/25"
            aria-label="SportGear Pro home"
          >
            <Dumbbell className="h-8 w-8" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white/55">Login to continue shopping your sport gear.</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email-or-phone" className="text-white/80">
              Email or phone
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <Input
                id="email-or-phone"
                name="emailOrPhone"
                type="text"
                inputMode="email"
                autoComplete="username"
                placeholder="Email or phone number"
                className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm font-medium text-orange-400 hover:text-orange-300">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
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
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-wider text-white/35">Other login</span>
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
      </section>
    </main>
  )
}

"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Mail, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { CartProvider } from "@/lib/cart-context"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"contact" | "verify">("contact")
  const [contact, setContact] = useState("")
  const [code, setCode] = useState("")

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep("verify")
  }

  const handleVerifySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

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
              <h1 className="font-heading text-2xl font-bold text-white">
                {step === "contact" ? "Recover account" : "Verify code"}
              </h1>
              <p className="mt-2 text-sm text-white/55">
                {step === "contact"
                  ? "Enter your email or phone number to receive a verification code."
                  : `Enter the 6-digit code sent to ${contact || "your account"}.`}
              </p>
            </div>

            {step === "contact" ? (
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="recovery-contact" className="text-white/80">
                    Email or phone
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      id="recovery-contact"
                      name="contact"
                      type="text"
                      inputMode="email"
                      autoComplete="username"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder="Email or phone number"
                      required
                      className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
                >
                  Next
                </Button>

                <Button
                  asChild
                  type="button"
                  variant="ghost"
                  className="h-11 w-full text-white/60 hover:bg-white/8 hover:text-white"
                >
                  <Link href="/login">
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleVerifySubmit}>
                <div className="space-y-3">
                  <Label htmlFor="verification-code" className="justify-center text-white/80">
                    Verification code
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      id="verification-code"
                      maxLength={6}
                      value={code}
                      onChange={setCode}
                      containerClassName="gap-2"
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-12 w-11 rounded-xl border border-white/10 bg-white/5 text-lg font-semibold text-white data-[active=true]:border-orange-500 data-[active=true]:ring-orange-500/25"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={code.length < 6}
                  className="h-12 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Verify code
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("contact")}
                    className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
                  >
                    Resend
                  </Button>
                </div>
              </form>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

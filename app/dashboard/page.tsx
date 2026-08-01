"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { MOCK_USER, type Tab, type UserProfile } from "@/lib/dashboard"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardMobileHeader, DashboardMobileDeleteAccount } from "@/components/dashboard/mobile-header"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { PasswordCard } from "@/components/dashboard/password-card"
import { OrderSection } from "@/components/dashboard/order-section"
import { WishlistSection } from "@/components/dashboard/wishlist-section"
import { AddressSection } from "@/components/dashboard/address-section"

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [user, setUser] = useState<UserProfile>(MOCK_USER)

  return (
    <div className="min-h-screen flex flex-col bg-[#050A14]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          <DashboardSidebar user={user} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 min-w-0">
            <DashboardMobileHeader user={user} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "profile" && (
              <div className="space-y-4">
                <ProfileCard user={user} onUserUpdate={setUser} />
                <PasswordCard />
              </div>
            )}
            {activeTab === "orders"   && <OrderSection />}
            {activeTab === "wishlist" && <WishlistSection />}
            {activeTab === "address"  && <AddressSection />}

            <DashboardMobileDeleteAccount />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <CartProvider>
      <DashboardContent />
    </CartProvider>
  )
}

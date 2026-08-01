"use client"

import { ChevronRight } from "lucide-react"
import type { Tab, UserProfile } from "@/lib/dashboard"
import { NAV_ITEMS } from "@/lib/dashboard"
import { LogoutDialog } from "./logout-dialog"
import { DeleteAccountDialog } from "./delete-account-dialog"

interface Props {
  user: UserProfile
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function DashboardSidebar({ user, activeTab, onTabChange }: Props) {
  return (
    <aside className="hidden lg:flex lg:flex-col gap-3 w-60 flex-shrink-0 sticky top-8">
      {/* User card */}
      <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm truncate">{user.name}</p>
            <p className="text-xs text-white/45 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-2">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-orange-500/15 text-orange-400"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
            {activeTab === key && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
          </button>
        ))}
      </nav>

      {/* Account actions */}
      <div className="rounded-2xl border border-white/8 bg-[#0D1525]/80 p-2">
        <LogoutDialog />
        <DeleteAccountDialog />
      </div>
    </aside>
  )
}

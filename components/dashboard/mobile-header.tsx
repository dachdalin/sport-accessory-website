"use client"

import type { Tab, UserProfile } from "@/lib/dashboard"
import { NAV_ITEMS } from "@/lib/dashboard"
import { LogoutDialog } from "./logout-dialog"
import { DeleteAccountDialog } from "./delete-account-dialog"

interface Props {
  user: UserProfile
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function DashboardMobileHeader({ user, activeTab, onTabChange }: Props) {
  return (
    <div className="lg:hidden mb-5 space-y-3">
      {/* User card with logout icon */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground text-sm truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <LogoutDialog
          triggerClassName="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center"
          iconOnly
        />
      </div>

      {/* Horizontal tab strip */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              activeTab === key
                ? "bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                : "text-muted-foreground bg-muted/50 border border-border hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Delete account (mobile only, shown below content via page) */}
    </div>
  )
}

export function DashboardMobileDeleteAccount() {
  return (
    <div className="lg:hidden mt-4">
      <div className="rounded-2xl border border-border bg-card/80 p-2">
        <DeleteAccountDialog triggerClassName="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all" />
      </div>
    </div>
  )
}

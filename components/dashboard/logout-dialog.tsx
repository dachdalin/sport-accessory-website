"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { ConfirmDialog } from "@/components/global/confirm-dialog"

interface Props {
  triggerClassName?: string
  iconOnly?: boolean
}

const DEFAULT_TRIGGER_CLASS =
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all text-left"

export function LogoutDialog({ triggerClassName, iconOnly }: Props) {
  const router = useRouter()

  return (
    <ConfirmDialog
      trigger={
        <button className={triggerClassName ?? DEFAULT_TRIGGER_CLASS}>
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!iconOnly && "Logout"}
        </button>
      }
      icon={<LogOut className="h-5 w-5 text-white/70" />}
      iconBg="bg-white/8"
      title="Log out?"
      description="You will be signed out of your account. Your cart and wishlist will be cleared."
      confirmLabel="Yes, log out"
      confirmClassName="bg-orange-500 hover:bg-orange-600 text-white border-0"
      cancelLabel="Stay"
      onConfirm={() => router.push("/login")}
    />
  )
}

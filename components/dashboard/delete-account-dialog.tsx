"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { ConfirmDialog } from "@/components/global/confirm-dialog"

interface Props {
  triggerClassName?: string
}

const DEFAULT_TRIGGER_CLASS =
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"

export function DeleteAccountDialog({ triggerClassName }: Props) {
  const router = useRouter()

  return (
    <ConfirmDialog
      trigger={
        <button className={triggerClassName ?? DEFAULT_TRIGGER_CLASS}>
          <Trash2 className="h-4 w-4 flex-shrink-0" />
          Delete Account
        </button>
      }
      icon={<Trash2 className="h-5 w-5 text-red-400" />}
      iconBg="bg-red-500/15"
      title="Delete account?"
      description={
        <>
          This will permanently erase your account, order history, saved addresses, and wishlist.
          This action <span className="text-white font-medium">cannot be undone</span>.
        </>
      }
      confirmLabel="Delete Account"
      confirmClassName="bg-red-600 hover:bg-red-700 text-white border-0"
      onConfirm={() => router.push("/login")}
    />
  )
}

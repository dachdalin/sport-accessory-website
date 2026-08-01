"use client"

import type { ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
  trigger: ReactNode
  icon?: ReactNode
  iconBg?: string
  title: string
  description: ReactNode
  confirmLabel: string
  confirmClassName?: string
  cancelLabel?: string
  onConfirm: () => void
}

export function ConfirmDialog({
  trigger,
  icon,
  iconBg = "bg-white/8",
  title,
  description,
  confirmLabel,
  confirmClassName = "bg-orange-500 hover:bg-orange-600 text-white border-0",
  cancelLabel = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0D1525] border-white/10 text-white max-w-sm">
        <AlertDialogHeader>
          {icon && (
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 mb-1 ${iconBg}`}>
              {icon}
            </div>
          )}
          <AlertDialogTitle className="text-white text-lg">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/50 text-sm leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction className={confirmClassName} onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

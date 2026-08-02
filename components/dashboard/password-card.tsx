"use client"

import { useState } from "react"
import { Shield, Pencil, Check, X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function PasswordStrengthBar({ password }: { password: string }) {
  const len       = password.length
  const hasUpper  = /[A-Z]/.test(password)
  const hasNum    = /\d/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  const strength  = (len >= 8 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSymbol ? 1 : 0)
  const colors    = ["bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-green-500"]

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={`h-1 flex-1 rounded-full transition-colors ${
            level <= strength ? colors[strength - 1] : "bg-muted"
          }`}
        />
      ))}
    </div>
  )
}

function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-muted-foreground text-sm">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 border-border bg-muted/50 pr-10 text-foreground placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}

export function PasswordCard() {
  const [isChanging, setIsChanging]         = useState(false)
  const [newPassword, setNewPassword]       = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError]                   = useState("")
  const [success, setSuccess]               = useState(false)

  function save() {
    setError("")
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return }
    setSuccess(true)
    setNewPassword("")
    setConfirmPassword("")
    setIsChanging(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  function cancel() {
    setIsChanging(false)
    setError("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <h2 className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Security
          </h2>
        </div>
        {!isChanging && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsChanging(true)}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-500/10 gap-1.5 h-8"
          >
            <Pencil className="h-3.5 w-3.5" />
            Change Password
          </Button>
        )}
      </div>

      {/* Success banner */}
      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-green-500/12 border border-green-500/20 px-4 py-3 text-sm text-green-400 mb-4">
          <Check className="h-4 w-4 flex-shrink-0" />
          Password updated successfully.
        </div>
      )}

      {isChanging ? (
        <div className="space-y-4">
          <PasswordInput
            id="new-password"
            label="New Password"
            placeholder="Min. 8 characters"
            value={newPassword}
            onChange={(v) => { setError(""); setNewPassword(v) }}
          />

          {newPassword.length > 0 && <PasswordStrengthBar password={newPassword} />}

          <PasswordInput
            id="confirm-password"
            label="Confirm Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(v) => { setError(""); setConfirmPassword(v) }}
          />

          {error && (
            <p className="flex items-center gap-1.5 text-sm text-red-400">
              <X className="h-3.5 w-3.5 flex-shrink-0" />
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={save} className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-9">
              <Check className="h-3.5 w-3.5" />
              Update Password
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={cancel}
              className="text-muted-foreground hover:text-foreground hover:bg-muted h-9"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        !success && (
          <p className="text-sm text-muted-foreground">Keep your account secure with a strong password.</p>
        )
      )}
    </div>
  )
}

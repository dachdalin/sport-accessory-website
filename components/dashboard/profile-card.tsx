"use client"

import { useState } from "react"
import { Pencil, Check, X } from "lucide-react"
import type { UserProfile } from "@/lib/dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  user: UserProfile
  onUserUpdate: (user: UserProfile) => void
}

const FIELDS = [
  { id: "name",  label: "Full Name", type: "text",  key: "name"  as const },
  { id: "email", label: "Email",     type: "email", key: "email" as const },
  { id: "phone", label: "Phone",     type: "tel",   key: "phone" as const },
] as const

export function ProfileCard({ user, onUserUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email, phone: user.phone })

  function save() {
    const initials = editForm.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    onUserUpdate({ ...user, ...editForm, initials })
    setIsEditing(false)
  }

  function startEditing() {
    setEditForm({ name: user.name, email: user.email, phone: user.phone })
    setIsEditing(true)
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Personal Info
        </h2>
        {!isEditing ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={startEditing}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-500/10 gap-1.5 h-8"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={save} className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-8">
              <Check className="h-3.5 w-3.5" />
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted h-8"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 flex-shrink-0 select-none">
          {user.initials}
        </div>
        <div>
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
        </div>
      </div>

      {/* Edit form or read view */}
      {isEditing ? (
        <div className="space-y-4">
          {FIELDS.map(({ id, label, type, key }) => (
            <div key={id} className="space-y-1.5">
              <Label htmlFor={id} className="text-muted-foreground text-sm">{label}</Label>
              <Input
                id={id}
                type={type}
                value={editForm[key]}
                onChange={(e) => setEditForm((p) => ({ ...p, [key]: e.target.value }))}
                className="h-11 border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/25"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-border">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email",     value: user.email },
            { label: "Phone",     value: user.phone },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-muted-foreground sm:w-32 flex-shrink-0">{label}</span>
              <span className="text-sm text-foreground">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

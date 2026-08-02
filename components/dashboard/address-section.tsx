"use client"

import { useState } from "react"
import { MapPin, Home, Plus, Trash2 } from "lucide-react"
import type { Address } from "@/lib/dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const INITIAL_ADDRESSES: Address[] = [
  { id: "1", label: "Home", line1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US" },
]

const EMPTY_ADDR: Omit<Address, "id"> = { label: "", line1: "", city: "", state: "", zip: "", country: "US" }

function AddressForm({
  value,
  onChange,
  onSave,
  onCancel,
}: {
  value: Omit<Address, "id">
  onChange: (v: Omit<Address, "id">) => void
  onSave: () => void
  onCancel: () => void
}) {
  const field = (key: keyof Omit<Address, "id">, label: string, placeholder: string, span?: boolean) => (
    <div className={`space-y-1 ${span ? "col-span-2" : ""}`}>
      <Label className="text-muted-foreground text-xs">{label}</Label>
      <Input
        placeholder={placeholder}
        value={value[key]}
        onChange={(e) => onChange({ ...value, [key]: e.target.value })}
        className="h-10 border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/25 text-sm"
      />
    </div>
  )

  return (
    <div className="mb-5 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 space-y-3">
      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">New Address</p>
      <div className="grid grid-cols-2 gap-3">
        {field("label",   "Label (e.g. Home, Office)", "Home",        true)}
        {field("line1",   "Street Address",             "123 Main St", true)}
        {field("city",    "City",                       "New York")}
        {field("state",   "State / Region",             "NY")}
        {field("zip",     "ZIP / Postal Code",          "10001")}
        {field("country", "Country",                    "US")}
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} className="bg-orange-500 hover:bg-orange-600 text-white h-8">
          Save Address
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="text-muted-foreground hover:text-foreground hover:bg-muted h-8">
          Cancel
        </Button>
      </div>
    </div>
  )
}

function AddressRow({ address, onDelete }: { address: Address; onDelete: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:border-orange-500/20 transition-colors">
      <div className="flex gap-3">
        <div className="h-9 w-9 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Home className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{address.label || "Address"}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{address.line1}</p>
          <p className="text-xs text-muted-foreground">
            {address.city}{address.state ? `, ${address.state}` : ""} {address.zip}
          </p>
          <p className="text-xs text-muted-foreground">{address.country}</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        aria-label="Remove address"
        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export function AddressSection() {
  const [addresses, setAddresses]     = useState<Address[]>(INITIAL_ADDRESSES)
  const [showForm, setShowForm]       = useState(false)
  const [newAddr, setNewAddr]         = useState<Omit<Address, "id">>(EMPTY_ADDR)

  function saveAddress() {
    if (!newAddr.line1 || !newAddr.city) return
    setAddresses((prev) => [...prev, { ...newAddr, id: String(Date.now()) }])
    setNewAddr(EMPTY_ADDR)
    setShowForm(false)
  }

  function deleteAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Saved Addresses
        </h2>
        <Button
          size="sm"
          onClick={() => setShowForm((v) => !v)}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-8"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {showForm && (
        <AddressForm
          value={newAddr}
          onChange={setNewAddr}
          onSave={saveAddress}
          onCancel={() => setShowForm(false)}
        />
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center py-12 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No saved addresses.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <AddressRow key={addr.id} address={addr} onDelete={() => deleteAddress(addr.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, ChevronLeft, Download, FileText, Tag } from "lucide-react"
import { MOCK_ORDERS, orderStatusClass, downloadInvoice, type Order } from "@/lib/dashboard"
import { Button } from "@/components/ui/button"

function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className={order.shipping === 0 ? "text-green-400 font-medium" : "text-foreground"}>
            {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
          </span>
        </div>
        {order.discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Tag className="h-3.5 w-3.5 text-green-400" />
              Discount
            </span>
            <span className="text-green-400 font-medium">−${order.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="h-px bg-border my-1" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">Total</span>
          <span className="text-lg font-black text-orange-600 dark:text-orange-400">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </button>
        <Button
          size="sm"
          onClick={() => downloadInvoice(order)}
          className="bg-muted hover:bg-muted/70 border border-border hover:border-border text-foreground gap-1.5 h-8"
        >
          <Download className="h-3.5 w-3.5" />
          Download Invoice
        </Button>
      </div>

      {/* Meta card */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {order.id}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto ${orderStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Items card */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Items ({order.products.length})
        </h3>
        <div className="space-y-4">
          {order.products.map((product, i) => (
            <div key={`${product.id}-${i}`} className="flex items-center gap-4">
              <Link
                href={`/product/${product.id}`}
                className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted/50 flex-shrink-0 border border-border"
              >
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.id}`}>
                  <p className="text-sm font-semibold text-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors line-clamp-1">
                    {product.name}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                  {product.size  && <span className="text-xs text-muted-foreground">Size: {product.size}</span>}
                  {product.color && <span className="text-xs text-muted-foreground">Color: {product.color}</span>}
                  <span className="text-xs text-muted-foreground">Qty: {product.qty}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-foreground">${(product.price * product.qty).toFixed(2)}</p>
                {product.qty > 1 && (
                  <p className="text-xs text-muted-foreground/70 mt-0.5">${product.price.toFixed(2)} each</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderSummary order={order} />
    </div>
  )
}

function OrderRow({ order, onSelect }: { order: Order; onSelect: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:border-orange-500/20 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
          <Package className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <button
            onClick={onSelect}
            className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline underline-offset-2 decoration-orange-600/40 dark:decoration-orange-400/40 hover:decoration-orange-700 dark:hover:decoration-orange-300 text-sm transition-colors text-left"
          >
            {order.id}
          </button>
          <p className="text-xs text-muted-foreground mt-0.5">
            {order.date} · {order.products.length} item{order.products.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end gap-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${orderStatusClass(order.status)}`}>
          {order.status}
        </span>
        <div className="flex items-center gap-2 sm:gap-1.5 sm:flex-col sm:items-end">
          <span className="font-bold text-foreground text-sm">${order.total.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => downloadInvoice(order)}
            className="h-7 px-2.5 bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground gap-1 text-xs"
          >
            <Download className="h-3 w-3" />
            Invoice
          </Button>
        </div>
      </div>
    </div>
  )
}

export function OrderSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedOrder = MOCK_ORDERS.find((o) => o.id === selectedId)

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedId(null)} />
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      <h2 className="text-lg font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Order History
      </h2>

      {MOCK_ORDERS.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Package className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground mb-4">No orders yet.</p>
          <Link href="/shop">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_ORDERS.map((order) => (
            <OrderRow key={order.id} order={order} onSelect={() => setSelectedId(order.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

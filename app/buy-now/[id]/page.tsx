import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { getProductById } from "@/lib/products"
import { BuyNowClient } from "./buy-now-client"

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ qty?: string; size?: string; color?: string }>
}

function BuyNowContent({ product, quantity, size, color }: {
  product: NonNullable<ReturnType<typeof getProductById>>
  quantity: number
  size?: string
  color?: string
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex-1">
          <BuyNowClient
            product={product}
            quantity={quantity}
            size={size}
            color={color}
          />
        </div>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default async function BuyNowPage({ params, searchParams }: Props) {
  const { id }                       = await params
  const { qty, size, color }         = await searchParams
  const product                      = getProductById(id)

  if (!product) notFound()

  const quantity = Math.max(1, Math.min(product.stock, parseInt(qty || "1", 10) || 1))

  return (
    <Suspense>
      <BuyNowContent
        product={product}
        quantity={quantity}
        size={size || product.sizes?.[0]}
        color={color || product.colors?.[0]}
      />
    </Suspense>
  )
}

import { ProductPageClient } from "./product-page-client"
import { products } from "@/lib/products"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductPageClient productId={id} />
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

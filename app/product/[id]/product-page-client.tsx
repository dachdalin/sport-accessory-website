"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider, useCart } from "@/lib/cart-context"
import { getProductById } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Minus, Plus, ShoppingCart, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"

function ProductContent({ productId }: { productId: string }) {
  const product = getProductById(productId)
  const { addItem } = useCart()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0])

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Link 
            href="/shop" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 
                  className="text-2xl md:text-3xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground capitalize">{product.category}</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 10 ? (
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-sm text-accent font-medium">Only {product.stock} left</span>
                ) : (
                  <span className="text-sm text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <h3 className="font-semibold mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="font-semibold mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">{product.description}</p>
                  <p className="text-muted-foreground mt-4">
                    Our {product.name} is designed with athletes in mind. Built with premium materials 
                    and tested for durability, this product will help you perform at your best. 
                    Whether you are training or competing, trust our gear to keep up with you.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-muted-foreground">Category</div>
                    <div className="capitalize">{product.category}</div>
                    <div className="text-muted-foreground">Rating</div>
                    <div>{product.rating} / 5</div>
                    {product.sizes && (
                      <>
                        <div className="text-muted-foreground">Available Sizes</div>
                        <div>{product.sizes.join(", ")}</div>
                      </>
                    )}
                    {product.colors && (
                      <>
                        <div className="text-muted-foreground">Available Colors</div>
                        <div>{product.colors.join(", ")}</div>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Shipping:</strong> Free standard shipping on orders over $50. 
                    Express shipping available at checkout. Delivery within 3-7 business days.
                  </p>
                  <p>
                    <strong className="text-foreground">Returns:</strong> We offer a 30-day hassle-free return policy. 
                    Items must be unused and in original packaging. Contact our support team to initiate a return.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function ProductPageClient({ productId }: { productId: string }) {
  return (
    <CartProvider>
      <ProductContent productId={productId} />
    </CartProvider>
  )
}

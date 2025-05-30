"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      price: 1299.99,
      originalPrice: 1599.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Destaque",
    },
    {
      id: 2,
      name: "Notebook Gamer Ultra",
      price: 2499.99,
      originalPrice: 2999.99,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Novo",
    },
    {
      id: 3,
      name: "Fone Bluetooth Premium",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 256,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Oferta",
    },
    {
      id: 4,
      name: "Smart TV 55' 4K",
      price: 1899.99,
      originalPrice: 2299.99,
      rating: 4.6,
      reviews: 178,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Destaque",
    },
  ]

  const { addItem, isInCart, getItemQuantity } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: "Marca", // You can add brand to your product data
      maxStock: 50, // You can add stock info to your product data
    })
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos em Destaque</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecionamos especialmente para você os melhores produtos com qualidade excepcional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3">{product.badge}</Badge>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(product.id.toString())
                      ? `No Carrinho (${getItemQuantity(product.id.toString())})`
                      : "Adicionar ao Carrinho"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Ver Todos os Produtos em Destaque
          </Button>
        </div>
      </div>
    </section>
  )
}

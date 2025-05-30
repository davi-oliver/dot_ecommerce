"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

export default function BestSellers() {
  const bestSellers = [
    {
      id: 1,
      name: "Tênis Esportivo Confort",
      price: 199.99,
      rating: 4.9,
      reviews: 342,
      image: "/placeholder.svg?height=200&width=200",
      sales: "500+ vendidos",
    },
    {
      id: 2,
      name: "Camiseta Premium Cotton",
      price: 79.99,
      rating: 4.7,
      reviews: 189,
      image: "/placeholder.svg?height=200&width=200",
      sales: "300+ vendidos",
    },
    {
      id: 3,
      name: "Mochila Executiva",
      price: 149.99,
      rating: 4.8,
      reviews: 267,
      image: "/placeholder.svg?height=200&width=200",
      sales: "250+ vendidos",
    },
    {
      id: 4,
      name: "Relógio Digital Smart",
      price: 399.99,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
      sales: "200+ vendidos",
    },
    {
      id: 5,
      name: "Perfume Masculino 100ml",
      price: 129.99,
      rating: 4.8,
      reviews: 298,
      image: "/placeholder.svg?height=200&width=200",
      sales: "400+ vendidos",
    },
    {
      id: 6,
      name: "Kit Skincare Completo",
      price: 89.99,
      rating: 4.9,
      reviews: 423,
      image: "/placeholder.svg?height=200&width=200",
      sales: "600+ vendidos",
    },
  ]

  const { addItem, isInCart, getItemQuantity } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      brand: "Marca",
      maxStock: 50,
    })
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Mais Vendidos</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Os produtos favoritos dos nossos clientes. Qualidade comprovada por milhares de pessoas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    {index < 3 && <Badge className="absolute -top-2 -left-2 bg-primary">#{index + 1}</Badge>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>

                    <p className="text-xs text-green-600 font-medium mb-2">{product.sales}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Ver Produto
                        </Button>
                        <Button size="sm" onClick={() => handleAddToCart(product)} className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {isInCart(product.id.toString()) ? "No Carrinho" : "Adicionar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Ver Ranking Completo
          </Button>
        </div>
      </div>
    </section>
  )
}

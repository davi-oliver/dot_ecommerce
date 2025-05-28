import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // Mock related products
  const relatedProducts = [
    {
      id: "2",
      name: "iPhone 15 Pro Max 256GB",
      price: 4299.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Novo",
    },
    {
      id: "3",
      name: "Xiaomi 14 Ultra 512GB",
      price: 2199.99,
      originalPrice: 2599.99,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Oferta",
    },
    {
      id: "4",
      name: "Google Pixel 8 Pro 256GB",
      price: 1899.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=200",
      badge: null,
    },
    {
      id: "5",
      name: "OnePlus 12 512GB",
      price: 2399.99,
      originalPrice: 2799.99,
      rating: 4.8,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Destaque",
    },
  ]

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Produtos Relacionados</h2>
        <p className="text-muted-foreground">Outros produtos que você pode gostar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Link href={`/produto/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {product.badge && <Badge className="absolute top-3 left-3">{product.badge}</Badge>}
              </div>

              <div className="p-4">
                <Link href={`/produto/${product.id}`}>
                  <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

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

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

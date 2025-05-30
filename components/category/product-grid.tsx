"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductPagination from "./product-pagination"
import { useCart } from "@/contexts/cart-context"

interface ProductGridProps {
  category: string
  searchParams: Record<string, string | undefined>
}

// Mock products data
const generateProducts = (category: string, page = 1) => {
  const productsPerPage = 12
  const totalProducts = 156

  const baseProducts = [
    {
      id: 1,
      name: "Smartphone Galaxy S24 Ultra 256GB",
      price: 2499.99,
      originalPrice: 2999.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Oferta",
      inStock: true,
      brand: "Samsung",
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max 512GB",
      price: 4299.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Novo",
      inStock: true,
      brand: "Apple",
    },
    {
      id: 3,
      name: "Notebook Gamer Alienware M15",
      price: 3999.99,
      originalPrice: 4499.99,
      rating: 4.7,
      reviews: 256,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Destaque",
      inStock: false,
      brand: "Dell",
    },
    {
      id: 4,
      name: "Smart TV LG OLED 65' 4K",
      price: 3299.99,
      originalPrice: 3799.99,
      rating: 4.6,
      reviews: 178,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Oferta",
      inStock: true,
      brand: "LG",
    },
    {
      id: 5,
      name: "Fone Sony WH-1000XM5",
      price: 899.99,
      originalPrice: 1199.99,
      rating: 4.9,
      reviews: 342,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Bestseller",
      inStock: true,
      brand: "Sony",
    },
    {
      id: 6,
      name: "Tablet iPad Air 5ª Geração",
      price: 1899.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      badge: null,
      inStock: true,
      brand: "Apple",
    },
  ]

  // Duplicate and modify products to simulate more items
  const allProducts = []
  for (let i = 0; i < Math.ceil(totalProducts / baseProducts.length); i++) {
    baseProducts.forEach((product, index) => {
      allProducts.push({
        ...product,
        id: i * baseProducts.length + index + 1,
        name: `${product.name} - Modelo ${i + 1}`,
      })
    })
  }

  const startIndex = (page - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage

  return {
    products: allProducts.slice(startIndex, endIndex),
    totalProducts,
    totalPages: Math.ceil(totalProducts / productsPerPage),
    currentPage: page,
  }
}

export default function ProductGrid({ category, searchParams }: ProductGridProps) {
  const currentPage = Number.parseInt(searchParams.page || "1")
  const { products, totalProducts, totalPages } = generateProducts(category, currentPage)

  const { addItem, isInCart, getItemQuantity } = useCart()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
      maxStock: 50,
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Eye className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
          <Button variant="outline">Limpar Filtros</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Link href={`/produto/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.badge && (
                    <Badge
                      className={`
                      ${product.badge === "Oferta" ? "bg-red-600" : ""}
                      ${product.badge === "Novo" ? "bg-green-600" : ""}
                      ${product.badge === "Destaque" ? "bg-blue-600" : ""}
                      ${product.badge === "Bestseller" ? "bg-purple-600" : ""}
                    `}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {!product.inStock && <Badge variant="secondary">Esgotado</Badge>}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/produto/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
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

                {/* Brand */}
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

                {/* Price */}
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

                {/* Add to Cart Button */}
                <Button
                  className="w-full"
                  size="sm"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock
                    ? isInCart(product.id.toString())
                      ? `No Carrinho (${getItemQuantity(product.id.toString())})`
                      : "Adicionar ao Carrinho"
                    : "Produto Esgotado"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <ProductPagination currentPage={currentPage} totalPages={totalPages} totalProducts={totalProducts} />
    </div>
  )
}

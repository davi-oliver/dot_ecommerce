"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface ProductInfoProps {
  product: any
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.color[0].value)
  const [selectedStorage, setSelectedStorage] = useState(product.variants.storage[0].value)
  const [quantity, setQuantity] = useState(1)

  const { addItem, isInCart, getItemQuantity } = useCart()

  const selectedStorageOption = product.variants.storage.find((s: any) => s.value === selectedStorage)
  const currentPrice = selectedStorageOption?.price || product.price

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    const selectedColorOption = product.variants.color.find((c: any) => c.value === selectedColor)
    const selectedStorageOption = product.variants.storage.find((s: any) => s.value === selectedStorage)

    addItem(
      {
        id: product.id,
        name: product.name,
        price: currentPrice,
        originalPrice: product.originalPrice,
        image: product.images[0],
        brand: product.brand,
        maxStock: product.stockQuantity,
        variant: {
          color: selectedColorOption?.name,
          storage: selectedStorageOption?.name,
        },
      },
      quantity,
    )
  }

  const currentVariant = {
    color: product.variants.color.find((c: any) => c.value === selectedColor)?.name,
    storage: product.variants.storage.find((s: any) => s.value === selectedStorage)?.name,
  }

  const itemInCart = isInCart(product.id, currentVariant)
  const cartQuantity = getItemQuantity(product.id, currentVariant)

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{product.brand}</Badge>
          {product.inStock ? (
            <Badge className="bg-green-100 text-green-800">Em Estoque</Badge>
          ) : (
            <Badge variant="destructive">Esgotado</Badge>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 font-medium">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">({product.reviewCount} avaliações)</span>
        </div>

        <p className="text-muted-foreground">{product.shortDescription}</p>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            R$ {currentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              R$ {product.originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          )}
          {product.discount && <Badge className="bg-red-100 text-red-800">{product.discount}% OFF</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">
          ou 12x de R$ {(currentPrice / 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} sem juros
        </p>
      </div>

      <Separator />

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">
          Cor: {product.variants.color.find((c: any) => c.value === selectedColor)?.name}
        </h3>
        <div className="flex gap-2">
          {product.variants.color.map((color: any) => (
            <Button
              key={color.value}
              variant={selectedColor === color.value ? "default" : "outline"}
              size="sm"
              disabled={!color.available}
              onClick={() => setSelectedColor(color.value)}
              className="min-w-[100px]"
            >
              {color.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Storage Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Armazenamento</h3>
        <div className="grid grid-cols-3 gap-2">
          {product.variants.storage.map((storage: any) => (
            <Button
              key={storage.value}
              variant={selectedStorage === storage.value ? "default" : "outline"}
              size="sm"
              disabled={!storage.available}
              onClick={() => setSelectedStorage(storage.value)}
              className="flex flex-col h-auto py-3"
            >
              <span className="font-medium">{storage.name}</span>
              <span className="text-xs">R$ {storage.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="font-semibold">Quantidade</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stockQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">{product.stockQuantity} unidades disponíveis</span>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" disabled={!product.inStock} onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          {itemInCart ? `Atualizar Carrinho (${cartQuantity + quantity})` : "Adicionar ao Carrinho"}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg">
            <Heart className="h-4 w-4 mr-2" />
            Favoritar
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        <Button variant="secondary" size="lg" className="w-full">
          Comprar Agora
        </Button>
      </div>

      {/* Benefits */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Frete Grátis</p>
              <p className="text-sm text-muted-foreground">Entrega em {product.shipping.estimatedDays}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Garantia Oficial</p>
              <p className="text-sm text-muted-foreground">{product.warranty}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium">Troca Grátis</p>
              <p className="text-sm text-muted-foreground">7 dias para trocar</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Info */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          <strong>SKU:</strong> {product.sku}
        </p>
        <p>
          <strong>Modelo:</strong> {product.model}
        </p>
        <p>
          <strong>Categoria:</strong> {product.category} › {product.subcategory}
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, X } from "lucide-react"
import { Label } from "@/components/ui/label"

interface ProductFiltersProps {
  searchParams: Record<string, string | undefined>
}

export default function ProductFilters({ searchParams }: ProductFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.priceMin || "0"),
    Number.parseInt(searchParams.priceMax || "5000"),
  ])

  const brands = [
    { name: "Samsung", count: 156 },
    { name: "Apple", count: 89 },
    { name: "Sony", count: 134 },
    { name: "LG", count: 98 },
    { name: "Xiaomi", count: 76 },
    { name: "Motorola", count: 45 },
  ]

  const ratings = [
    { stars: 5, count: 234 },
    { stars: 4, count: 456 },
    { stars: 3, count: 123 },
    { stars: 2, count: 45 },
    { stars: 1, count: 12 },
  ]

  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(currentSearchParams.toString())

    if (value === null || value === "") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push(window.location.pathname)
  }

  const activeFilters = Object.entries(searchParams).filter(([key, value]) => value && key !== "page" && key !== "sort")

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Filtros Ativos</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Limpar Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {key === "priceMin" && `Min: R$ ${value}`}
                  {key === "priceMax" && `Max: R$ ${value}`}
                  {key === "brand" && value}
                  {key === "rating" && `${value}+ estrelas`}
                  {key === "inStock" && "Em estoque"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateSearchParams(key, null)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Faixa de Preço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} min={0} step={50} className="w-full" />
          <div className="flex items-center justify-between text-sm">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              updateSearchParams("priceMin", priceRange[0].toString())
              updateSearchParams("priceMax", priceRange[1].toString())
            }}
          >
            Aplicar
          </Button>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={brand.name}
                  checked={searchParams.brand === brand.name}
                  onCheckedChange={(checked) => updateSearchParams("brand", checked ? brand.name : null)}
                />
                <Label htmlFor={brand.name} className="text-sm cursor-pointer">
                  {brand.name}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating.stars}`}
                  checked={searchParams.rating === rating.stars.toString()}
                  onCheckedChange={(checked) => updateSearchParams("rating", checked ? rating.stars.toString() : null)}
                />
                <Label htmlFor={`rating-${rating.stars}`} className="flex items-center space-x-1 cursor-pointer">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < rating.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">e acima</span>
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({rating.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={searchParams.inStock === "true"}
              onCheckedChange={(checked) => updateSearchParams("inStock", checked ? "true" : null)}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              Apenas produtos em estoque
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

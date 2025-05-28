"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  currentSort?: string
}

export default function ProductSort({ currentSort }: ProductSortProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortOptions = [
    { value: "relevance", label: "Mais Relevantes" },
    { value: "price-asc", label: "Menor Preço" },
    { value: "price-desc", label: "Maior Preço" },
    { value: "name-asc", label: "Nome A-Z" },
    { value: "name-desc", label: "Nome Z-A" },
    { value: "rating", label: "Melhor Avaliados" },
    { value: "newest", label: "Mais Recentes" },
    { value: "bestseller", label: "Mais Vendidos" },
  ]

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "relevance") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
      <Select value={currentSort || "relevance"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

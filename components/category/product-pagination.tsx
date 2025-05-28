"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductPaginationProps {
  currentPage: number
  totalPages: number
  totalProducts: number
}

export default function ProductPagination({ currentPage, totalPages, totalProducts }: ProductPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }

    router.push(`?${params.toString()}`)
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()
  const startItem = (currentPage - 1) * 12 + 1
  const endItem = Math.min(currentPage * 12, totalProducts)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
      <div className="text-sm text-muted-foreground">
        Mostrando {startItem}-{endItem} de {totalProducts} produtos
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => updatePage(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        {visiblePages.map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => typeof page === "number" && updatePage(page)}
            disabled={page === "..."}
            className="min-w-[40px]"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

import { Suspense } from "react"
import CategoryHeader from "@/components/category/category-header"
import ProductFilters from "@/components/category/product-filters"
import ProductGrid from "@/components/category/product-grid"
import ProductSort from "@/components/category/product-sort"
import Breadcrumbs from "@/components/category/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface CategoryPageProps {
  params: {
    categoria: string
  }
  searchParams: {
    page?: string
    sort?: string
    priceMin?: string
    priceMax?: string
    brand?: string
    rating?: string
    inStock?: string
  }
}

// Mock data - em produção viria de uma API
const getCategoryData = (categoria: string) => {
  const categories = {
    eletronicos: {
      name: "Eletrônicos",
      description: "Descubra os melhores produtos eletrônicos com tecnologia de ponta",
      totalProducts: 1247,
      image: "/placeholder.svg?height=200&width=1200",
    },
    roupas: {
      name: "Roupas",
      description: "Moda e estilo para todas as ocasiões",
      totalProducts: 856,
      image: "/placeholder.svg?height=200&width=1200",
    },
    "casa-jardim": {
      name: "Casa & Jardim",
      description: "Tudo para deixar sua casa ainda mais bonita",
      totalProducts: 623,
      image: "/placeholder.svg?height=200&width=1200",
    },
  }

  return (
    categories[categoria as keyof typeof categories] || {
      name: "Categoria",
      description: "Produtos selecionados especialmente para você",
      totalProducts: 0,
      image: "/placeholder.svg?height=200&width=1200",
    }
  )
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const categoryData = getCategoryData(params.categoria)

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6">
        <Breadcrumbs category={categoryData.name} />

        <CategoryHeader
          name={categoryData.name}
          description={categoryData.description}
          totalProducts={categoryData.totalProducts}
          image={categoryData.image}
        />

        <div className="flex gap-8 mt-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters searchParams={searchParams} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                      <ProductFilters searchParams={searchParams} />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">{categoryData.totalProducts} produtos encontrados</span>
              </div>

              <ProductSort currentSort={searchParams.sort} />
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid category={params.categoria} searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted rounded-lg h-64 mb-4"></div>
          <div className="space-y-2">
            <div className="bg-muted rounded h-4 w-3/4"></div>
            <div className="bg-muted rounded h-4 w-1/2"></div>
            <div className="bg-muted rounded h-6 w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

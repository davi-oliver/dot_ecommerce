import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface ProductBreadcrumbsProps {
  category: string
  subcategory: string
  productName: string
}

export default function ProductBreadcrumbs({ category, subcategory, productName }: ProductBreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Início
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href={`/categoria/${category.toLowerCase()}`} className="hover:text-foreground transition-colors">
        {category}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        href={`/categoria/${category.toLowerCase()}/${subcategory.toLowerCase()}`}
        className="hover:text-foreground transition-colors"
      >
        {subcategory}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium line-clamp-1">{productName}</span>
    </nav>
  )
}

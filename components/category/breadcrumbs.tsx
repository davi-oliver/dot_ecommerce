import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
  category: string
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <Link href="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Início
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/categorias" className="hover:text-foreground transition-colors">
        Categorias
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">{category}</span>
    </nav>
  )
}

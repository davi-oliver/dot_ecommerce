import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shirt, Home, Dumbbell, Book, Gamepad2, Camera, Watch } from "lucide-react"
import Link from "next/link"

export default function CategoriesSection() {
  const categories = [
    { name: "Eletrônicos", icon: Smartphone, href: "/categoria/eletronicos", color: "bg-blue-100 text-blue-600" },
    { name: "Roupas", icon: Shirt, href: "/categoria/roupas", color: "bg-pink-100 text-pink-600" },
    { name: "Casa & Jardim", icon: Home, href: "/categoria/casa-jardim", color: "bg-green-100 text-green-600" },
    { name: "Esportes", icon: Dumbbell, href: "/categoria/esportes", color: "bg-orange-100 text-orange-600" },
    { name: "Livros", icon: Book, href: "/categoria/livros", color: "bg-purple-100 text-purple-600" },
    { name: "Games", icon: Gamepad2, href: "/categoria/games", color: "bg-red-100 text-red-600" },
    { name: "Câmeras", icon: Camera, href: "/categoria/cameras", color: "bg-yellow-100 text-yellow-600" },
    { name: "Relógios", icon: Watch, href: "/categoria/relogios", color: "bg-indigo-100 text-indigo-600" },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Nossas Categorias</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre exatamente o que você está procurando navegando por nossas categorias organizadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

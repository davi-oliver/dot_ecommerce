import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent, Gift } from "lucide-react"
import Image from "next/image"

export default function PromotionsSection() {
  const promotions = [
    {
      id: 1,
      title: "Flash Sale - 50% OFF",
      description: "Eletrônicos selecionados com desconto imperdível",
      discount: "50%",
      timeLeft: "2h 30m",
      image: "/placeholder.svg?height=200&width=400",
      type: "flash",
      buttonText: "Aproveitar Agora",
    },
    {
      id: 2,
      title: "Frete Grátis",
      description: "Em compras acima de R$ 199",
      discount: "Grátis",
      image: "/placeholder.svg?height=200&width=400",
      type: "shipping",
      buttonText: "Comprar Agora",
    },
    {
      id: 3,
      title: "Combo Especial",
      description: "Leve 3 e pague 2 em produtos selecionados",
      discount: "3x2",
      image: "/placeholder.svg?height=200&width=400",
      type: "combo",
      buttonText: "Ver Produtos",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Percent className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Promoções Especiais</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não perca essas ofertas incríveis! Descontos limitados e condições especiais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={promo.image || "/placeholder.svg"}
                    alt={promo.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Badge className="bg-red-600 text-white mb-2 text-lg px-3 py-1">{promo.discount} OFF</Badge>
                      {promo.timeLeft && (
                        <div className="flex items-center justify-center text-sm mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          Termina em: {promo.timeLeft}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{promo.title}</h3>
                  <p className="text-muted-foreground mb-4">{promo.description}</p>
                  <Button className="w-full" size="lg">
                    {promo.type === "flash" && <Clock className="h-4 w-4 mr-2" />}
                    {promo.type === "shipping" && <Gift className="h-4 w-4 mr-2" />}
                    {promo.type === "combo" && <Percent className="h-4 w-4 mr-2" />}
                    {promo.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Não Perca Nenhuma Promoção!</h3>
            <p className="mb-6 opacity-90">Cadastre-se e receba ofertas exclusivas diretamente no seu email</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Seu melhor email" className="flex-1 px-4 py-2 rounded-md text-black" />
              <Button variant="secondary" className="px-8">
                Cadastrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

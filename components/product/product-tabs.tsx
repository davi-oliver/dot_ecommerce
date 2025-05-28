"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ProductTabsProps {
  product: any
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-15",
      title: "Excelente produto!",
      comment:
        "Superou minhas expectativas. A qualidade da câmera é impressionante e a bateria dura o dia todo. Recomendo!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      user: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-10",
      title: "Muito bom, mas caro",
      comment:
        "Produto de excelente qualidade, mas o preço é um pouco salgado. A performance é ótima para jogos e aplicativos pesados.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      user: "Pedro Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-05",
      title: "Melhor smartphone que já tive",
      comment:
        "A S Pen faz toda a diferença no dia a dia. A tela é linda e a qualidade de construção é premium. Vale cada centavo!",
      helpful: 15,
      verified: false,
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 198, percentage: 61 },
    { stars: 4, count: 89, percentage: 27 },
    { stars: 3, count: 26, percentage: 8 },
    { stars: 2, count: 8, percentage: 3 },
    { stars: 1, count: 3, percentage: 1 },
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Descrição</TabsTrigger>
        <TabsTrigger value="specifications">Especificações</TabsTrigger>
        <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Descrição do Produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div>
              <h3 className="font-semibold mb-3">Principais Características:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="space-y-4">
          {Object.entries(product.specifications).map(([category, specs]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {Object.entries(specs as Record<string, string>).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-muted last:border-0"
                    >
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          {/* Rating Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliações dos Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{product.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{product.reviewCount} avaliações</p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Write Review */}
          <Card>
            <CardHeader>
              <CardTitle>Escrever Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Sua avaliação</label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                  ))}
                </div>
              </div>
              <Textarea placeholder="Conte sobre sua experiência com este produto..." />
              <Button>Publicar Avaliação</Button>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Compra Verificada
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Útil ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Não útil
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">Carregar Mais Avaliações</Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">Este produto vem com carregador?</h4>
                <p className="text-muted-foreground">
                  Sim, o produto inclui carregador rápido de 45W e cabo USB-C na caixa.
                </p>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">A S Pen precisa ser carregada?</h4>
                <p className="text-muted-foreground">
                  Não, a S Pen não precisa de carregamento. Ela funciona por indução magnética.
                </p>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-medium mb-2">Qual a diferença entre as versões de armazenamento?</h4>
                <p className="text-muted-foreground">
                  A diferença está apenas na capacidade de armazenamento interno. Todas as versões têm a mesma RAM e
                  processador.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">O produto é resistente à água?</h4>
                <p className="text-muted-foreground">
                  Sim, possui certificação IP68, sendo resistente à água e poeira.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

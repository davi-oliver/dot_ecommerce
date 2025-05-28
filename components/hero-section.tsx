import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Descubra os
              <span className="text-primary"> Melhores Produtos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Encontre tudo o que você precisa com os melhores preços e qualidade garantida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Comprar Agora
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Ver Ofertas
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Hero Image"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

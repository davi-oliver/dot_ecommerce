import Image from "next/image"

interface CategoryHeaderProps {
  name: string
  description: string
  totalProducts: number
  image: string
}

export default function CategoryHeader({ name, description, totalProducts, image }: CategoryHeaderProps) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 mb-8">
      <div className="absolute inset-0">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover opacity-20" />
      </div>
      <div className="relative p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{name}</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-2xl">{description}</p>
        <p className="text-sm font-medium">{totalProducts.toLocaleString()} produtos disponíveis</p>
      </div>
    </div>
  )
}

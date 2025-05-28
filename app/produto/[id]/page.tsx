import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductBreadcrumbs from "@/components/product/product-breadcrumbs"
import ProductGallery from "@/components/product/product-gallery"
import ProductInfo from "@/components/product/product-info"
import ProductTabs from "@/components/product/product-tabs"
import RelatedProducts from "@/components/product/related-products"
import ProductSchema from "@/components/product/product-schema"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Mock product data - em produção viria de uma API
const getProduct = async (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Smartphone Galaxy S24 Ultra 256GB",
      brand: "Samsung",
      model: "SM-S928B",
      sku: "SAM-S24U-256-BLK",
      price: 2499.99,
      originalPrice: 2999.99,
      discount: 17,
      rating: 4.8,
      reviewCount: 324,
      inStock: true,
      stockQuantity: 15,
      category: "Eletrônicos",
      subcategory: "Smartphones",
      shortDescription:
        "O smartphone mais avançado da Samsung com câmera de 200MP, S Pen integrada e tela Dynamic AMOLED 2X de 6.8 polegadas.",
      description:
        "O Galaxy S24 Ultra redefine o que é possível em um smartphone. Com sua câmera de 200MP, você captura cada detalhe com clareza impressionante. A S Pen integrada oferece precisão profissional para suas anotações e criações. A tela Dynamic AMOLED 2X de 6.8 polegadas proporciona cores vibrantes e brilho excepcional.",
      images: [
        "/placeholder.svg?height=600&width=600&text=Galaxy+S24+Ultra+Front",
        "/placeholder.svg?height=600&width=600&text=Galaxy+S24+Ultra+Back",
        "/placeholder.svg?height=600&width=600&text=Galaxy+S24+Ultra+Side",
        "/placeholder.svg?height=600&width=600&text=Galaxy+S24+Ultra+Camera",
        "/placeholder.svg?height=600&width=600&text=Galaxy+S24+Ultra+Screen",
      ],
      variants: {
        color: [
          { name: "Preto Titânio", value: "black", available: true },
          { name: "Cinza Titânio", value: "gray", available: true },
          { name: "Violeta", value: "violet", available: false },
          { name: "Amarelo", value: "yellow", available: true },
        ],
        storage: [
          { name: "256GB", value: "256gb", price: 2499.99, available: true },
          { name: "512GB", value: "512gb", price: 2799.99, available: true },
          { name: "1TB", value: "1tb", price: 3299.99, available: true },
        ],
      },
      specifications: {
        Tela: {
          Tamanho: "6.8 polegadas",
          Tipo: "Dynamic AMOLED 2X",
          Resolução: "3120 x 1440 pixels",
          "Taxa de Atualização": "120Hz adaptativo",
          Brilho: "2600 nits",
          Proteção: "Gorilla Glass Armor",
        },
        Câmera: {
          Principal: "200MP f/1.7 OIS",
          "Ultra Wide": "12MP f/2.2",
          Telefoto: "50MP f/3.4 OIS (5x zoom)",
          "Telefoto Periscópio": "10MP f/2.4 OIS (3x zoom)",
          Frontal: "12MP f/2.2",
          "Gravação de Vídeo": "8K a 30fps, 4K a 60fps",
        },
        Performance: {
          Processador: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Armazenamento: "256GB UFS 4.0",
          Sistema: "Android 14 com One UI 6.1",
          IA: "Galaxy AI integrada",
        },
        "Bateria e Conectividade": {
          Bateria: "5000mAh",
          Carregamento: "45W com fio, 15W sem fio",
          "5G": "Sub-6GHz e mmWave",
          "Wi-Fi": "Wi-Fi 7",
          Bluetooth: "5.3",
          USB: "USB-C 3.2",
        },
        Design: {
          Dimensões: "162.3 x 79.0 x 8.6 mm",
          Peso: "232g",
          Material: "Titânio",
          Resistência: "IP68",
          "S Pen": "Incluída",
        },
      },
      features: [
        "S Pen integrada com latência ultra-baixa",
        "Câmera com zoom óptico de 5x",
        "Gravação em 8K",
        "Galaxy AI para edição inteligente",
        "Tela sempre ligada",
        "Carregamento sem fio reverso",
        "Resistente à água IP68",
        "7 anos de atualizações de segurança",
      ],
      warranty: "12 meses de garantia oficial Samsung",
      shipping: {
        free: true,
        estimatedDays: "2-3 dias úteis",
        express: {
          available: true,
          price: 29.99,
          estimatedDays: "24 horas",
        },
      },
    },
  }

  return products[id as keyof typeof products] || null
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductSchema product={product} />

      <div className="container px-4 py-6">
        <ProductBreadcrumbs category={product.category} subcategory={product.subcategory} productName={product.name} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
          <ProductTabs product={product} />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded-lg mt-12" />}>
          <RelatedProducts categoryId={product.category} currentProductId={product.id} />
        </Suspense>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Produto não encontrado",
    }
  }

  return {
    title: `${product.name} - EcommerceStore`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  }
}

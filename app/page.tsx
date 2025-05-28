import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CategoriesSection from "@/components/categories-section"
import FeaturedProducts from "@/components/featured-products"
import BestSellers from "@/components/best-sellers"
import PromotionsSection from "@/components/promotions-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BestSellers />
        <PromotionsSection />
      </main>
      <Footer />
    </div>
  )
}

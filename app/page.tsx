import { HeroSection } from "@/components/hero-section"
import { RoadSystemSection } from "@/components/road-system-section"
import { MLVisualizationSection } from "@/components/ml-visualization-section"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/auth">
          <Button className="border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Sign In
          </Button>
        </Link>
      </div>

      <HeroSection />
      <RoadSystemSection />
      <MLVisualizationSection />
      <Footer />
    </main>
  )
}

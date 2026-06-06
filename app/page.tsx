import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  )
}

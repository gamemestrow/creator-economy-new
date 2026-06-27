import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import dynamic from 'next/dynamic'

const Features = dynamic(() => import('@/components/features').then(mod => mod.Features))
const Pricing = dynamic(() => import('@/components/pricing').then(mod => mod.Pricing))
const Testimonials = dynamic(() => import('@/components/testimonials').then(mod => mod.Testimonials))
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer))
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

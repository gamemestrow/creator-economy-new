'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.02)] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/cloud-logo.png" alt="Cloud" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">Cloud</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition">
              Testimonials
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-foreground hover:text-foreground font-medium">
              Log in
            </Link>
            <Link href="/dashboard" className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-hover transition-all duration-250 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.05)] font-medium hover:scale-[1.02]">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border">
            <Link href="#features" className="block py-2 text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="block py-2 text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#testimonials" className="block py-2 text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#faq" className="block py-2 text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1 text-center py-2 text-foreground border border-border rounded-lg">
                Log in
              </Link>
              <Link href="/dashboard" className="flex-1 text-center py-2 bg-primary text-primary-foreground rounded-[14px]">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

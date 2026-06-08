'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/cloud-logo.png" alt="Cloud" className="h-8 w-8" />
            <span className="text-xl font-bold text-slate-900">Cloud</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 transition">
              Testimonials
            </Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-900 transition">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-700 hover:text-slate-900 font-medium">
              Log in
            </Link>
            <Link href="/dashboard/main" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-medium">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-gray-200">
            <Link href="#features" className="block py-2 text-slate-600 hover:text-slate-900">
              Features
            </Link>
            <Link href="#pricing" className="block py-2 text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
            <Link href="#testimonials" className="block py-2 text-slate-600 hover:text-slate-900">
              Testimonials
            </Link>
            <Link href="#faq" className="block py-2 text-slate-600 hover:text-slate-900">
              FAQ
            </Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1 text-center py-2 text-slate-700 border border-slate-300 rounded-lg">
                Log in
              </Link>
              <Link href="/dashboard/main" className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

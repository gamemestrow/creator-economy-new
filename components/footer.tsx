'use client'

import Link from 'next/link'
import { Mail, Share2, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#65735A] text-[#EAECEB] py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white lowercase">
                tag<span className="text-[#E8E3D3]">mango</span>
              </span>
            </div>
            <p className="text-sm text-[#D1D5D2]">
              The all-in-one platform for creators to manage, monetize, and grow their audience.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-[#E8E3D3] transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-[#E8E3D3] transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#E8E3D3] transition-colors">Dashboard</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">API Docs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-[#E8E3D3] transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#D1D5D2]">
              © 2026 TagMango. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-[#D1D5D2] hover:text-[#E8E3D3] transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[#D1D5D2] hover:text-[#E8E3D3] transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="mailto:hello@tagmango.com" className="text-[#D1D5D2] hover:text-[#E8E3D3] transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

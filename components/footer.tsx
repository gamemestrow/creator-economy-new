'use client'

import Link from 'next/link'
import { Mail, Share2, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/cloud-logo.png" alt="Cloud" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Cloud</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The all-in-one platform for creators to manage, monetize, and grow their audience.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition">API Docs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              <li><Link href="#" className="hover:text-white transition">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Cloud. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-white transition">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-white transition">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="mailto:hello@cloud.app" className="text-muted-foreground hover:text-white transition">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

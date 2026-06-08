'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight text-balance">
              Empower Your Creator Journey
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Cloud is the all-in-one platform for creators to manage their audience, monetize content, and scale their business effortlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard/main" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-900 px-8 py-3 rounded-full font-semibold hover:border-slate-400 transition">
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            <div>
              <p className="text-3xl font-bold text-slate-900">10K+</p>
              <p className="text-sm text-slate-600">Active Creators</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">$50M+</p>
              <p className="text-sm text-slate-600">Revenue Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">95%</p>
              <p className="text-sm text-slate-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Right Image/Visual */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">$12,450</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Audience</p>
                  <p className="text-xl font-bold text-slate-900">25,348</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Engagement</p>
                  <p className="text-xl font-bold text-slate-900">8.5%</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Active Courses</p>
                <div className="flex gap-2 mt-2">
                  <div className="h-2 flex-1 bg-blue-600 rounded-full" />
                  <div className="h-2 flex-1 bg-blue-300 rounded-full" />
                  <div className="h-2 flex-1 bg-blue-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

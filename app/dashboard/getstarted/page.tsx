'use client'

import { useState } from 'react'
import { AlertTriangle, Check, Play, Volume2, Maximize, ChevronRight, Laptop } from 'lucide-react'

export default function GetStartedPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="space-y-6">
      {/* KYC Warning Banner */}
      <div className="bg-[#1D1035] text-white rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#2D1B4E]">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-2.5 bg-[#ff823a]/10 text-[#ff823a] rounded-lg mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[#ff823a] font-bold text-lg mb-1">Important!</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your KYC details have not been updated yet. This will prevent any future withdrawals from this account. 
              Update your KYC now to ensure a smooth withdrawal experience!
            </p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-[#e06a28] hover:bg-[#ff733b] text-white text-sm font-semibold rounded-lg transition shrink-0">
          Update KYC
        </button>
      </div>

      {/* Greeting Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hello Tannu, welcome!</h1>
        <p className="text-gray-600 text-sm mt-1">Your monetisation journey on TagMango starts here!</p>
      </div>

      {/* Let's Get Started Checklist and Video Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        
        {/* Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Let&apos;s get started</h2>
            <p className="text-gray-500 text-sm mt-1">2 out of 4 steps completed</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="text-gray-400 font-medium line-through text-sm md:text-base">
                Create account
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="text-gray-400 font-medium line-through text-sm md:text-base">
                Setup your first offering: We call it a mango
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <span className="text-gray-700 font-semibold text-sm md:text-base hover:text-green-600 cursor-pointer transition">
                Create & link your digital product
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                4
              </div>
              <span className="text-gray-700 font-semibold text-sm md:text-base hover:text-orange-500 cursor-pointer transition">
                Setup your bank account
              </span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div 
            className="relative bg-slate-900 aspect-video rounded-lg overflow-hidden group cursor-pointer border border-slate-800"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Play overlay or mock interface */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: "url('/cloud-logo.png')" }}></div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
              {/* Header */}
              <div className="text-white text-xs font-medium bg-black/40 px-2.5 py-1 rounded w-fit">
                TagMango Walkthrough
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <div className="self-center w-14 h-14 bg-white/90 hover:bg-white text-[#e06a28] rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              )}

              {/* Custom video UI controls */}
              <div className="w-full space-y-2 bg-black/60 p-2.5 rounded-lg border border-white/10">
                {/* Progress bar */}
                <div className="h-1 bg-white/20 rounded overflow-hidden">
                  <div className="w-1/3 h-full bg-[#ff823a]"></div>
                </div>
                {/* Time and options */}
                <div className="flex items-center justify-between text-[10px] text-white/90 font-medium">
                  <div className="flex items-center gap-2">
                    <Play className="w-3 h-3 fill-current" />
                    <span>0:00 / 4:29</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" />
                    <Maximize className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide description */}
      <div className="bg-[#fcfbf9] border border-gray-100 rounded-xl p-5 flex items-center justify-between hover:border-gray-200 transition cursor-pointer">
        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
          Conduct workshops, live Q&As, community calls and more. Also set up email and whatsapp reminders 
          for workshops from <strong className="text-gray-800">Automation &gt; Email Automation</strong>.
        </p>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
      </div>

      {/* Create Mango Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Create a Mango Page</h3>
        
        <div className="bg-white border border-gray-100 hover:border-orange-200 hover:shadow-md rounded-xl p-6 transition cursor-pointer group flex items-start gap-4 max-w-xl">
          <div className="p-3 bg-gray-50 text-slate-700 rounded-lg group-hover:bg-orange-50 group-hover:text-[#e06a28] transition">
            <Laptop className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 group-hover:text-[#e06a28] transition">Build a Landing Page</h4>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#e06a28] group-hover:translate-x-1 transition" />
            </div>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Choose pre-defined templates or create a landing page from scratch to promote your mangoes to 
              your audience and increase your conversions. Start building!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

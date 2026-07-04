'use client'

import { useState } from 'react'
import { 
  Play, RefreshCw, Search, Plus, Info, Edit2, Share2, MoreHorizontal, ArrowUpDown, ChevronDown
} from 'lucide-react'

interface MangoItem {
  id: string
  title: string
  price: string
  priceType: string
  activeUsers: number
  startDate: string
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
}

export default function MangoesPage() {
  const [showFreeMangoes, setShowFreeMangoes] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const mangoes: MangoItem[] = [
    {
      id: '6a212d3a0c528cbcdbefb29e0',
      title: 'workshop related literature',
      price: '₹50+',
      priceType: 'onetime',
      activeUsers: 0,
      startDate: '04 Jun, 2026',
      status: 'ACTIVE'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Video Walkthrough Breadcrumb Banner */}
      <div className="bg-[#EBF5FF] border border-[#D0E7FF] text-[#1E40AF] rounded-lg px-4 py-3 flex items-center justify-between text-sm font-semibold">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-[#78866B] text-white rounded-full flex items-center justify-center">
            <Play className="w-3 h-3 fill-current translate-x-0.5" />
          </div>
          <span>Video walkthrough &gt; Mango flow</span>
        </div>
        <button className="text-[#78866B] hover:text-[#78866B] tracking-wide text-xs font-bold transition">
          WATCH
        </button>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Mangoes</h1>
            <div className="flex items-center gap-2 select-none">
              {/* Toggle Switch */}
              <button 
                onClick={() => setShowFreeMangoes(!showFreeMangoes)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showFreeMangoes ? 'bg-[#78866B]' : 'bg-card'
                }`}
              >
                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showFreeMangoes ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
              <span className="text-xs font-semibold text-muted-foreground">Show free mangoes</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Last updated 3 minutes ago.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#78866B] hover:bg-[#ff733b] text-white text-sm font-bold rounded-lg transition shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create new mango</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-foreground hover:bg-card text-white text-sm font-bold rounded-lg transition shadow-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
        <div className="relative flex items-center bg-muted border border-border rounded-lg px-3 py-2.5 max-w-xl group focus-within:border-border focus-within:bg-white transition-colors">
          <Search className="w-4 h-4 text-muted-foreground mr-2 group-focus-within:text-muted-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search by mango title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Mangoes Data Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
                    <span>Price</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
                    <span>Active Users</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
                    <span>Start Date</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
                    <span>Status</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mangoes.map((mango) => (
                <tr key={mango.id} className="hover:bg-muted/50 transition">
                  {/* Title and ID */}
                  <td className="py-5 px-6 border-b border-gray-50">
                    <div className="space-y-1">
                      <p className="font-bold text-foreground hover:text-[#78866B] cursor-pointer transition">
                        {mango.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-tight">
                        mango id: {mango.id}
                      </p>
                    </div>
                  </td>
                  
                  {/* Price */}
                  <td className="py-5 px-6 border-b border-gray-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-foreground">{mango.price}</span>
                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </div>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        {mango.priceType}
                      </p>
                    </div>
                  </td>
                  
                  {/* Active Users */}
                  <td className="py-5 px-6 border-b border-gray-50 font-bold text-foreground">
                    {mango.activeUsers}
                  </td>
                  
                  {/* Start Date */}
                  <td className="py-5 px-6 border-b border-gray-50 text-sm font-semibold text-muted-foreground">
                    {mango.startDate}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-5 px-6 border-b border-gray-50">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#22C55E] text-white tracking-wide">
                      {mango.status}
                    </span>
                  </td>
                  
                  {/* Action Icons */}
                  <td className="py-5 px-6 border-b border-gray-50 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button className="p-2 bg-muted hover:bg-muted hover:text-foreground border border-border text-muted-foreground rounded-lg transition" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-muted hover:bg-muted hover:text-foreground border border-border text-muted-foreground rounded-lg transition" title="Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-muted hover:bg-muted hover:text-foreground border border-border text-muted-foreground rounded-lg transition" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

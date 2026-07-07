'use client'

import { useState } from 'react'
import { FileText, Video, Archive, Download, Search, Eye, HardDrive, FolderOpen, File } from 'lucide-react'
import { cn } from '@/lib/utils'

const DOWNLOADS = [
  { id: 1, name: 'React Hooks Cheatsheet.pdf', course: 'React Fundamentals', type: 'PDF', size: '2.4 MB', date: 'Jun 15, 2026', color: '#D96A5F' },
  { id: 2, name: 'TypeScript Quick Reference.pdf', course: 'Advanced TypeScript', type: 'PDF', size: '1.8 MB', date: 'May 28, 2026', color: '#D96A5F' },
  { id: 3, name: 'Component Design Patterns.pdf', course: 'React Fundamentals', type: 'PDF', size: '3.1 MB', date: 'Jun 10, 2026', color: '#D96A5F' },
  { id: 4, name: 'Module 5 — Lecture Recording.mp4', course: 'Full-Stack Development', type: 'Video', size: '421 MB', date: 'Jun 20, 2026', color: '#7B8FA1' },
  { id: 5, name: 'Course Project Starter.zip', course: 'React Fundamentals', type: 'ZIP', size: '18.2 MB', date: 'Jun 15, 2026', color: '#D4A13A' },
  { id: 6, name: 'CSS Grid Template.pdf', course: 'CSS Mastery', type: 'PDF', size: '1.2 MB', date: 'Apr 11, 2026', color: '#D96A5F' },
  { id: 7, name: 'Interview Prep Guide.pdf', course: 'Career Q&A Webinar', type: 'PDF', size: '4.5 MB', date: 'Jun 28, 2026', color: '#D96A5F' },
  { id: 8, name: 'Workshop Slides.pdf', course: 'Advanced React Patterns', type: 'PDF', size: '8.3 MB', date: 'Jul 1, 2026', color: '#D96A5F' },
  { id: 9, name: 'Assets Pack.zip', course: 'CSS Mastery', type: 'ZIP', size: '56 MB', date: 'Apr 12, 2026', color: '#D4A13A' },
  { id: 10, name: 'Node.js Project Template.zip', course: 'Node.js & Express', type: 'ZIP', size: '12.4 MB', date: 'Feb 6, 2026', color: '#D4A13A' },
]

const FILTERS = ['All', 'PDFs', 'Videos', 'Templates', 'ZIPs']
const filterMap: Record<string, string | null> = {
  All: null, PDFs: 'PDF', Videos: 'Video', Templates: 'PDF', ZIPs: 'ZIP',
}

const typeIcon: Record<string, typeof File> = {
  PDF: FileText,
  Video: Video,
  ZIP: Archive,
}

export default function DownloadsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const totalSize = '530 MB'

  const filtered = DOWNLOADS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.course.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = !filterMap[filter] || d.type === filterMap[filter]
    return matchesSearch && matchesFilter
  })

  const recent = DOWNLOADS.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2933]">Downloads</h1>
          <p className="text-sm text-[#6B7280]">Access all your course resources and materials</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] bg-white px-4 py-2.5 text-sm text-[#6B7280]">
          <HardDrive className="h-4 w-4" /> {totalSize} used
        </div>
      </div>

      {/* Recent Downloads */}
      <div>
        <h2 className="mb-3 text-sm font-bold text-[#1F2933]">Recently Downloaded</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {recent.map(d => {
            const Icon = typeIcon[d.type] || File
            return (
              <div key={d.id} className="flex items-center gap-3 rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: d.color + '18' }}>
                  <Icon className="h-5 w-5" style={{ color: d.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-[#1F2933]">{d.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{d.size} · {d.date}</p>
                </div>
                <button className="shrink-0 rounded-lg border border-[#E4E6DE] p-1.5 text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <input type="text" placeholder="Search downloads..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E4E6DE] bg-white py-2.5 pl-9 pr-4 text-sm text-[#1F2933] outline-none placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20" />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('rounded-full px-3 py-2 text-xs font-semibold transition-all', filter === f
                ? 'bg-[#78866B] text-white'
                : 'border border-[#E4E6DE] bg-white text-[#6B7280] hover:text-[#78866B]')}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* All Files */}
      <div className="rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm overflow-hidden">
        <div className="border-b border-[#E4E6DE] p-5">
          <h2 className="text-sm font-bold text-[#1F2933]">All Files <span className="ml-1.5 rounded-full bg-[#F3F4EF] px-2 py-0.5 text-[11px] text-[#6B7280]">{filtered.length}</span></h2>
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="h-10 w-10 text-[#9AA59E]" />
            <p className="mt-3 text-sm font-semibold text-[#1F2933]">No files found</p>
            <p className="mt-1 text-xs text-[#6B7280]">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F3F4EF]">
            {filtered.map(d => {
              const Icon = typeIcon[d.type] || File
              return (
                <div key={d.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8F8F5] transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: d.color + '18' }}>
                    <Icon className="h-5 w-5" style={{ color: d.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1F2933]">{d.name}</p>
                    <p className="text-xs text-[#6B7280]">{d.course}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium text-[#1F2933]">{d.size}</p>
                    <p className="text-[10px] text-[#6B7280]">{d.date}</p>
                  </div>
                  <span className={cn('shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold',
                    d.type === 'PDF' ? 'border-[#D96A5F]/20 bg-[#D96A5F]/10 text-[#D96A5F]' :
                    d.type === 'Video' ? 'border-[#7B8FA1]/20 bg-[#7B8FA1]/10 text-[#7B8FA1]' :
                    'border-[#D4A13A]/20 bg-[#D4A13A]/10 text-[#D4A13A]')}>
                    {d.type}
                  </span>
                  <div className="flex shrink-0 gap-1.5">
                    <button className="rounded-lg border border-[#E4E6DE] p-1.5 text-[#6B7280] hover:text-[#78866B] transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-lg border border-[#E4E6DE] p-1.5 text-[#6B7280] hover:text-[#78866B] transition-colors">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Bookmark, BookOpen, FileText, Users, Radio, Search, Trash2, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

type BookmarkTab = 'Lessons' | 'Posts' | 'Courses' | 'Resources' | 'Events'

const BOOKMARKS: Record<BookmarkTab, Array<{ id: number; title: string; source: string; date: string; color: string }>> = {
  Lessons: [
    { id: 1, title: 'Lesson 8: Custom Hooks in React', source: 'React Fundamentals', date: 'Jul 2, 2026', color: '#78866B' },
    { id: 2, title: 'Lesson 5: Conditional Types', source: 'Advanced TypeScript', date: 'Jun 25, 2026', color: '#7B8FA1' },
    { id: 3, title: 'Lesson 12: CSS Grid Deep Dive', source: 'CSS Mastery', date: 'Jun 18, 2026', color: '#B88A5A' },
  ],
  Posts: [
    { id: 4, title: 'My CSS Grid + Flexbox Cheatsheet', source: 'Alex Johnson · Community', date: 'Jun 30, 2026', color: '#4F8A5B' },
    { id: 5, title: 'How I landed my first dev job', source: 'Sarah Chen · Community', date: 'Jun 22, 2026', color: '#78866B' },
  ],
  Courses: [
    { id: 6, title: 'Full-Stack Development with React & Node', source: 'Maria Full Stack', date: 'Jul 1, 2026', color: '#B88A5A' },
    { id: 7, title: 'System Design for Interviews', source: 'Rahul Sharma', date: 'Jun 28, 2026', color: '#78866B' },
  ],
  Resources: [
    { id: 8, title: 'TypeScript Generic Patterns Guide', source: 'Advanced TypeScript', date: 'Jun 29, 2026', color: '#D4A13A' },
    { id: 9, title: 'Node.js Performance Checklist', source: 'Node.js & Express', date: 'Jun 15, 2026', color: '#4F8A5B' },
  ],
  Events: [
    { id: 10, title: 'Advanced React Patterns Workshop', source: 'Jul 10, 2026 · Sarah Chen', date: 'Jul 3, 2026', color: '#7B8FA1' },
  ],
}

const TAB_ICONS: Record<BookmarkTab, typeof Bookmark> = {
  Lessons: BookOpen,
  Posts: Users,
  Courses: BookOpen,
  Resources: FileText,
  Events: Radio,
}

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState<BookmarkTab>('Lessons')
  const [search, setSearch] = useState('')
  const [bookmarks, setBookmarks] = useState(BOOKMARKS)

  const removeBookmark = (id: number) => {
    setBookmarks(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(b => b.id !== id),
    }))
  }

  const total = Object.values(bookmarks).flat().length
  const items = bookmarks[activeTab].filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) || b.source.toLowerCase().includes(search.toLowerCase())
  )
  const Icon = TAB_ICONS[activeTab]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2933]">Bookmarks</h1>
          <p className="text-sm text-[#6B7280]">{total} saved items across all categories</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
        <input type="text" placeholder="Search bookmarks..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[#E4E6DE] bg-white py-2.5 pl-9 pr-4 text-sm text-[#1F2933] outline-none placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(Object.keys(BOOKMARKS) as BookmarkTab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all', activeTab === tab
              ? 'bg-[#78866B] text-white'
              : 'border border-[#E4E6DE] bg-white text-[#6B7280] hover:border-[#78866B]/40 hover:text-[#78866B]')}>
            {tab}
            <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', activeTab === tab ? 'bg-white/25 text-white' : 'bg-[#F3F4EF] text-[#6B7280]')}>
              {bookmarks[tab].length}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-16 text-center">
          <Bookmark className="h-10 w-10 text-[#9AA59E]" />
          <p className="mt-3 text-sm font-semibold text-[#1F2933]">No bookmarks in {activeTab}</p>
          <p className="mt-1 text-xs text-[#6B7280]">Bookmark {activeTab.toLowerCase()} while studying to find them here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: item.color + '18' }}>
                <Icon className="h-5 w-5" style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-[#1F2933]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{item.source}</p>
              </div>
              <p className="shrink-0 text-[11px] text-[#6B7280]">{item.date}</p>
              <div className="flex shrink-0 gap-1.5">
                <button className="rounded-lg border border-[#E4E6DE] p-1.5 text-[#6B7280] hover:text-[#78866B] transition-colors" title="Go to">
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => removeBookmark(item.id)} className="rounded-lg border border-[#E4E6DE] p-1.5 text-[#6B7280] hover:border-[#D96A5F]/30 hover:text-[#D96A5F] transition-colors" title="Remove">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Pin, Plus, Search, Flame, Users, TrendingUp, Bookmark, Filter, MoreHorizontal, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Announcements', 'Q&A', 'Showcase', 'Resources', 'General']

const MOCK_POSTS = [
  {
    id: 1, author: 'Sarah Chen', initials: 'SC', avatarColor: '#78866B',
    category: 'Announcements', pinned: true, time: '2h ago',
    content: '🎉 Excited to announce our new Advanced TypeScript module is LIVE! This has been months in the making. We cover generics, decorators, and real-world patterns. Check it out in your courses dashboard!',
    likes: 142, comments: 38, bookmarks: 29, image: null,
  },
  {
    id: 2, author: 'Rahul Sharma', initials: 'RS', avatarColor: '#B88A5A',
    category: 'Q&A', pinned: false, time: '4h ago',
    content: 'Hey everyone! I\'m stuck on async/await patterns in TypeScript. When I try to chain multiple awaits in a try-catch block, I keep getting unexpected behavior. Has anyone run into this? Would love some guidance! 🙏',
    likes: 23, comments: 15, bookmarks: 7, image: null,
  },
  {
    id: 3, author: 'Priya Nair', initials: 'PN', avatarColor: '#4F8A5B',
    category: 'Showcase', pinned: false, time: '6h ago',
    content: '🚀 Just shipped my first full-stack project after completing the React + Node.js course! Built a task management app with real-time updates. Feeling so proud of how far I\'ve come in 3 months!',
    likes: 287, comments: 64, bookmarks: 52, image: null,
  },
  {
    id: 4, author: 'Alex Johnson', initials: 'AJ', avatarColor: '#7B8FA1',
    category: 'Resources', pinned: false, time: '1d ago',
    content: 'Sharing my personal cheatsheet for CSS Grid and Flexbox. After struggling with layouts for weeks, I compiled all the patterns that actually matter. Link in the comments — feel free to bookmark!',
    likes: 198, comments: 43, bookmarks: 118, image: null,
  },
  {
    id: 5, author: 'Meera Pillai', initials: 'MP', avatarColor: '#D4A13A',
    category: 'General', pinned: false, time: '2d ago',
    content: 'What productivity tools are you all using while studying? I recently switched to Notion for notes + Pomodoro timer and my focus has improved dramatically. Would love to hear your setups! 💡',
    likes: 89, comments: 72, bookmarks: 18, image: null,
  },
]

const TRENDING_MEMBERS = [
  { name: 'Sarah Chen', initials: 'SC', color: '#78866B', xp: 8420, badge: '🏆 Creator' },
  { name: 'Rahul Sharma', initials: 'RS', color: '#B88A5A', xp: 7210, badge: '⚡ Scholar' },
  { name: 'Priya Nair', initials: 'PN', color: '#4F8A5B', xp: 6890, badge: '🔥 Achiever' },
  { name: 'Alex Johnson', initials: 'AJ', color: '#7B8FA1', xp: 5640, badge: '📚 Learner' },
]

const POPULAR_TOPICS = ['TypeScript', 'React Hooks', 'System Design', 'CSS Grid', 'Node.js', 'Interview Prep', 'Career Advice', 'Side Projects']

function Avatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
      {initials}
    </div>
  )
}

function PostCard({ post, onLike }: { post: typeof MOCK_POSTS[0]; onLike: (id: number) => void }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleLike = () => { setLiked(!liked); onLike(post.id) }

  return (
    <div className={cn('rounded-[18px] border bg-white p-5 shadow-sm transition-all duration-250 hover:shadow-md', post.pinned ? 'border-[#78866B]/30' : 'border-[#E4E6DE]')}>
      {post.pinned && (
        <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#78866B]">
          <Pin className="h-3 w-3" /> Pinned Announcement
        </div>
      )}
      <div className="flex items-start gap-3">
        <Avatar initials={post.author.split(' ').map(n => n[0]).join('')} color={post.avatarColor} size={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-sm font-bold text-[#1F2933]">{post.author}</span>
              <span className="mx-2 text-[#E4E6DE]">·</span>
              <span className="text-xs text-[#6B7280]">{post.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
                post.category === 'Announcements' ? 'border-[#78866B]/20 bg-[#78866B]/10 text-[#78866B]' :
                post.category === 'Q&A' ? 'border-[#7B8FA1]/20 bg-[#7B8FA1]/10 text-[#7B8FA1]' :
                post.category === 'Showcase' ? 'border-[#4F8A5B]/20 bg-[#4F8A5B]/10 text-[#4F8A5B]' :
                post.category === 'Resources' ? 'border-[#B88A5A]/20 bg-[#B88A5A]/10 text-[#B88A5A]' :
                'border-[#E4E6DE] bg-[#F3F4EF] text-[#6B7280]'
              )}>{post.category}</span>
              <button className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4EF]"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2933]">{post.content}</p>
          <div className="mt-4 flex items-center gap-4 border-t border-[#F3F4EF] pt-3">
            <button onClick={handleLike} className={cn('flex items-center gap-1.5 text-xs font-medium transition-colors', liked ? 'text-red-500' : 'text-[#6B7280] hover:text-red-500')}>
              <Heart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#78866B]">
              <MessageCircle className="h-4 w-4" /> {post.comments}
            </button>
            <button onClick={() => setBookmarked(!bookmarked)} className={cn('flex items-center gap-1.5 text-xs font-medium transition-colors', bookmarked ? 'text-[#78866B]' : 'text-[#6B7280] hover:text-[#78866B]')}>
              <Bookmark className="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} /> {post.bookmarks}
            </button>
            <button className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#78866B]">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [composeText, setComposeText] = useState('')
  const [posts, setPosts] = useState(MOCK_POSTS)

  const filtered = posts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2933]">Community</h1>
          <p className="text-sm text-[#6B7280]">Connect, share, and learn together with fellow members</p>
        </div>
        <button onClick={() => setShowCompose(true)}
          className="flex items-center gap-2 rounded-xl bg-[#78866B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#65735A]">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Compose Box */}
      {showCompose && (
        <div className="rounded-[18px] border border-[#78866B]/30 bg-white p-5 shadow-md">
          <div className="flex items-start gap-3">
            <Avatar initials="ME" color="#78866B" size={36} />
            <div className="flex-1">
              <textarea
                value={composeText}
                onChange={e => setComposeText(e.target.value)}
                placeholder="Share something with the community..."
                className="w-full resize-none rounded-xl border border-[#E4E6DE] bg-[#F8F8F5] p-3 text-sm text-[#1F2933] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20"
                rows={3}
              />
              <div className="mt-3 flex items-center justify-between">
                <select className="rounded-lg border border-[#E4E6DE] bg-white px-3 py-1.5 text-xs text-[#1F2933] outline-none focus:border-[#78866B]">
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setShowCompose(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F3F4EF]">Cancel</button>
                  <button className="rounded-xl bg-[#78866B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#65735A]">Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Feed */}
        <div className="space-y-5 lg:col-span-2">
          {/* Search + Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
              <input type="text" placeholder="Search posts..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#E4E6DE] bg-white py-2.5 pl-9 pr-4 text-sm text-[#1F2933] outline-none placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn('shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all', activeCategory === cat
                  ? 'bg-[#78866B] text-white'
                  : 'bg-white border border-[#E4E6DE] text-[#6B7280] hover:border-[#78866B]/40 hover:text-[#78866B]')}>
                {cat}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-16 text-center">
                <span className="text-4xl">💬</span>
                <p className="mt-3 font-semibold text-[#1F2933]">No posts found</p>
                <p className="mt-1 text-sm text-[#6B7280]">Try a different category or search term</p>
              </div>
            ) : filtered.map(post => (
              <PostCard key={post.id} post={post} onLike={() => {}} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Community Stats */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-[#1F2933]">Community Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[{ emoji: '👥', label: 'Members', value: '12.4K' },
                { emoji: '📝', label: 'Posts', value: '8.2K' },
                { emoji: '💬', label: 'Comments', value: '34.1K' },
                { emoji: '🔥', label: 'Active Today', value: '892' }].map(s => (
                <div key={s.label} className="rounded-xl bg-[#F3F4EF] p-3 text-center">
                  <div className="text-xl">{s.emoji}</div>
                  <p className="mt-1 text-base font-bold text-[#1F2933]">{s.value}</p>
                  <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Members */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1F2933]">Top Members</h3>
              <TrendingUp className="h-4 w-4 text-[#78866B]" />
            </div>
            <div className="space-y-3">
              {TRENDING_MEMBERS.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-[#6B7280]">#{i + 1}</span>
                  <Avatar initials={m.initials} color={m.color} size={32} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1F2933]">{m.name}</p>
                    <p className="text-[10px] text-[#6B7280]">{m.badge} · {m.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-[#1F2933]">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map(topic => (
                <button key={topic} className="rounded-full border border-[#E4E6DE] px-3 py-1 text-xs font-medium text-[#6B7280] transition-colors hover:border-[#78866B]/40 hover:bg-[#78866B]/5 hover:text-[#78866B]">
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

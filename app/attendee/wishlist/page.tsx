'use client'

import { useState } from 'react'
import { Heart, Star, Users, BookOpen, Tag, ShoppingCart, TrendingUp, Sparkles, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const WISHLIST_COURSES = [
  { id: 1, title: 'Full-Stack Development with React & Node.js', instructor: 'Maria Full Stack', rating: 4.9, reviews: 5200, price: 99.99, students: 34820, level: 'Intermediate', gradient: 'from-[#78866B]/20 to-[#65735A]/10', emoji: '⚙️' },
  { id: 2, title: 'System Design for Software Engineers', instructor: 'Alex Johnson', rating: 4.8, reviews: 3100, price: 89.99, students: 18400, level: 'Advanced', gradient: 'from-[#7B8FA1]/20 to-[#7B8FA1]/5', emoji: '🏗️' },
  { id: 3, title: 'UI/UX Design Masterclass', instructor: 'Chris Designer', rating: 4.7, reviews: 4200, price: 69.99, students: 28900, level: 'Beginner', gradient: 'from-[#B88A5A]/20 to-[#B88A5A]/5', emoji: '🎨' },
]

const RECOMMENDED = [
  { id: 4, title: 'Next.js 14 Complete Guide', instructor: 'Sarah Chen', rating: 4.9, price: 59.99, students: 12300, level: 'Intermediate', emoji: '⚡' },
  { id: 5, title: 'Database Design & PostgreSQL', instructor: 'Emily Database', rating: 4.8, price: 79.99, students: 8900, level: 'Intermediate', emoji: '💾' },
  { id: 6, title: 'DevOps Fundamentals', instructor: 'David Kumar', rating: 4.7, price: 89.99, students: 15200, level: 'Advanced', emoji: '🔧' },
  { id: 7, title: 'AWS Cloud Practitioner', instructor: 'Rahul Sharma', rating: 4.9, price: 119.99, students: 22100, level: 'Beginner', emoji: '☁️' },
]

const TRENDING = [
  { id: 8, title: 'AI/ML with Python', instructor: 'Priya Nair', rating: 4.9, price: 129.99, students: 41200, trend: '+45%', emoji: '🤖' },
  { id: 9, title: 'React Native Mobile Dev', instructor: 'Tom Styles', rating: 4.8, price: 84.99, students: 19800, trend: '+32%', emoji: '📱' },
  { id: 10, title: 'GraphQL API Design', instructor: 'Alex Johnson', rating: 4.7, price: 64.99, students: 11400, trend: '+28%', emoji: '🔗' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={cn('h-3 w-3', i <= Math.round(rating) ? 'text-[#D4A13A] fill-[#D4A13A]' : 'text-[#E4E6DE]')} />
      ))}
      <span className="ml-1 text-xs text-[#6B7280]">{rating}</span>
    </div>
  )
}

const levelColors: Record<string, string> = {
  Beginner: 'bg-[#4F8A5B]/10 text-[#4F8A5B] border-[#4F8A5B]/20',
  Intermediate: 'bg-[#D4A13A]/10 text-[#D4A13A] border-[#D4A13A]/20',
  Advanced: 'bg-[#D96A5F]/10 text-[#D96A5F] border-[#D96A5F]/20',
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(WISHLIST_COURSES)

  const removeFromWishlist = (id: number) => setWishlist(w => w.filter(c => c.id !== id))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Wishlist</h1>
        <p className="text-sm text-[#6B7280]">{wishlist.length} saved courses · Explore and enroll when ready</p>
      </div>

      {/* Saved Courses */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-[#78866B]" />
          <h2 className="text-lg font-bold text-[#1F2933]">Saved Courses</h2>
        </div>
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-16 text-center">
            <Heart className="h-10 w-10 text-[#9AA59E]" />
            <p className="mt-3 text-sm font-semibold text-[#1F2933]">No saved courses</p>
            <p className="mt-1 text-xs text-[#6B7280]">Browse courses and add them to your wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map(course => (
              <div key={course.id} className="group rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md overflow-hidden">
                <div className={cn('relative flex h-36 items-center justify-center bg-gradient-to-br text-5xl', course.gradient)}>
                  {course.emoji}
                  <button onClick={() => removeFromWishlist(course.id)}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#D96A5F] opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-white">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-4">
                  <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', levelColors[course.level] || levelColors.Beginner)}>{course.level}</span>
                  <h3 className="mt-2 text-sm font-bold text-[#1F2933] line-clamp-2">{course.title}</h3>
                  <p className="mt-0.5 text-xs text-[#6B7280]">by {course.instructor}</p>
                  <div className="mt-2"><Stars rating={course.rating} /></div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-[#6B7280]">
                    <Users className="h-3 w-3" /> {course.students.toLocaleString()} students
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-[#1F2933]">₹{course.price}</span>
                    <button className="flex items-center gap-1.5 rounded-xl bg-[#78866B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#65735A] transition-colors">
                      <ShoppingCart className="h-3.5 w-3.5" /> Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#B88A5A]" />
          <h2 className="text-lg font-bold text-[#1F2933]">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RECOMMENDED.map(course => (
            <div key={course.id} className="rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className="text-3xl">{course.emoji}</div>
              <h3 className="mt-2 text-sm font-bold text-[#1F2933] line-clamp-2">{course.title}</h3>
              <p className="mt-0.5 text-xs text-[#6B7280]">by {course.instructor}</p>
              <Stars rating={course.rating} />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#1F2933]">₹{course.price}</span>
                <button className="flex items-center gap-1 rounded-lg bg-[#78866B]/10 px-2.5 py-1.5 text-xs font-semibold text-[#78866B] hover:bg-[#78866B]/20 transition-colors">
                  <Heart className="h-3 w-3" /> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#4F8A5B]" />
          <h2 className="text-lg font-bold text-[#1F2933]">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TRENDING.map(course => (
            <div key={course.id} className="flex items-center gap-3 rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="text-3xl">{course.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#1F2933] line-clamp-1">{course.title}</h3>
                <p className="text-xs text-[#6B7280]">₹{course.price}</p>
                <Stars rating={course.rating} />
              </div>
              <span className="shrink-0 rounded-full bg-[#4F8A5B]/10 px-2 py-0.5 text-[10px] font-bold text-[#4F8A5B]">{course.trend}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

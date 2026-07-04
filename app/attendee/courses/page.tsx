'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { CourseSearch } from '@/components/attendee/course-search'
import { CourseFilters } from '@/components/attendee/course-filters'
import { CourseGrid } from '@/components/attendee/course-grid'
import { FloatingChat } from '@/components/floating-chat'
import { UpgradePlanModal } from '@/components/upgrade-plan-modal'
import { useCourses } from '@/lib/use-courses'

interface UserData {
  name: string
  email: string
}

interface CourseFiltersType {
  search: string
  category: string
  level: string
  priceRange: [number, number]
  rating: number
}

const MOCK_COURSES = [
  {
    id: '1',
    title: 'React Fundamentals',
    creatorName: 'Sarah Chen',
    category: 'Frontend',
    level: 'Beginner',
    rating: 4.8,
    reviews: 2430,
    price: 49.99,
    image: '🎨',
    students: 15420,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    creatorName: 'John Developer',
    category: 'Programming',
    level: 'Advanced',
    rating: 4.9,
    reviews: 1820,
    price: 79.99,
    image: '📘',
    students: 8932,
  },
  {
    id: '3',
    title: 'Web Design Principles',
    creatorName: 'Alex Design',
    category: 'Design',
    level: 'Beginner',
    rating: 4.7,
    reviews: 3100,
    price: 39.99,
    image: '🎨',
    students: 22150,
  },
  {
    id: '4',
    title: 'Full-Stack Development',
    creatorName: 'Maria Full Stack',
    category: 'Backend',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 5200,
    price: 99.99,
    image: '⚙️',
    students: 34820,
  },
  {
    id: '5',
    title: 'CSS Mastery',
    creatorName: 'Tom Styles',
    category: 'Frontend',
    level: 'Intermediate',
    rating: 4.6,
    reviews: 2150,
    price: 44.99,
    image: '🎨',
    students: 12340,
  },
  {
    id: '6',
    title: 'Database Design',
    creatorName: 'Emily Database',
    category: 'Backend',
    level: 'Advanced',
    rating: 4.8,
    reviews: 1540,
    price: 89.99,
    image: '💾',
    students: 6450,
  },
  {
    id: '7',
    title: 'UI/UX Design Bootcamp',
    creatorName: 'Chris Designer',
    category: 'Design',
    level: 'Beginner',
    rating: 4.7,
    reviews: 4200,
    price: 69.99,
    image: '🎨',
    students: 28900,
  },
  {
    id: '8',
    title: 'Node.js & Express',
    creatorName: 'David Backend',
    category: 'Backend',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 3900,
    price: 59.99,
    image: '📗',
    students: 19450,
  },
]

export default function CoursesPage() {
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const { courses, loading, error, refetch: fetchCourses, filteredCourses } = useCourses({ autoFetch: true, limit: 20 })
  const [filters, setFilters] = useState<CourseFiltersType>({
    search: '',
    category: '',
    level: '',
    priceRange: [0, 10000],
    rating: 0,
  })

  useEffect(() => {
    if (user && authorized) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          setUserData({
            name: data.name || user.displayName || 'Attendee',
            email: user.email || '',
          })
        }
      }
      fetchUserData()
    }
  }, [user, authorized])

  // const filteredCourses = MOCK_COURSES.filter((course) => {
  //   const matchesSearch =
  //     course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
  //     course.creatorName.toLowerCase().includes(filters.search.toLowerCase())

  //   const matchesCategory = !filters.category || course.category === filters.category
  //   const matchesLevel = !filters.level || course.level === filters.level
  //   const matchesPrice = course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
  //   const matchesRating = course.rating >= filters.rating

  //   return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesRating
  // })

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-[#78866B]" />
          <p className="text-muted-foreground font-medium">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F8F5]">


      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Explore Courses 📚
              </h1>
              <p className="mt-1 text-muted-foreground text-sm sm:text-base">
                Find and enroll in courses that match your learning goals.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <CourseSearch
                searchQuery={filters.search}
                onSearchChange={(search) => setFilters({ ...filters, search })}
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-[90px]">
                  <CourseFilters filters={filters} onFiltersChange={setFilters} />
                </div>
              </div>

              {/* Courses Grid */}
              <div className="lg:col-span-3">
                <CourseGrid courses={filteredCourses(filters)} />

                {filteredCourses(filters).length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <FloatingChat />
      <UpgradePlanModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  )
}

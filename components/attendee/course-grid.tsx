import { CourseCard } from './course-card'
import {Course} from '@/lib/firestore/types'

// interface Course {
//   id: string
//   title: string
//   creatorName: string
//   category: string
//   level: string
//   rating: number
//   reviews: number
//   price: number
//   image: string
//   enrollmentCount: number
// }

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{courses.length}</span> courses
          </p>
        </div>
        <div>
          <select
            defaultValue="popular"
            className="px-3 py-2 text-sm text-foreground bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9AA59E] transition-all"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            {...course}
          />
        ))}
      </div>
    </div>
  )
}

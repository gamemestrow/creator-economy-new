/**
 * Course Listing - Shared Types
 * 
 * Use these types across all course-related components
 * for consistency and type safety.
 */

/**
 * Core course data model
 */
export interface Course {
  id: string
  title: string
  creatorName: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number         // 0-5 stars
  reviews: number
  price: number          // USD
  image: string          // URL or emoji placeholder
  enrollmentCount: number
  description?: string
  duration?: number      // hours
  lessons?: number
  language?: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Filter state object
 * 
 * Usage in page component:
 * const [filters, setFilters] = useState<CourseFilters>({
 *   search: '',
 *   category: '',
 *   level: '',
 *   priceRange: [0, 150],
 *   rating: 0
 * })
 */
export interface CourseFilters {
  search: string
  category: string
  level: string
  priceRange: [number, number]  // [min, max]
  rating: number                 // 0, 4.5, 4.7, 4.8
}

/**
 * User enrollment record
 */
export interface Enrollment {
  courseId: string
  userId: string
  enrolledAt: Date
  progress: number       // 0-100%
  completed: boolean
  certificateEarned: boolean
}

/**
 * Course card props
 * 
 * All fields are required. Derive from Course type:
 * const courseCardProps = {
 *   ...course,
 *   // any overrides
 * }
 */
export interface CourseCardProps extends Course {}

/**
 * Search component props
 */
export interface CourseSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

/**
 * Filter sidebar props
 */
export interface CourseFiltersProps {
  filters: CourseFilters
  onFiltersChange: (filters: CourseFilters) => void
}

/**
 * Grid layout props
 */
export interface CourseGridProps {
  courses: Course[]
  isLoading?: boolean
  onCourseClick?: (courseId: string) => void
}

/**
 * Page component props (if needed for reuse)
 */
export interface CoursesPageProps {
  initialFilters?: Partial<CourseFilters>
  userId?: string
}

/**
 * API Response types for data fetching
 */
export interface CoursesResponse {
  courses: Course[]
  total: number
  page: number
  pageSize: number
}

export interface CourseDetailResponse {
  course: Course & {
    fullDescription: string
    syllabus: {
      title: string
      lessons: {
        title: string
        duration: number
      }[]
    }[]
    creatorName: {
      name: string
      bio: string
      avatar: string
      courseCount: number
    }
  }
}

/**
 * Enroll request/response
 */
export interface EnrollmentRequest {
  courseId: string
  userId: string
}

export interface EnrollmentResponse {
  success: boolean
  enrollment: Enrollment
  message: string
}

/**
 * Filter option groups for dropdowns
 */
export const FILTER_OPTIONS = {
  CATEGORIES: ['Frontend', 'Backend', 'Design', 'Programming'] as const,
  LEVELS: ['Beginner', 'Intermediate', 'Advanced'] as const,
  RATINGS: [
    { value: 0, label: 'All Ratings' },
    { value: 4.5, label: '4.5+ ⭐' },
    { value: 4.7, label: '4.7+ ⭐' },
    { value: 4.8, label: '4.8+ ⭐' },
  ] as const,
  PRICE_RANGE: {
    MIN: 0,
    MAX: 150,
    STEP: 5,
  } as const,
  SORT_OPTIONS: [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ] as const,
} as const

/**
 * Utility types for level color coding
 */
export type LevelColorType = 'beginner' | 'intermediate' | 'advanced'

export const LEVEL_COLORS: Record<LevelColorType, string> = {
  beginner: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  intermediate: 'bg-primary/10 text-primary border border-primary/20',
  advanced: 'bg-primary/10 text-primary border border-primary/20',
}

/**
 * Category icon mapping (if needed)
 */
export const CATEGORY_ICONS: Record<string, string> = {
  'Frontend': '🎨',
  'Backend': '⚙️',
  'Design': '🖌️',
  'Programming': '💻',
}

/**
 * Sorting function helpers
 */
export function sortCourses(
  courses: Course[],
  sortBy: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'
): Course[] {
  const sorted = [...courses]

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.enrollmentCount - a.enrollmentCount)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) =>
        (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
      )
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
}

/**
 * Filter application helper
 */
export function applyCourseFilters(
  courses: Course[],
  filters: CourseFilters
): Course[] {
  return courses.filter((course) => {
    // Search
    const matchesSearch =
      course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      course.creatorName.toLowerCase().includes(filters.search.toLowerCase())

    // Category
    const matchesCategory = !filters.category || course.category === filters.category

    // Level
    const matchesLevel = !filters.level || course.level === filters.level

    // Price
    const matchesPrice =
      course.price >= filters.priceRange[0] && 
      course.price <= filters.priceRange[1]

    // Rating
    const matchesRating = course.rating >= filters.rating

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesPrice &&
      matchesRating
    )
  })
}

/**
 * Validation helpers
 */
export function isValidCourse(course: unknown): course is Course {
  if (typeof course !== 'object' || course === null) return false
  const c = course as Record<string, unknown>
  return (
    typeof c.id === 'string' &&
    typeof c.title === 'string' &&
    typeof c.creatorName === 'string' &&
    typeof c.rating === 'number' &&
    typeof c.price === 'number'
  )
}

export function isValidFilters(filters: unknown): filters is CourseFilters {
  if (typeof filters !== 'object' || filters === null) return false
  const f = filters as Record<string, unknown>
  return (
    typeof f.search === 'string' &&
    typeof f.category === 'string' &&
    typeof f.level === 'string' &&
    Array.isArray(f.priceRange) &&
    typeof f.rating === 'number'
  )
}

'use client'

import { Star, Users, Clock, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react'
import { useEnrollInCourse } from '@/lib/hooks/use-attendee-mutations'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { isUserEnrolled } from '@/lib/firestore/enrollments'
import { fetchCourseById } from '@/lib/firestore/courses'

export interface Course {
  courseId: string // Document ID
  title: string
  description: string
  creatorId: string // Reference to creator (user.uid)
  creatorName?: string // Denormalized for display
  thumbnail?: string
  price: number // 0 for free courses
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  totalLessons: number
  enrollmentCount: number // Denormalized count
  rating?: number // Average rating
  tags: string[]
  isPublished: boolean
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

const difficultyLabel: Record<Course['difficulty'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

function getDifficultyColor(difficulty: Course['difficulty']) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'intermediate':
      return 'bg-primary/10 text-primary border border-primary/20'
    case 'advanced':
      return 'bg-primary/10 text-primary border border-primary/20'
    default:
      return 'bg-muted text-foreground border border-border'
  }
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { enrollUser, loading: enrolling } = useEnrollInCourse()
  const [uid, setUid] = useState('')
  const [isEnrolled, setIsEnrolled] = useState(false)

  const { user, authorized } = useRequireRole(['attendee'])

  // Fetch course data from Firestore using the id in the URL
  useEffect(() => {
    if (!courseId) return

    async function fetchCourse() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchCourseById(courseId)
        if (!data) {
          setError('not-found')
        } else {
          setCourse(data as Course)
        }
      } catch (err) {
        console.error('Failed to fetch course:', err)
        setError('fetch-failed')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  useEffect(() => {
    if (!user || !authorized) return
    setUid(user.uid)
  }, [user, authorized])

  useEffect(() => {
    if (!uid || !courseId) return

    async function checkEnrollment() {
      const enrolled = await isUserEnrolled(uid, courseId)
      setIsEnrolled(enrolled)
    }
    checkEnrollment()
  }, [uid, courseId])

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start animate-pulse">
            <div className="w-full lg:w-2/3 bg-white border border-border rounded-lg overflow-hidden">
              <div className="w-full h-64 sm:h-80 bg-muted" />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-7 w-2/3 bg-muted rounded" />
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="bg-white border border-border rounded-lg p-6 space-y-4">
                <div className="h-8 w-20 bg-muted rounded" />
                <div className="h-11 w-full bg-muted rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not found / error state
  if (error || !course) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="bg-white border border-border rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h1 className="text-base font-semibold text-foreground mb-1">
            {error === 'not-found' ? 'Course not found' : 'Something went wrong'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {error === 'not-found'
              ? "This course doesn't exist or may have been removed."
              : "We couldn't load this course. Please try again."}
          </p>
        </div>
      </div>
    )
  }

  const {
    title,
    description,
    creatorName,
    thumbnail,
    price,
    category,
    difficulty,
    duration,
    totalLessons,
    enrollmentCount,
    rating = 0,
    tags,
  } = course

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main content — 2/3 width */}
          <div className="w-full lg:w-2/3 bg-white border border-border rounded-lg overflow-hidden">
            {/* Thumbnail */}
            <div className="relative w-full h-64 sm:h-80 bg-primary   flex items-center justify-center overflow-hidden">
              <div className="text-8xl">{thumbnail || '📘'}</div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Category & Level */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded">
                  {category}
                </span>
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-medium rounded text-center ${getDifficultyColor(
                    difficulty
                  )}`}
                >
                  {difficultyLabel[difficulty]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                {title}
              </h1>

              {/* Creator */}
              {creatorName && (
                <p className="text-sm text-muted-foreground mb-4">
                  by <span className="font-medium text-foreground">{creatorName}</span>
                </p>
              )}

              {/* Rating & Students */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{rating}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{enrollmentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDuration(duration)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-6" />

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-base font-semibold text-foreground mb-3">
                  About this course
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* Tags */}
              {tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
            <div className="bg-white border border-border rounded-lg p-6">
              <div className="mb-5">
                <span className="text-3xl font-bold text-foreground">
                  {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                </span>
              </div>

              <button
                onClick={() => enrollUser(uid, courseId)}
                disabled={enrolling || isEnrolled}
                className={`w-full px-4 py-3 ${
                  isEnrolled ? 'bg-green-500' : 'bg-[#78866B] hover:bg-primary'
                } text-white text-sm font-semibold rounded-lg transition-colors active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2`}
              >
                {isEnrolled ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Enrolled
                  </>
                ) : enrolling ? (
                  'Enrolling...'
                ) : (
                  'Enroll now'
                )}
              </button>

              <div className="border-t border-border my-5" />

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDuration(duration)} of content</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{totalLessons} lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{enrollmentCount.toLocaleString()} students enrolled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
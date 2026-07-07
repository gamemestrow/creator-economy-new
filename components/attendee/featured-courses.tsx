'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Loader2, AlertCircle, Star } from 'lucide-react'
import { Course } from '@/lib/firestore'
import { usePublishedCourses } from '@/lib/hooks/use-attendee-data'
import { useEnrollInCourse, useUnenrollFromCourse } from '@/lib/hooks/use-attendee-mutations'
import { isUserEnrolled } from '@/lib/firestore/enrollments'

interface FeaturedCoursesProps {
  userId: string
}

export function FeaturedCourses({ userId }: FeaturedCoursesProps) {
  const { courses, loading, error } = usePublishedCourses()
  const { enroll } = useEnrollInCourse()
  const { unenroll } = useUnenrollFromCourse()
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set())
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null)

  useEffect(() => {
    const checkEnrollments = async () => {
      const enrolledIds = new Set<string>()
      for (const course of courses) {
        const isEnrolled = await isUserEnrolled(userId, course.courseId)
        if (isEnrolled) {
          enrolledIds.add(course.courseId)
        }
      }
      setEnrolledCourses(enrolledIds)
    }

    if (courses.length > 0 && userId) {
      checkEnrollments()
    }
  }, [courses, userId])

  const handleEnroll = async (courseId: string) => {
    try {
      setEnrollingCourseId(courseId)
      await enroll(userId, courseId)
      setEnrolledCourses((prev) => new Set([...prev, courseId]))
    } catch (err) {
      console.error('Enrollment failed:', err)
    } finally {
      setEnrollingCourseId(null)
    }
  }

  const handleUnenroll = async (courseId: string) => {
    try {
      setEnrollingCourseId(courseId)
      await unenroll(userId, courseId)
      setEnrolledCourses((prev) => {
        const newSet = new Set(prev)
        newSet.delete(courseId)
        return newSet
      })
    } catch (err) {
      console.error('Unenrollment failed:', err)
    } finally {
      setEnrollingCourseId(null)
    }
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-900">Failed to load courses</p>
            <p className="text-sm text-red-700">{error?.message}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-foreground">Featured Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-border bg-white animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-foreground">Featured Courses</h2>
        <div className="rounded-xl border-2 border-dashed border-border bg-muted px-6 py-12 text-center">
          <BookOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 font-medium text-foreground">No courses available yet</h3>
          <p className="text-sm text-muted-foreground">
            Check back soon for new courses from top creators.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Featured Courses</h2>
        <a href="/attendee/courses" className="text-sm font-medium text-primary hover:text-primary">
          View All →
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 3).map((course) => {
          const isEnrolled = enrolledCourses.has(course.courseId)
          const isEnrolling = enrollingCourseId === course.courseId

          return (
            <div
              key={course.courseId}
              className="overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-primary from-[#78866B]/10  flex items-center justify-center">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-[#78866B]">
                  {course.difficulty}
                </div>

                <h3 className="mb-2 line-clamp-2 font-semibold text-foreground">
                  {course.title}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                  {course.description}
                </p>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {course.totalLessons || 0} lessons
                  </span>
                  {course.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.enrollmentCount} enrolled
                  </span>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() =>
                    isEnrolled
                      ? handleUnenroll(course.courseId)
                      : handleEnroll(course.courseId)
                  }
                  disabled={isEnrolling}
                  className={`w-full rounded-lg px-4 py-2 font-medium transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                    isEnrolled
                      ? 'bg-muted text-foreground hover:bg-card'
                      : 'bg-[#78866B] text-white hover:bg-primary'
                  }`}
                >
                  {isEnrolling ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </span>
                  ) : isEnrolled ? (
                    'Enrolled'
                  ) : (
                    'Enroll Now'
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

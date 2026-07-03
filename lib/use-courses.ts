/**
 * useCourses Hook
 * 
 * Custom hook for fetching, filtering, and managing courses from Firestore.
 * 
 * Usage:
 * const { courses, loading, error } = useCourses()
 */

import { useEffect, useState, useCallback } from 'react'
import {
  collection,
  query,
  getDocs,
  where,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Course, CourseFilters, FILTER_OPTIONS } from '@/components/attendee/courses-types'

interface UseCourcesOptions {
  autoFetch?: boolean
  limit?: number
}

interface UseCourcesReturn {
  courses: Course[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  filteredCourses: (filters: CourseFilters) => Course[]
}

/**
 * Hook to fetch courses from Firestore
 */
export function useCourses(options: UseCourcesOptions = {}): UseCourcesReturn {
  const { autoFetch = true, limit = 100 } = options

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const coursesRef = collection(db, 'courses')
      const q = query(
        coursesRef,
        where("isPublished", "==", true)
      );
      const snapshot = await getDocs(q)

      const coursesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[]

      setCourses(coursesList.slice(0, limit))
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch courses')
      setError(error)
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    if (autoFetch) {
      fetchCourses()
    }
  }, [autoFetch, fetchCourses])

  const filteredCourses = useCallback(
    (filters: CourseFilters): Course[] => {
      return courses.filter((course) => {

        // Search
        const matchesSearch =
          course.title.toLowerCase()?.includes(filters.search.toLowerCase())

        // Category
        const matchesCategory =
          !filters.category || course.category === filters.category

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
    },
    [courses]
  )

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    filteredCourses,
  }
}

/**
 * Hook to fetch a single course by ID
 */
export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!courseId) return

    const fetchCourse = async () => {
      setLoading(true)
      setError(null)

      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const courseRef = doc(db, 'courses', courseId)
        const courseSnap = await getDoc(courseRef)

        if (courseSnap.exists()) {
          setCourse({
            id: courseSnap.id,
            ...courseSnap.data(),
          } as Course)
        } else {
          setError(new Error('Course not found'))
        }
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to fetch course')
        setError(error)
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  return { course, loading, error }
}

/**
 * Hook to fetch user's enrolled courses
 */
export function useEnrolledCourses(userId: string) {
  const [enrollments, setEnrollments] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchEnrollments = async () => {
      setLoading(true)
      setError(null)

      try {
        const { collection, query, getDocs } = await import('firebase/firestore')
        const enrollmentsRef = collection(
          db,
          'users',
          userId,
          'enrollments'
        )
        const snapshot = await getDocs(enrollmentsRef)

        const courseIds = snapshot.docs.map((doc) => doc.data().courseId)

        // Fetch full course details
        const courses: Course[] = []
        for (const courseId of courseIds) {
          const { doc, getDoc } = await import('firebase/firestore')
          const courseRef = doc(db, 'courses', courseId)
          const courseSnap = await getDoc(courseRef)
          if (courseSnap.exists()) {
            courses.push({
              id: courseSnap.id,
              ...courseSnap.data(),
            } as Course)
          }
        }

        setEnrollments(courses)
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('Failed to fetch enrollments')
        setError(error)
        console.error('Error fetching enrollments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [userId])

  return { enrollments, loading, error }
}

/**
 * Hook to enroll in a course
 */
export function useEnrollCourse() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const enroll = useCallback(
    async (userId: string, courseId: string) => {
      setLoading(true)
      setError(null)

      try {
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
        const enrollmentRef = doc(
          db,
          'users',
          userId,
          'enrollments',
          courseId
        )

        await setDoc(enrollmentRef, {
          courseId,
          enrolledAt: serverTimestamp(),
          progress: 0,
          completed: false,
          certificateEarned: false,
        })

        return true
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to enroll')
        setError(error)
        console.error('Error enrolling in course:', error)
        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { enroll, loading, error }
}

/**
 * Hook to check if user is enrolled in a course
 */
export function useIsEnrolled(userId: string, courseId: string) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId || !courseId) return

    const checkEnrollment = async () => {
      setLoading(true)

      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const enrollmentRef = doc(
          db,
          'users',
          userId,
          'enrollments',
          courseId
        )
        const snapshot = await getDoc(enrollmentRef)
        setIsEnrolled(snapshot.exists())
      } catch (err) {
        console.error('Error checking enrollment:', err)
      } finally {
        setLoading(false)
      }
    }

    checkEnrollment()
  }, [userId, courseId])

  return { isEnrolled, loading }
}

/**
 * Hook to get course statistics
 */
export function useCourseStats() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    categories: {} as Record<string, number>,
    avgRating: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)

      try {
        const { collection, getDocs } = await import('firebase/firestore')
        const coursesRef = collection(db, 'courses')
        const snapshot = await getDocs(coursesRef)

        const courses = snapshot.docs.map((doc) => doc.data()) as Course[]

        const categories: Record<string, number> = {}
        let totalRating = 0

        courses.forEach((course) => {
          categories[course.category] = (categories[course.category] || 0) + 1
          totalRating += course.rating
        })

        setStats({
          totalCourses: courses.length,
          categories,
          avgRating: courses.length > 0 ? totalRating / courses.length : 0,
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading }
}

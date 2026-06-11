/**
 * Custom React Hooks for Attendee Data
 */

import { useState, useEffect } from 'react'
import { Course, Enrollment, Progress, Certificate, Event, Community, CommunityMember, EventRegistration } from '@/lib/firestore'
import * as courseService from '@/lib/firestore/courses'
import * as enrollmentService from '@/lib/firestore/enrollments'
import * as progressService from '@/lib/firestore/progress'
import * as certificateService from '@/lib/firestore/certificates'
import * as eventService from '@/lib/firestore/events'
import * as communityService from '@/lib/firestore/communities'

/**
 * Hook to fetch user's enrolled courses
 */
export function useUserEnrollments(userId: string) {
  const [enrollments, setEnrollments] = useState<
    (Enrollment & { course?: Course })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchEnrollments = async () => {
      try {
        setLoading(true)
        const data = await enrollmentService.fetchUserEnrollments(userId)
        setEnrollments(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch enrollments')
        setEnrollments([])
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [userId])

  return { enrollments, loading, error }
}

/**
 * Hook to fetch user's progress
 */
export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState<Progress[]>([])
  const [stats, setStats] = useState({
    enrolledCount: 0,
    inProgressCount: 0,
    completedCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        setLoading(true)
        const [progressData, statsData] = await Promise.all([
          progressService.getUserAllProgress(userId),
          progressService.getUserProgressStats(userId),
        ])
        setProgress(progressData)
        setStats(statsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch progress')
        setProgress([])
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  return { progress, stats, loading, error }
}

/**
 * Hook to fetch user's certificates
 */
export function useUserCertificates(userId: string) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchCertificates = async () => {
      try {
        setLoading(true)
        const [certsData, countData] = await Promise.all([
          certificateService.getUserCertificates(userId),
          certificateService.getUserCertificatesCount(userId),
        ])
        setCertificates(certsData)
        setCount(countData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch certificates')
        setCertificates([])
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [userId])

  return { certificates, count, loading, error }
}

/**
 * Hook to fetch published courses
 */
export function usePublishedCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const { courses: data } = await courseService.fetchPublishedCourses(12)
        setCourses(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses')
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error }
}

/**
 * Hook to fetch upcoming events
 */
export function useUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await eventService.fetchUpcomingEvents(6)
        setEvents(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}

/**
 * Hook to fetch user's event registrations
 */
export function useUserEventRegistrations(userId: string) {
  const [registrations, setRegistrations] = useState<
    (EventRegistration & { event?: Event })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchRegistrations = async () => {
      try {
        setLoading(true)
        const data = await eventService.getUserEventRegistrations(userId)
        setRegistrations(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch registrations')
        setRegistrations([])
      } finally {
        setLoading(false)
      }
    }

    fetchRegistrations()
  }, [userId])

  return { registrations, loading, error }
}

/**
 * Hook to fetch public communities
 */
export function usePublicCommunities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true)
        const data = await communityService.fetchPublicCommunities(12)
        setCommunities(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch communities')
        setCommunities([])
      } finally {
        setLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  return { communities, loading, error }
}

/**
 * Hook to fetch user's communities
 */
export function useUserCommunities(userId: string) {
  const [communities, setCommunities] = useState<
    (CommunityMember & { community?: Community })[]
  >([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchCommunities = async () => {
      try {
        setLoading(true)
        const [communitiesData, countData] = await Promise.all([
          communityService.getUserCommunities(userId),
          communityService.getUserCommunitiesCount(userId),
        ])
        setCommunities(communitiesData)
        setCount(countData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch communities')
        setCommunities([])
      } finally {
        setLoading(false)
      }
    }

    fetchCommunities()
  }, [userId])

  return { communities, count, loading, error }
}

/**
 * Hook to fetch dashboard stats
 */
export function useDashboardStats(userId: string) {
  const [stats, setStats] = useState({
    enrolledCount: 0,
    inProgressCount: 0,
    certificateCount: 0,
    communityCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        const [
          enrolledCount,
          inProgressCount,
          certificateCount,
          communityCount,
        ] = await Promise.all([
          enrollmentService.getUserEnrollmentCount(userId),
          progressService.getInProgressCoursesCount(userId),
          certificateService.getUserCertificatesCount(userId),
          communityService.getUserCommunitiesCount(userId),
        ])

        setStats({
          enrolledCount,
          inProgressCount,
          certificateCount,
          communityCount,
        })
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userId])

  return { stats, loading, error }
}

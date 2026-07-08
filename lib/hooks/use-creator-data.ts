/**
 * Custom React Hooks for Creator Data
 */

import { useState, useEffect, useCallback } from 'react'
import { Course, Event, Community } from '@/lib/firestore'
import * as courseService from '@/lib/firestore/courses'
import * as eventService from '@/lib/firestore/events'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { COLLECTIONS } from '@/lib/firestore/types'

import * as orderService from '@/lib/firestore/orders'
import { Order, User } from '@/lib/firestore/types'

import * as membershipService from '@/lib/firestore/memberships'
import { Membership } from '@/lib/firestore/types'

import * as communityService from '@/lib/firestore/communities'

import * as userService from '@/lib/firestore/users'

import { getCreatorDigitalDownloads, DigitalDownload } from '@/lib/firestore/digitalDownloads'

/**
 * Hook to fetch memberships for a creator
 */
export function useCreatorMemberships(creatorId: string) {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMemberships = async () => {
    if (!creatorId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/creator/memberships/${creatorId}`, {
        method: "GET",
      });
      const data = await response.json()
      setMemberships(data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch memberships')
      setMemberships([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemberships()
  }, [creatorId])

  return { memberships, loading, error, refresh: fetchMemberships }
}

/**
 * Hook to fetch orders for a creator
 */
export function useCreatorOrders(creatorId: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!creatorId) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await orderService.fetchCreatorOrders(creatorId)
        setOrders(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders')
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [creatorId])

  return { orders, loading, error }
}


/**
 * function to show customers of a specific creator
 */


export function useCustomers() {
  const [customers, setCustomers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomers = async (searchTerm?: string) => {
    try {
      setLoading(true)
      const data = searchTerm
        ? await userService.searchAttendees(searchTerm)
        : await userService.fetchAllAttendees()
      setCustomers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return { customers, loading, error, search: fetchCustomers }
}

/**
 * Hook to fetch courses created by a specific user
 */
export function useCreatorCourses(creatorId: string) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  const fetchCourses = async () => {
    if (!creatorId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/creator/course/${creatorId}`, {
        method: "GET",
      });
      const data = await response.json()
      setCourses(data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [creatorId])

  return { courses, loading, error, refresh: fetchCourses }
}


/**
 * Hook to fetch event created by a specific user
 */
export function useCreatorEvent(creatorId: string,type:string) {
  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvent, setLoadingEvent] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvent = async () => {
    if (!creatorId) {
      setLoadingEvent(false)
      return
    }
    try {
      setLoadingEvent(true)
      const data = await eventService.fetchCreatorEvents(creatorId, type)
      setEvents(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
      setEvents([])
    } finally {
      setLoadingEvent(false)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [creatorId, type])

  return { events, loadingEvent, error, refresh: fetchEvent }
}


/**
 * Hook to fetch creator dashboard statistics
 */
export function useCreatorStats(creatorId: string) {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    totalEvents: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!creatorId) {
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch all courses to calculate total students and revenue
        const courses = await courseService.fetchCreatorCourses(creatorId)

        const totalCourses = courses.length
        const totalStudents = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0)
        const totalRevenue = courses.reduce((sum, c) => sum + ((c.enrollmentCount || 0) * (c.price || 0)), 0)

        // Fetch events count
        const eventsQuery = query(
          collection(db, COLLECTIONS.EVENTS),
          where('creatorId', '==', creatorId)
        )
        const eventsSnapshot = await getDocs(eventsQuery)
        const totalEvents = eventsSnapshot.size

        setStats({
          totalCourses,
          totalStudents,
          totalRevenue,
          totalEvents,
        })
        setError(null)
      } catch (err) {
        console.error('Error fetching creator stats:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch creator stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [creatorId])

  return { stats, loading, error }
}

/*
* Fetch communities for a specific creator
*/
export function useCreatorcommunities(creatorId: string) {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCommunities = async () => {
    if (!creatorId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/creator/communities/${creatorId}`, {
        method: "GET",
      });
      const data = await response.json()
      setCommunities(data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch communities')
      setCommunities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, [creatorId])

  return { communities, loading, error, refresh: fetchCommunities }
}

/**
 * Hook to fetch digital downloads for a specific creator
 */

export function useCreatorDigitalDownloads(creatorId: string) {
  const [downloads, setDownloads] = useState<DigitalDownload[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDownloads = useCallback(async () => {
    if (!creatorId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      setError(null)
      const data = await getCreatorDigitalDownloads(creatorId)
      setDownloads(data)
    } catch (err) {
      console.error('Failed to fetch digital downloads:', err)
      setError('Failed to load digital downloads')
    } finally {
      setLoading(false)
    }
  }, [creatorId])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

  return { downloads, loading, error, refresh: fetchDownloads }
}
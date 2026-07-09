/**
 * Custom React Hooks for Attendee Mutations
 * Functions that modify data
 */

import { useState } from 'react'
import * as enrollmentService from '@/lib/firestore/enrollments'
import * as eventService from '@/lib/firestore/events'
import * as communityService from '@/lib/firestore/communities'

/**
 * Hook to enroll user in a course
 */
export function useEnrollInCourse() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const enrollUser = async (userId: string, courseId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const enrollmentId = await enrollmentService.enrollUserInCourse(
        userId,
        courseId
      )

      setSuccess(true)
      return enrollmentId
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to enroll'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { enrollUser, loading, error, success }
}

/**
 * Hook to unenroll user from a course
 */
export function useUnenrollFromCourse() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const unenroll = async (userId: string, courseId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await enrollmentService.unenrollUserFromCourse(userId, courseId)

      setSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to unenroll'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { unenroll, loading, error, success }
}

/**
 * Hook to register for an event
 */
export function useRegisterForEvent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const register = async (userId: string, eventId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const registrationId = await eventService.registerUserForEvent(
        userId,
        eventId
      )

      setSuccess(true)
      return registrationId
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to register'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error, success }
}

/**
 * Hook to cancel event registration
 */
export function useCancelEventRegistration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const cancel = async (
    userId: string,
    eventId: string,
    reason?: string
  ) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await eventService.cancelEventRegistration(userId, eventId, reason)

      setSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { cancel, loading, error, success }
}

/**
 * Hook to join a community
 */
export function useJoinCommunity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const join = async (userId: string, communityId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const memberId = await communityService.joinCommunity(
        userId,
        communityId
      )

      setSuccess(true)
      return memberId
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { join, loading, error, success }
}

/**
 * Hook to leave a community
 */
export function useLeaveCommunity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const leave = async (userId: string, communityId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await communityService.leaveCommunity(userId, communityId)

      setSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to leave'
      setError(message)
      setSuccess(false)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { leave, loading, error, success }
}

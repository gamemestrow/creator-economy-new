/**
 * Firestore Events Service
 * Functions to manage events and registrations
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Event, EventRegistration, COLLECTIONS } from './types'

/**
 * Fetch upcoming published events
 */
export async function fetchUpcomingEvents(
  limit_: number = 6
): Promise<Event[]> {
  try {
    const now = new Date()

    const q = query(
      collection(db, COLLECTIONS.EVENTS),
      where('isPublished', '==', true),
      where('date', '>=', now),
      orderBy('date', 'asc'),
      limit(limit_)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      eventId: doc.id,
    } as Event))
  } catch (error: any) {
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      console.warn('Firestore index missing for fetchUpcomingEvents, falling back to in-memory filter/sort')
      const now = new Date()
      const q = query(
        collection(db, COLLECTIONS.EVENTS),
        where('isPublished', '==', true)
      )
      const snapshot = await getDocs(q)
      const events = snapshot.docs.map((doc) => ({
        ...doc.data(),
        eventId: doc.id,
      } as Event))

      return events
        .filter(event => {
          const eventDate = event.date?.toDate ? event.date.toDate() : new Date(event.date)
          return eventDate >= now
        })
        .sort((a, b) => {
          const dateA = a.date?.toDate ? a.date.toDate().getTime() : new Date(a.date).getTime()
          const dateB = b.date?.toDate ? b.date.toDate().getTime() : new Date(b.date).getTime()
          return dateA - dateB
        })
        .slice(0, limit_)
    }
    console.error('Error fetching upcoming events:', error)
    throw error
  }
}

/**
 * Fetch past events
 */
export async function fetchPastEvents(limit_: number = 10): Promise<Event[]> {
  try {
    const now = new Date()

    const q = query(
      collection(db, COLLECTIONS.EVENTS),
      where('isPublished', '==', true),
      where('date', '<', now),
      orderBy('date', 'desc'),
      limit(limit_)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      eventId: doc.id,
    } as Event))
  } catch (error: any) {
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      console.warn('Firestore index missing for fetchPastEvents, falling back to in-memory filter/sort')
      const now = new Date()
      const q = query(
        collection(db, COLLECTIONS.EVENTS),
        where('isPublished', '==', true)
      )
      const snapshot = await getDocs(q)
      const events = snapshot.docs.map((doc) => ({
        ...doc.data(),
        eventId: doc.id,
      } as Event))

      return events
        .filter(event => {
          const eventDate = event.date?.toDate ? event.date.toDate() : new Date(event.date)
          return eventDate < now
        })
        .sort((a, b) => {
          const dateA = a.date?.toDate ? a.date.toDate().getTime() : new Date(a.date).getTime()
          const dateB = b.date?.toDate ? b.date.toDate().getTime() : new Date(b.date).getTime()
          return dateB - dateA
        })
        .slice(0, limit_)
    }
    console.error('Error fetching past events:', error)
    throw error
  }
}

/**
 * Get event by ID
 */
export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const docRef = doc(db, COLLECTIONS.EVENTS, eventId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        eventId: docSnap.id,
      } as Event
    }

    return null
  } catch (error) {
    console.error('Error getting event:', error)
    throw error
  }
}

/**
 * Check if user is registered for an event
 */
export async function isUserRegisteredForEvent(
  userId: string,
  eventId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTIONS.EVENT_REGISTRATIONS),
      where('userId', '==', userId),
      where('eventId', '==', eventId),
      where('status', '!=', 'cancelled')
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking event registration:', error)
    throw error
  }
}

/**
 * Register user for an event
 */
export async function registerUserForEvent(
  userId: string,
  eventId: string
): Promise<string> {
  try {
    const isRegistered = await isUserRegisteredForEvent(userId, eventId)
    if (isRegistered) {
      throw new Error('User is already registered for this event')
    }

    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId)
    const eventSnap = await getDoc(eventRef)

    if (!eventSnap.exists() || !eventSnap.data().isPublished) {
      throw new Error('Event not found or is not published')
    }

    const eventData = eventSnap.data()

    if (
      eventData.maxAttendees &&
      eventData.currentAttendees >= eventData.maxAttendees
    ) {
      throw new Error('Event is full')
    }

    const batch = writeBatch(db)
    const registrationRef = doc(collection(db, COLLECTIONS.EVENT_REGISTRATIONS))

    batch.set(registrationRef, {
      userId,
      eventId,
      registeredAt: serverTimestamp(),
      status: 'registered',
    })

    batch.update(eventRef, {
      currentAttendees: (eventData.currentAttendees || 0) + 1,
    })

    await batch.commit()

    return registrationRef.id
  } catch (error) {
    console.error('Error registering for event:', error)
    throw error
  }
}

/**
 * Cancel event registration
 */
export async function cancelEventRegistration(
  userId: string,
  eventId: string,
  reason?: string
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.EVENT_REGISTRATIONS),
      where('userId', '==', userId),
      where('eventId', '==', eventId),
      where('status', '!=', 'cancelled')
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error('Registration not found')
    }

    const batch = writeBatch(db)
    const registrationDoc = snapshot.docs[0]

    batch.update(registrationDoc.ref, {
      status: 'cancelled',
      cancellationReason: reason || 'User cancelled',
    })

    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId)
    const eventSnap = await getDoc(eventRef)

    if (eventSnap.exists()) {
      batch.update(eventRef, {
        currentAttendees: Math.max(0, (eventSnap.data().currentAttendees || 1) - 1),
      })
    }

    await batch.commit()
  } catch (error) {
    console.error('Error cancelling event registration:', error)
    throw error
  }
}

/**
 * Get user's event registrations
 */
export async function getUserEventRegistrations(
  userId: string
): Promise<(EventRegistration & { event?: Event })[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.EVENT_REGISTRATIONS),
      where('userId', '==', userId),
      where('status', 'in', ['registered', 'attended'])
    )

    const snapshot = await getDocs(q)
    const registrations: (EventRegistration & { event?: Event })[] = []

    for (const regDoc of snapshot.docs) {
      const registration = {
        ...regDoc.data(),
        registrationId: regDoc.id,
      } as EventRegistration

      const eventRef = doc(db, COLLECTIONS.EVENTS, registration.eventId)
      const eventSnap = await getDoc(eventRef)

      if (eventSnap.exists()) {
        registrations.push({
          ...registration,
          event: {
            ...eventSnap.data(),
            eventId: eventSnap.id,
          } as Event,
        })
      }
    }

    return registrations
  } catch (error) {
    console.error('Error getting user event registrations:', error)
    throw error
  }
}

/**
 * Get event registrations count
 */
export async function getUserEventRegistrationsCount(
  userId: string
): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.EVENT_REGISTRATIONS),
      where('userId', '==', userId),
      where('status', 'in', ['registered', 'attended'])
    )

    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Error getting event registrations count:', error)
    throw error
  }
}

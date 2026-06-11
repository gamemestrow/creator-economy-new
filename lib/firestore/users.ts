/**
 * Firestore Users Service
 */

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { User, COLLECTIONS } from './types'

/**
 * Fetch all attendees (customers)
 */
export async function fetchAllAttendees(limit_: number = 50): Promise<User[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('role', '==', 'attendee'),
      orderBy('createdAt', 'desc'),
      limit(limit_)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    } as User))
  } catch (error) {
    console.error('Error fetching attendees:', error)
    throw error
  }
}

/**
 * Search attendees by name or email
 */
export async function searchAttendees(searchTerm: string): Promise<User[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('role', '==', 'attendee')
    )
    const snapshot = await getDocs(q)
    const attendees = snapshot.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    } as User))

    return attendees.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  } catch (error) {
    console.error('Error searching attendees:', error)
    throw error
  }
}

/**
 * Firestore Memberships Service
 */

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Membership, COLLECTIONS } from './types'

/**
 * Create a new membership plan
 */
export async function createMembership(membershipData: Omit<Membership, 'membershipId' | 'createdAt' | 'updatedAt' | 'memberCount'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.MEMBERSHIPS), {
      ...membershipData,
      memberCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating membership:', error)
    throw error
  }
}

/**
 * Update a membership plan
 */
export async function updateMembership(membershipId: string, updates: Partial<Membership>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.MEMBERSHIPS, membershipId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating membership:', error)
    throw error
  }
}

/**
 * Delete a membership plan
 */
export async function deleteMembership(membershipId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.MEMBERSHIPS, membershipId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting membership:', error)
    throw error
  }
}

/**
 * Fetch all memberships for a creator
 */
export async function fetchCreatorMemberships(creatorId: string): Promise<Membership[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.MEMBERSHIPS),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      membershipId: doc.id,
    } as Membership))
  } catch (error) {
    console.error('Error fetching creator memberships:', error)
    throw error
  }
}

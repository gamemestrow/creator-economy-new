/**
 * Firestore Communities Service
 * Functions to manage communities and memberships
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Community, CommunityMember, COLLECTIONS } from './types'

/**
 * Fetch all public communities
 */
export async function fetchPublicCommunities(
  limit_: number = 12
): Promise<Community[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITIES),
      where('isPublic', '==', true),
      orderBy('memberCount', 'desc'),
      limit(limit_)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      communityId: doc.id,
    } as Community))
  } catch (error) {
    console.error('Error fetching public communities:', error)
    throw error
  }
}

/**
 * Get community by ID
 */
export async function getCommunityById(
  communityId: string
): Promise<Community | null> {
  try {
    const docRef = doc(db, COLLECTIONS.COMMUNITIES, communityId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        communityId: docSnap.id,
      } as Community
    }

    return null
  } catch (error) {
    console.error('Error getting community:', error)
    throw error
  }
}

/**
 * Check if user is member of community
 */
export async function isUserCommunityMember(
  userId: string,
  communityId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITY_MEMBERS),
      where('userId', '==', userId),
      where('communityId', '==', communityId)
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking community membership:', error)
    throw error
  }
}

/**
 * Join community
 */
export async function joinCommunity(
  userId: string,
  communityId: string
): Promise<string> {
  try {
    // Check if already a member
    const isMember = await isUserCommunityMember(userId, communityId)
    if (isMember) {
      throw new Error('User is already a member of this community')
    }

    // Check if community exists
    const communityRef = doc(db, COLLECTIONS.COMMUNITIES, communityId)
    const communitySnap = await getDoc(communityRef)

    if (!communitySnap.exists()) {
      throw new Error('Community not found')
    }

    const batch = writeBatch(db)

    // Create membership
    const memberRef = doc(collection(db, COLLECTIONS.COMMUNITY_MEMBERS))

    batch.set(memberRef, {
      userId,
      communityId,
      role: 'member',
      joinedAt: serverTimestamp(),
    })

    // Increment member count
    const communityData = communitySnap.data()
    batch.update(communityRef, {
      memberCount: (communityData.memberCount || 0) + 1,
    })

    await batch.commit()

    return memberRef.id
  } catch (error) {
    console.error('Error joining community:', error)
    throw error
  }
}

/**
 * Leave community
 */
export async function leaveCommunity(
  userId: string,
  communityId: string
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITY_MEMBERS),
      where('userId', '==', userId),
      where('communityId', '==', communityId)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error('Membership not found')
    }

    const batch = writeBatch(db)

    // Delete membership
    for (const memberDoc of snapshot.docs) {
      batch.delete(memberDoc.ref)
    }

    // Decrement member count
    const communityRef = doc(db, COLLECTIONS.COMMUNITIES, communityId)
    const communitySnap = await getDoc(communityRef)

    if (communitySnap.exists()) {
      batch.update(communityRef, {
        memberCount: Math.max(0, (communitySnap.data().memberCount || 1) - 1),
      })
    }

    await batch.commit()
  } catch (error) {
    console.error('Error leaving community:', error)
    throw error
  }
}

/**
 * Get user's communities
 */
export async function getUserCommunities(
  userId: string
): Promise<(CommunityMember & { community?: Community })[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITY_MEMBERS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    const memberships: (CommunityMember & { community?: Community })[] = []

    for (const memberDoc of snapshot.docs) {
      const membership = {
        ...memberDoc.data(),
        memberId: memberDoc.id,
      } as CommunityMember

      // Fetch community data
      const communityRef = doc(db, COLLECTIONS.COMMUNITIES, membership.communityId)
      const communitySnap = await getDoc(communityRef)

      if (communitySnap.exists()) {
        memberships.push({
          ...membership,
          community: {
            ...communitySnap.data(),
            communityId: communitySnap.id,
          } as Community,
        })
      }
    }

    return memberships
  } catch (error) {
    console.error('Error getting user communities:', error)
    throw error
  }
}

/**
 * Get user's communities count
 */
export async function getUserCommunitiesCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITY_MEMBERS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Error getting user communities count:', error)
    throw error
  }
}

/**
 * Get community members
 */
export async function getCommunityMembers(
  communityId: string
): Promise<CommunityMember[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITY_MEMBERS),
      where('communityId', '==', communityId)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      memberId: doc.id,
    } as CommunityMember))
  } catch (error) {
    console.error('Error getting community members:', error)
    throw error
  }
}

/**
 * Search communities by name
 */
export async function searchCommunities(searchTerm: string): Promise<Community[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COMMUNITIES),
      where('isPublic', '==', true)
    )

    const snapshot = await getDocs(q)
    const communities = snapshot.docs
      .map((doc) => ({
        ...doc.data(),
        communityId: doc.id,
      } as Community))
      .filter(
        (community) =>
          community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.description.toLowerCase().includes(searchTerm.toLowerCase())
      )

    return communities
  } catch (error) {
    console.error('Error searching communities:', error)
    throw error
  }
}

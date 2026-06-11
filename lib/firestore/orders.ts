/**
 * Firestore Orders Service
 */

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Order, COLLECTIONS } from './types'

/**
 * Fetch all orders for a creator's courses
 * In a real app, we might need a composite index or a more complex query
 * For now, we fetch all orders and filter or fetch by creatorId if added to Order type
 */
export async function fetchCreatorOrders(creatorId: string, limit_: number = 50): Promise<Order[]> {
  try {
    // For this implementation, we assume Orders have a creatorId field for easy fetching
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc'),
      limit(limit_)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      orderId: doc.id,
    } as Order))
  } catch (error) {
    console.error('Error fetching orders:', error)
    // Fallback: If creatorId is not in Order, we might need to fetch by courseIds
    throw error
  }
}

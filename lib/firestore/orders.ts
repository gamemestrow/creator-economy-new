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
  } catch (error: any) {
    // Fallback if index is not yet created
    if (error.code === 'failed-precondition' || error.message?.includes('index')) {
      console.warn('Firestore index missing for fetchCreatorOrders, falling back to in-memory sort')
      const q = query(
        collection(db, COLLECTIONS.ORDERS),
        where('creatorId', '==', creatorId)
      )
      const snapshot = await getDocs(q)
      const orders = snapshot.docs.map((doc) => ({
        ...doc.data(),
        orderId: doc.id,
      } as Order))

      return orders
        .sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0
          const dateB = b.createdAt?.seconds || 0
          return dateB - dateA
        })
        .slice(0, limit_)
    }
    console.error('Error fetching orders:', error)
    throw error
  }
}

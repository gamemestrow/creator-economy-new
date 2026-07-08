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
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Order, COLLECTIONS } from './types'


interface PlaceOrderParams {
  userId: string;
  creatorId: string;
  courseId: string;
  courseName?: string;
  userName?: string;
  userEmail?: string;
  amount: number;
  currency: string;
  paymentProvider: "razorpay" | "stripe" | "paypal";
  status?: "completed" | "pending" | "failed" | "refunded";
}

/**
 * Fetch all orders for a creator's courses
 */
export async function fetchCreatorOrders(creatorId: string, limit_: number = 50): Promise<Order[]> {
  try {
    // For this implementation, we assume Orders have a creatorId field for easy fetching

    console.log(creatorId)
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc'),
      limit(limit_)
    )
    const snapshot = await getDocs(q)
    console.log(snapshot.docs.map((doc) => ({
      ...doc.data(),
      orderId: doc.id,
    } as Order)))
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

/**
 * place an order by attendee
 */

export const placeOrder = async (
  data: PlaceOrderParams
): Promise<Order> => {
  try {
    // Generate a new document reference

    const orderRef = doc(collection(db, "orders"));

    const order: Order = {
      orderId: orderRef.id,
      userId: data.userId,
      creatorId: data.creatorId,
      userName: data.userName,
      userEmail: data.userEmail,
      courseId: data.courseId,
      courseName: data.courseName,
      amount: data.amount,
      currency: data.currency,
      paymentProvider: data.paymentProvider,
      status: data.status ?? "pending",
      createdAt: serverTimestamp(),
    };

    await setDoc(orderRef, order);

    return order;
  } catch (error) {
    console.error("Failed to place order:", error);
    throw error;
  }
};


/**
 * Check if user has preordered a course
 */
export async function isUserPlaceOrder(
  userId: string,
  courseId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('userId', '==', userId),
      where('courseId', '==', courseId),
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking enrollment:', error)
    throw error
  }
}
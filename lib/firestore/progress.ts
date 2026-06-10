/**
 * Firestore Progress Service
 * Functions to track learning progress
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Progress, COLLECTIONS, Certificate } from './types'

/**
 * Get user's progress for a specific course
 */
export async function getUserCourseProgress(
  userId: string,
  courseId: string
): Promise<Progress | null> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    return {
      ...snapshot.docs[0].data(),
      progressId: snapshot.docs[0].id,
    } as Progress
  } catch (error) {
    console.error('Error getting user course progress:', error)
    throw error
  }
}

/**
 * Get all user's progress
 */
export async function getUserAllProgress(userId: string): Promise<Progress[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      progressId: doc.id,
    } as Progress))
  } catch (error) {
    console.error('Error getting user all progress:', error)
    throw error
  }
}

/**
 * Update course progress
 */
export async function updateCourseProgress(
  userId: string,
  courseId: string,
  lessonIndex: number,
  totalLessons: number
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error('Progress record not found')
    }

    const progressDoc = snapshot.docs[0]
    const progressRef = doc(db, COLLECTIONS.PROGRESS, progressDoc.id)

    const isCompleted = lessonIndex + 1 >= totalLessons
    const percentage = Math.round(((lessonIndex + 1) / totalLessons) * 100)

    const updateData: any = {
      currentLesson: lessonIndex,
      percentage: Math.min(100, percentage),
      completedLessons: Math.min(lessonIndex + 1, totalLessons),
      lastUpdatedAt: serverTimestamp(),
    }

    // If progress reached 100%, mark as completed and create certificate
    if (isCompleted) {
      updateData.completedAt = serverTimestamp()
      updateData.percentage = 100
    }

    await updateDoc(progressRef, updateData)

    // Create certificate if progress reached 100%
    if (isCompleted) {
      await createCertificateIfNeeded(userId, courseId)
    }
  } catch (error) {
    console.error('Error updating course progress:', error)
    throw error
  }
}

/**
 * Get count of courses in progress (0-99%)
 */
export async function getInProgressCoursesCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    const count = snapshot.docs.filter(
      (doc) => doc.data().percentage > 0 && doc.data().percentage < 100
    ).length

    return count
  } catch (error) {
    console.error('Error getting in progress courses count:', error)
    throw error
  }
}

/**
 * Get count of completed courses (100%)
 */
export async function getCompletedCoursesCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    const count = snapshot.docs.filter(
      (doc) => doc.data().percentage === 100
    ).length

    return count
  } catch (error) {
    console.error('Error getting completed courses count:', error)
    throw error
  }
}

/**
 * Get progress statistics for dashboard
 */
export async function getUserProgressStats(userId: string): Promise<{
  enrolledCount: number
  inProgressCount: number
  completedCount: number
}> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    const docs = snapshot.docs

    const stats = {
      enrolledCount: docs.length,
      inProgressCount: docs.filter(
        (doc) => doc.data().percentage > 0 && doc.data().percentage < 100
      ).length,
      completedCount: docs.filter((doc) => doc.data().percentage === 100).length,
    }

    return stats
  } catch (error) {
    console.error('Error getting user progress stats:', error)
    throw error
  }
}

/**
 * Create certificate when course is completed
 */
async function createCertificateIfNeeded(
  userId: string,
  courseId: string
): Promise<void> {
  try {
    // Check if certificate already exists
    const q = query(
      collection(db, COLLECTIONS.CERTIFICATES),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      // Certificate already exists
      return
    }

    // Fetch course data for certificate
    const courseRef = doc(db, COLLECTIONS.COURSES, courseId)
    const courseSnap = await getDoc(courseRef)

    if (!courseSnap.exists()) {
      throw new Error('Course not found')
    }

    const courseData = courseSnap.data()

    // Create certificate
    const certificateId = `${userId}_${courseId}`
    const certificateRef = doc(db, COLLECTIONS.CERTIFICATES, certificateId)

    await setDoc(certificateRef, {
      userId,
      courseId,
      courseName: courseData.title,
      issuedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error creating certificate:', error)
    // Don't throw - certificate creation is secondary to progress update
  }
}

/**
 * Reset progress (admin only)
 */
export async function resetUserCourseProgress(
  userId: string,
  courseId: string
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PROGRESS),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error('Progress record not found')
    }

    const progressRef = doc(db, COLLECTIONS.PROGRESS, snapshot.docs[0].id)

    await updateDoc(progressRef, {
      currentLesson: 0,
      percentage: 0,
      completedLessons: 0,
      lastUpdatedAt: serverTimestamp(),
      completedAt: null,
    })
  } catch (error) {
    console.error('Error resetting progress:', error)
    throw error
  }
}

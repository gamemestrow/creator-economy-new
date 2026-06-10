/**
 * Firestore Enrollments Service
 * Functions to manage course enrollments
 */

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Enrollment, COLLECTIONS, Course } from './types'

/**
 * Check if user is enrolled in a course
 */
export async function isUserEnrolled(
  userId: string,
  courseId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ENROLLMENTS),
      where('userId', '==', userId),
      where('courseId', '==', courseId),
      where('isActive', '==', true)
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking enrollment:', error)
    throw error
  }
}

/**
 * Get user's enrollments with course data
 */
export async function fetchUserEnrollments(userId: string): Promise<
  (Enrollment & {
    course?: Course
  })[]
> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ENROLLMENTS),
      where('userId', '==', userId),
      where('isActive', '==', true)
    )

    const snapshot = await getDocs(q)
    const enrollments: (Enrollment & { course?: Course })[] = []

    for (const enrollmentDoc of snapshot.docs) {
      const enrollment = {
        ...enrollmentDoc.data(),
        enrollmentId: enrollmentDoc.id,
      } as Enrollment

      // Fetch course data
      const courseRef = doc(db, COLLECTIONS.COURSES, enrollment.courseId)
      const courseSnap = await getDoc(courseRef)

      if (courseSnap.exists()) {
        enrollment.courseId = courseSnap.data().courseId || courseSnap.id

        enrollments.push({
          ...enrollment,
          course: {
            ...courseSnap.data(),
            courseId: courseSnap.id,
          } as Course,
        })
      }
    }

    return enrollments
  } catch (error) {
    console.error('Error fetching user enrollments:', error)
    throw error
  }
}

/**
 * Get count of user's enrolled courses
 */
export async function getUserEnrollmentCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ENROLLMENTS),
      where('userId', '==', userId),
      where('isActive', '==', true)
    )

    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Error getting enrollment count:', error)
    throw error
  }
}

/**
 * Enroll user in a course
 */
export async function enrollUserInCourse(
  userId: string,
  courseId: string
): Promise<string> {
  try {
    // Check if already enrolled
    const isEnrolled = await isUserEnrolled(userId, courseId)
    if (isEnrolled) {
      throw new Error('User is already enrolled in this course')
    }

    // Check if course exists and is published
    const courseRef = doc(db, COLLECTIONS.COURSES, courseId)
    const courseSnap = await getDoc(courseRef)

    if (!courseSnap.exists() || !courseSnap.data().isPublished) {
      throw new Error('Course not found or is not published')
    }

    // Create enrollment
    const batch = writeBatch(db)

    const enrollmentRef = doc(
      collection(db, COLLECTIONS.ENROLLMENTS),
      `${userId}_${courseId}`
    )

    batch.set(enrollmentRef, {
      userId,
      courseId,
      enrolledAt: serverTimestamp(),
      lastAccessedAt: serverTimestamp(),
      isActive: true,
    })

    // Increment enrollment count on course
    const courseData = courseSnap.data()
    batch.update(courseRef, {
      enrollmentCount: (courseData.enrollmentCount || 0) + 1,
    })

    // Create progress tracking
    const progressRef = doc(
      collection(db, COLLECTIONS.PROGRESS),
      `${userId}_${courseId}`
    )

    batch.set(progressRef, {
      userId,
      courseId,
      currentLesson: 0,
      percentage: 0,
      completedLessons: 0,
      totalLessons: courseData.totalLessons || 0,
      lastUpdatedAt: serverTimestamp(),
    })

    await batch.commit()

    return enrollmentRef.id
  } catch (error) {
    console.error('Error enrolling user in course:', error)
    throw error
  }
}

/**
 * Unenroll user from a course
 */
export async function unenrollUserFromCourse(
  userId: string,
  courseId: string
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ENROLLMENTS),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error('Enrollment not found')
    }

    const batch = writeBatch(db)

    // Delete enrollment
    for (const enrollmentDoc of snapshot.docs) {
      batch.delete(enrollmentDoc.ref)
    }

    // Decrement enrollment count on course
    const courseRef = doc(db, COLLECTIONS.COURSES, courseId)
    const courseSnap = await getDoc(courseRef)

    if (courseSnap.exists()) {
      batch.update(courseRef, {
        enrollmentCount: Math.max(0, (courseSnap.data().enrollmentCount || 1) - 1),
      })
    }

    await batch.commit()
  } catch (error) {
    console.error('Error unenrolling user from course:', error)
    throw error
  }
}

/**
 * Get enrollment by ID
 */
export async function getEnrollmentById(
  enrollmentId: string
): Promise<Enrollment | null> {
  try {
    const docRef = doc(db, COLLECTIONS.ENROLLMENTS, enrollmentId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        enrollmentId: docSnap.id,
      } as Enrollment
    }

    return null
  } catch (error) {
    console.error('Error getting enrollment:', error)
    throw error
  }
}

/**
 * Update enrollment last accessed time
 */
export async function updateEnrollmentLastAccessed(
  userId: string,
  courseId: string
): Promise<void> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ENROLLMENTS),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const enrollmentDoc = snapshot.docs[0]
      const enrollmentRef = doc(db, COLLECTIONS.ENROLLMENTS, enrollmentDoc.id)

      await db.app;
      // This would need updateDoc from firebase/firestore
      const updateDoc = (await import('firebase/firestore')).updateDoc
      await updateDoc(enrollmentRef, {
        lastAccessedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error('Error updating enrollment:', error)
    throw error
  }
}

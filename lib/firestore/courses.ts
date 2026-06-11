/**
 * Firestore Courses Service
 * Functions to fetch and manage courses
 */

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  QueryConstraint,
  orderBy,
  limit,
  startAfter,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Course, COLLECTIONS } from './types'

/**
 * Create a new course
 */
export async function createCourse(courseData: Omit<Course, 'courseId' | 'createdAt' | 'updatedAt' | 'enrollmentCount'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.COURSES), {
      ...courseData,
      enrollmentCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

/**
 * Update an existing course
 */
export async function updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.COURSES, courseId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}

/**
 * Delete a course
 */
export async function deleteCourse(courseId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.COURSES, courseId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}

/**
 * Fetch all courses for a specific creator
 */
export async function fetchCreatorCourses(creatorId: string): Promise<Course[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COURSES),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      courseId: doc.id,
    } as Course))
  } catch (error) {
    console.error('Error fetching creator courses:', error)
    throw error
  }
}

/**
 * Fetch all published courses
 */
export async function fetchPublishedCourses(
  pageSize: number = 12,
  cursor?: any
): Promise<{ courses: Course[]; nextCursor?: any }> {
  try {
    const constraints: QueryConstraint[] = [
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize + 1),
    ]

    if (cursor) {
      constraints.push(startAfter(cursor))
    }

    const q = query(collection(db, COLLECTIONS.COURSES), ...constraints)
    const snapshot = await getDocs(q)
    const docs = snapshot.docs

    let courses: Course[] = []
    let nextCursor: any = null

    if (docs.length > pageSize) {
      courses = docs.slice(0, pageSize).map((doc) => ({
        ...doc.data(),
        courseId: doc.id,
      } as Course))
      nextCursor = docs[pageSize]
    } else {
      courses = docs.map((doc) => ({
        ...doc.data(),
        courseId: doc.id,
      } as Course))
    }

    return { courses, nextCursor }
  } catch (error) {
    console.error('Error fetching published courses:', error)
    throw error
  }
}

/**
 * Search courses by title or tags
 */
export async function searchCourses(searchTerm: string): Promise<Course[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COURSES),
      where('isPublished', '==', true)
    )

    const snapshot = await getDocs(q)
    const courses = snapshot.docs
      .map((doc) => ({
        ...doc.data(),
        courseId: doc.id,
      } as Course))
      .filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )

    return courses
  } catch (error) {
    console.error('Error searching courses:', error)
    throw error
  }
}

/**
 * Fetch course by ID
 */
export async function fetchCourseById(courseId: string): Promise<Course | null> {
  try {
    const docRef = doc(db, COLLECTIONS.COURSES, courseId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        courseId: docSnap.id,
      } as Course
    }

    return null
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}

/**
 * Fetch courses by category
 */
export async function fetchCoursesByCategory(
  category: string,
  limit_: number = 12
): Promise<Course[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COURSES),
      where('isPublished', '==', true),
      where('category', '==', category),
      limit(limit_)
    )

    const snapshot = await getDocs(q)
    const courses = snapshot.docs.map((doc) => ({
      ...doc.data(),
      courseId: doc.id,
    } as Course))

    return courses
  } catch (error) {
    console.error('Error fetching courses by category:', error)
    throw error
  }
}

/**
 * Fetch top-rated courses
 */
export async function fetchTopRatedCourses(limit_: number = 6): Promise<Course[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.COURSES),
      where('isPublished', '==', true),
      orderBy('rating', 'desc'),
      limit(limit_)
    )

    const snapshot = await getDocs(q)
    const courses = snapshot.docs.map((doc) => ({
      ...doc.data(),
      courseId: doc.id,
    } as Course))

    return courses
  } catch (error) {
    console.error('Error fetching top-rated courses:', error)
    throw error
  }
}

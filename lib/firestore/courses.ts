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
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Course, COLLECTIONS } from './types'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { storage } from '@/lib/firebase'

interface CreateCourseInput {
  title: string
  description: string
  price: number
  image: File | null
  creatorId: string
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

export async function createCourse(input: CreateCourseInput): Promise<string> {
  try {
    // 1. Upload image if provided
    // let thumbnailUrl = ''
    // if (input.image) {
    //   const storageRef = ref(
    //     storage,
    //     `courses/${input.creatorId}/${Date.now()}_${input.image.name}`
    //   )
    //   await uploadBytes(storageRef, input.image)
    //   thumbnailUrl = await getDownloadURL(storageRef)
    // }

    // 2. Write to Firestore
    const courseRef = doc(collection(db, COLLECTIONS.COURSES))
    await setDoc(courseRef, {
      courseId: courseRef.id,
      title: input.title,
      description: input.description,
      price: input.price,
      // thumbnail: thumbnailUrl,
      creatorId: input.creatorId,
      isPublished: false,
      totalLessons: 0,
      enrollmentCount: 0,
      rating: null,
      tags: [],
      category: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    

    return courseRef.id
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export async function deleteCourse(courseId: string): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.COURSES, courseId), { isDeleted: true }, { merge: true })
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}
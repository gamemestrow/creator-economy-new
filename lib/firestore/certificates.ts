/**
 * Firestore Certificates Service
 * Functions to manage certificates
 */

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Certificate, COLLECTIONS } from './types'

/**
 * Get all user's certificates
 */
export async function getUserCertificates(userId: string): Promise<Certificate[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.CERTIFICATES),
      where('userId', '==', userId),
      orderBy('issuedAt', 'desc')
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      certificateId: doc.id,
    } as Certificate))
  } catch (error) {
    console.error('Error getting user certificates:', error)
    throw error
  }
}

/**
 * Get count of user's certificates
 */
export async function getUserCertificatesCount(userId: string): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTIONS.CERTIFICATES),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Error getting certificates count:', error)
    throw error
  }
}

/**
 * Get certificate by ID
 */
export async function getCertificateById(
  certificateId: string
): Promise<Certificate | null> {
  try {
    const docRef = doc(db, COLLECTIONS.CERTIFICATES, certificateId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        certificateId: docSnap.id,
      } as Certificate
    }

    return null
  } catch (error) {
    console.error('Error getting certificate:', error)
    throw error
  }
}

/**
 * Check if user has certificate for course
 */
export async function hasCertificateForCourse(
  userId: string,
  courseId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTIONS.CERTIFICATES),
      where('userId', '==', userId),
      where('courseId', '==', courseId)
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty
  } catch (error) {
    console.error('Error checking certificate:', error)
    throw error
  }
}

/**
 * Generate certificate download URL (placeholder)
 * In production, you would generate a PDF or call a service
 */
export async function generateCertificateUrl(
  certificateId: string,
  userName: string,
  courseName: string,
  issuedDate: Date
): Promise<string> {
  try {
    // This is a placeholder - in production, generate a PDF using a service like:
    // - PDFKit
    // - jsPDF
    // - html2pdf
    // - Firebase Cloud Functions to generate PDF

    const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`
    const certificateUrl = `${baseUrl}/certificates/${certificateId}?name=${encodeURIComponent(userName)}&course=${encodeURIComponent(courseName)}&date=${issuedDate.toISOString()}`

    return certificateUrl
  } catch (error) {
    console.error('Error generating certificate URL:', error)
    throw error
  }
}

/**
 * Verify certificate authenticity (check if it exists in Firestore)
 */
export async function verifyCertificate(certificateId: string): Promise<boolean> {
  try {
    const certificate = await getCertificateById(certificateId)
    return certificate !== null
  } catch (error) {
    console.error('Error verifying certificate:', error)
    throw error
  }
}

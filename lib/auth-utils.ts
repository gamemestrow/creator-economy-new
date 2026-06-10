import { auth, db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'

export type UserRole = 'creator' | 'attendee' | null

export async function getUserRole(user: User | null): Promise<UserRole> {
  if (!user) return null

  try {
    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const data = userDocSnap.data()
      return (data.role as UserRole) || null
    }

    return null
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}

export function getRedirectPath(role: UserRole): string {
  if (role === 'creator') {
    return '/creator/dashboard'
  } else if (role === 'attendee') {
    return '/attendee/dashboard'
  }
  return '/select-role'
}

export async function saveUserRole(
  userId: string,
  role: 'creator' | 'attendee'
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, { role })
  } catch (error) {
    console.error('Error saving user role:', error)
    throw error
  }
}

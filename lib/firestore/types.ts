/**
 * Firestore Collections Schema and Types
 */

// ============= USERS COLLECTION =============
export interface User {
  uid: string // Document ID (Firebase Auth UID)
  name: string
  email: string
  role: 'creator' | 'attendee'
  avatar?: string
  bio?: string
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

// ============= COURSES COLLECTION =============
export interface Course {
  courseId: string // Document ID
  title: string
  description: string
  creatorId: string // Reference to creator (user.uid)
  creatorName?: string // Denormalized for display
  thumbnail?: string
  price: number // 0 for free courses
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  totalLessons: number
  enrollmentCount: number // Denormalized count
  rating?: number // Average rating
  tags: string[]
  isPublished: boolean
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

// ============= ENROLLMENTS COLLECTION =============
export interface Enrollment {
  enrollmentId: string // Document ID
  userId: string // Reference to user
  courseId: string // Reference to course
  enrolledAt: any // Firestore Timestamp
  lastAccessedAt?: any // Firestore Timestamp
  isActive: boolean
}

// ============= PROGRESS COLLECTION =============
export interface Progress {
  progressId: string // Document ID
  userId: string
  courseId: string
  currentLesson: number // Lesson index (0-based)
  percentage: number // 0-100
  lastLesson?: number
  completedLessons: number
  totalLessons: number
  completedAt?: any // Firestore Timestamp when progress reaches 100%
  lastUpdatedAt: any // Firestore Timestamp
}

// ============= CERTIFICATES COLLECTION =============
export interface Certificate {
  certificateId: string // Document ID
  userId: string
  courseId: string
  courseName: string // Denormalized
  issuedAt: any // Firestore Timestamp
  expiresAt?: any // Optional expiry date
  certificateUrl?: string
}

// ============= EVENTS COLLECTION =============
export interface Event {
  eventId: string // Document ID
  title: string
  description: string
  creatorId: string // Reference to creator
  creatorName?: string // Denormalized
  thumbnail?: string
  date: any // Firestore Timestamp
  duration: number // in minutes
  maxAttendees?: number
  currentAttendees: number // Denormalized count
  eventType: 'live' | 'webinar' | 'workshop'
  registrationDeadline?: any // Firestore Timestamp
  isPublished: boolean
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

// ============= EVENT_REGISTRATIONS COLLECTION =============
export interface EventRegistration {
  registrationId: string // Document ID
  userId: string
  eventId: string
  registeredAt: any // Firestore Timestamp
  status: 'registered' | 'attended' | 'cancelled'
  cancellationReason?: string
}

// ============= COMMUNITIES COLLECTION =============
export interface Community {
  communityId: string // Document ID
  name: string
  description: string
  creatorId: string // Reference to creator who created the community
  creatorName?: string // Denormalized
  thumbnail?: string
  category: string
  memberCount: number // Denormalized count
  isPublic: boolean
  rules?: string
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

// ============= COMMUNITY_MEMBERS COLLECTION =============
export interface CommunityMember {
  memberId: string // Document ID
  communityId: string
  userId: string
  role: 'admin' | 'moderator' | 'member'
  joinedAt: any // Firestore Timestamp
}

// ============= COMMUNITY_POSTS COLLECTION =============
export interface CommunityPost {
  postId: string // Document ID
  communityId: string
  userId: string
  userName?: string // Denormalized
  userAvatar?: string // Denormalized
  title?: string
  content: string
  attachments?: string[]
  likes: number
  replies: number
  createdAt: any // Firestore Timestamp
  updatedAt: any // Firestore Timestamp
}

/**
 * Firestore Collection Paths
 */
export const COLLECTIONS = {
  USERS: 'users',
  COURSES: 'courses',
  ENROLLMENTS: 'enrollments',
  PROGRESS: 'progress',
  CERTIFICATES: 'certificates',
  EVENTS: 'events',
  EVENT_REGISTRATIONS: 'eventRegistrations',
  COMMUNITIES: 'communities',
  COMMUNITY_MEMBERS: 'communityMembers',
  COMMUNITY_POSTS: 'communityPosts',
} as const

/**
 * Firestore Indexes Required
 * 
 * 1. courses collection
 *    - isPublished (Ascending)
 *    - createdAt (Descending)
 * 
 * 2. enrollments collection
 *    - userId (Ascending)
 *    - enrolledAt (Descending)
 * 
 * 3. progress collection
 *    - userId (Ascending)
 *    - percentage (Descending)
 * 
 * 4. certificates collection
 *    - userId (Ascending)
 *    - issuedAt (Descending)
 * 
 * 5. events collection
 *    - isPublished (Ascending)
 *    - date (Ascending)
 * 
 * 6. communityMembers collection
 *    - communityId (Ascending)
 *    - userId (Ascending)
 */

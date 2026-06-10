/**
 * FIREBASE FIRESTORE INTEGRATION SETUP GUIDE
 * For Attendee Module - TagMango Creator Economy Platform
 */

/**
 * ============================================
 * SETUP INSTRUCTIONS
 * ============================================
 */

const SETUP_STEPS = `

1. FIRESTORE SECURITY RULES
   ========================
   
   a. Go to Firebase Console > Your Project > Firestore Database > Rules
   b. Replace all content with rules from: lib/firestore/security-rules.ts
   c. Click "Publish"
   d. Wait for deployment (usually < 1 minute)

   Note: Keep a copy of the default rules in case you need to revert.

2. CREATE FIRESTORE INDEXES
   ========================
   
   The following indexes should be created automatically when you first run queries,
   but you can pre-create them in Firebase Console:
   
   a. Courses Index:
      - Collection: courses
      - Fields: isPublished (Ascending), createdAt (Descending)
   
   b. Enrollments Index:
      - Collection: enrollments
      - Fields: userId (Ascending), enrolledAt (Descending)
   
   c. Progress Index:
      - Collection: progress
      - Fields: userId (Ascending), percentage (Descending)
   
   d. Certificates Index:
      - Collection: certificates
      - Fields: userId (Ascending), issuedAt (Descending)
   
   e. Events Index:
      - Collection: events
      - Fields: isPublished (Ascending), date (Ascending)
   
   f. Community Members Index:
      - Collection: communityMembers
      - Fields: communityId (Ascending), userId (Ascending)

3. ENVIRONMENT VARIABLES
   =====================
   
   Verify these are in your .env.local:
   
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

4. TEST DATA SETUP
   ================
   
   Create test data in Firestore for development:
   
   a. Create a test course in the 'courses' collection:
      {
        "title": "Introduction to Next.js",
        "description": "Learn Next.js fundamentals",
        "creatorId": "creator_id_here",
        "creatorName": "John Doe",
        "price": 29.99,
        "category": "web-development",
        "difficulty": "beginner",
        "duration": 120,
        "totalLessons": 12,
        "enrollmentCount": 0,
        "rating": 4.5,
        "tags": ["nextjs", "react", "web-development"],
        "isPublished": true,
        "createdAt": server-timestamp,
        "updatedAt": server-timestamp
      }
   
   b. Create a test event in the 'events' collection:
      {
        "title": "Live Q&A: Creator Business",
        "description": "Ask questions about building a creator business",
        "creatorId": "creator_id_here",
        "creatorName": "Jane Doe",
        "date": future-timestamp,
        "duration": 60,
        "maxAttendees": 100,
        "currentAttendees": 0,
        "eventType": "live",
        "isPublished": true,
        "createdAt": server-timestamp,
        "updatedAt": server-timestamp
      }
   
   c. Create a test community in the 'communities' collection:
      {
        "name": "Next.js Developers",
        "description": "A community for Next.js developers",
        "creatorId": "creator_id_here",
        "creatorName": "John Doe",
        "category": "web-development",
        "memberCount": 1,
        "isPublic": true,
        "createdAt": server-timestamp,
        "updatedAt": server-timestamp
      }

5. INSTALL DEPENDENCIES
   ====================
   
   All required packages should already be installed:
   - firebase
   - react
   - next
   
   If not, run:
   npm install firebase@latest

6. VERIFY SETUP
   =============
   
   Run your development server:
   npm run dev
   
   Test the following workflows:
   
   a. Sign up as a new user (attendee)
   b. Navigate to /attendee/dashboard
   c. Verify stats load from Firestore
   d. Enroll in a test course
   e. Verify enrollment appears in Firestore
   f. Register for a test event
   g. Join a test community

`;

/**
 * ============================================
 * FILE STRUCTURE CREATED
 * ============================================
 */

const FILE_STRUCTURE = `

lib/
├── firestore/
│   ├── index.ts                    # Main export
│   ├── types.ts                    # TypeScript types and schema
│   ├── security-rules.ts           # Firestore security rules
│   ├── courses.ts                  # Course service functions
│   ├── enrollments.ts              # Enrollment service functions
│   ├── progress.ts                 # Progress tracking service
│   ├── certificates.ts             # Certificate service functions
│   ├── events.ts                   # Event service functions
│   └── communities.ts              # Community service functions
│
├── hooks/
│   ├── use-attendee-data.ts        # Query hooks
│   └── use-attendee-mutations.ts   # Mutation hooks
│
└── ATTENDEE_IMPLEMENTATION.ts      # Setup guide (this file)

components/
└── attendee/
    ├── index.ts                    # Components export
    ├── dashboard-stats.tsx         # Stats display component
    ├── featured-courses.tsx        # Courses component with enrollment
    └── upcoming-events.tsx         # Events component with registration

app/
└── attendee/
    └── dashboard/
        └── page.tsx                # Updated dashboard with Firestore

`;

/**
 * ============================================
 * KEY FEATURES IMPLEMENTED
 * ============================================
 */

const FEATURES = `

✅ Firestore Collections & Schema
   - users (with role field)
   - courses
   - enrollments
   - progress
   - certificates
   - events
   - eventRegistrations
   - communities
   - communityMembers

✅ Enrollment System
   - Enroll in courses
   - Unenroll from courses
   - Duplicate prevention
   - Automatic progress creation
   - Real-time enrollment count updates

✅ Progress Tracking
   - Track lesson progress (0-100%)
   - Auto-generate certificates at 100%
   - In-progress course counting
   - Completed course counting
   - Progress statistics

✅ Certificates
   - Auto-generate on course completion
   - List user certificates
   - Certificate verification
   - Download URL generation (placeholder for PDF service)

✅ Events System
   - Browse upcoming events
   - Register for events
   - Cancel registrations
   - Event attendance tracking
   - Real-time attendee count updates

✅ Communities
   - Browse public communities
   - Join/leave communities
   - Community membership tracking
   - Member count updates
   - Community search

✅ Real-time Dashboard
   - Enrolled courses count
   - In-progress courses count
   - Certificates earned count
   - Communities joined count
   - Featured courses with enrollment
   - Upcoming events with registration

✅ Security
   - User data isolation
   - Role-based access control
   - Public/private resource visibility
   - Enrollment verification
   - Community membership validation

`;

/**
 * ============================================
 * COMMON TASKS & CODE EXAMPLES
 * ============================================
 */

const CODE_EXAMPLES = `

1. FETCH USER ENROLLMENTS
   ======================
   
   import { useDashboardStats } from '@/lib/hooks/use-attendee-data'
   
   const Dashboard = () => {
     const { stats, loading, error } = useDashboardStats(userId)
     
     return (
       <div>
         <p>Enrolled: {stats.enrolledCount}</p>
         <p>In Progress: {stats.inProgressCount}</p>
       </div>
     )
   }

2. ENROLL IN A COURSE
   ===================
   
   import { useEnrollInCourse } from '@/lib/hooks/use-attendee-mutations'
   
   const CourseCard = ({ courseId, userId }) => {
     const { enroll, loading, error } = useEnrollInCourse()
     
     const handleEnroll = async () => {
       try {
         await enroll(userId, courseId)
         console.log('Enrolled successfully')
       } catch (err) {
         console.error('Enrollment failed:', err)
       }
     }
     
     return <button onClick={handleEnroll}>Enroll</button>
   }

3. REGISTER FOR AN EVENT
   ======================
   
   import { useRegisterForEvent } from '@/lib/hooks/use-attendee-mutations'
   
   const EventCard = ({ eventId, userId }) => {
     const { register, loading } = useRegisterForEvent()
     
     const handleRegister = async () => {
       await register(userId, eventId)
     }
     
     return <button onClick={handleRegister}>Register</button>
   }

4. JOIN A COMMUNITY
   =================
   
   import { useJoinCommunity } from '@/lib/hooks/use-attendee-mutations'
   
   const CommunityCard = ({ communityId, userId }) => {
     const { join, loading } = useJoinCommunity()
     
     const handleJoin = async () => {
       await join(userId, communityId)
     }
     
     return <button onClick={handleJoin}>Join Community</button>
   }

5. FETCH CERTIFICATES
   ====================
   
   import { useUserCertificates } from '@/lib/hooks/use-attendee-data'
   
   const CertificatesPage = ({ userId }) => {
     const { certificates, loading } = useUserCertificates(userId)
     
     return (
       <div>
         {certificates.map(cert => (
           <div key={cert.certificateId}>
             {cert.courseName}
           </div>
         ))}
       </div>
     )
   }

`;

/**
 * ============================================
 * TROUBLESHOOTING
 * ============================================
 */

const TROUBLESHOOTING = `

Problem: "Permission denied" error when fetching data
Solution: 
  1. Check security rules in Firebase Console
  2. Verify user is authenticated
  3. Ensure rules allow reading published documents
  4. Check collection names match exactly

Problem: Enrollment not appearing in Firestore
Solution:
  1. Check if course is published (isPublished: true)
  2. Verify userId and courseId are correct
  3. Check security rules allow enrollment creation
  4. Ensure batch write is completing successfully

Problem: Hooks not updating in real-time
Solution:
  1. This implementation uses snapshots, not listeners
  2. For real-time updates, use onSnapshot instead
  3. See advanced features section for listener implementation

Problem: Dashboard stats showing 0
Solution:
  1. Make sure user is enrolled in courses
  2. Verify Firestore index is created for progress queries
  3. Check userId is being passed correctly to hooks
  4. Inspect browser console for errors

Problem: Certificate not auto-generating on 100%
Solution:
  1. Verify progress update to 100% succeeded
  2. Check Firestore has certificates collection
  3. Ensure user has write permission to certificates
  4. Check for errors in progress.ts createCertificateIfNeeded function

`;

/**
 * ============================================
 * NEXT FEATURES TO BUILD
 * ============================================
 */

const FUTURE_FEATURES = `

1. Real-time Updates
   - Use onSnapshot for live data
   - Real-time enrollment counts
   - Live event attendance updates
   - Live progress tracking

2. Course Pages
   - Full course details
   - Lesson list and content
   - Progress bar
   - Reviews and ratings

3. My Courses Page
   - List enrolled courses
   - Resume course functionality
   - Progress visualization
   - Completion status

4. Certificates Page
   - Download certificate as PDF
   - Share certificate
   - Verify certificate authenticity
   - Certificate gallery

5. Communities
   - Community feed/posts
   - Member profiles
   - Discussion boards
   - Moderation tools

6. Advanced Features
   - Course recommendations (ML)
   - Learning paths
   - Leaderboards
   - Achievement badges
   - Social following
   - Private messaging

7. Analytics
   - User learning analytics
   - Course performance
   - Engagement metrics
   - Completion rates

`;

export const SETUP_GUIDE = {
  SETUP_STEPS,
  FILE_STRUCTURE,
  FEATURES,
  CODE_EXAMPLES,
  TROUBLESHOOTING,
  FUTURE_FEATURES,
}

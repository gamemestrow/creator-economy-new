import { Star, Users } from 'lucide-react'
import { useEnrollInCourse } from '@/lib/hooks/use-attendee-mutations'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useEffect, useState } from 'react'
import { isUserEnrolled } from '@/lib/firestore/enrollments'
import { Course } from '@/lib/firestore/types'
import { placeOrder, isUserPlaceOrder } from '@/lib/firestore/orders'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'



export function CourseCard({
  courseId,
  title,
  creatorName,
  category,
  rating,
  price,
  enrollmentCount,
  isPublished,
  creatorId
}: Course) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      case 'Intermediate':
        return 'bg-primary/10 text-primary border border-primary/20'
      case 'Advanced':
        return 'bg-primary/10 text-primary border border-primary/20'
      default:
        return 'bg-muted text-foreground border border-border'
    }
  }


  const { enrollUser, loading, error, success } = useEnrollInCourse()
  const [uid, setuid] = useState('')
  const [isEnrolled, setisEnrolled] = useState(false)
  const [isOrderPlaced, setisOrderPlaced] = useState(false)
  const {userData} = useAuth()


  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  useEffect(() => {
    if (!user || !authorized) return;

    setuid(user.uid);
  }, [user, authorized]);

  useEffect(() => {

    async function checkEnrollment() {
      const isEnrolled = await isUserEnrolled(uid, courseId);

      if (isEnrolled) {
        setisEnrolled(true)
      } else {
        setisEnrolled(false)
      }
    }
    checkEnrollment();

    async function checkPreorder() {
      const isOrderPlaced = await isUserPlaceOrder(uid, courseId);

      if (isOrderPlaced) {
        setisOrderPlaced(true)
      } else {
        setisOrderPlaced(false)
      }
    }
    checkPreorder();
  }, [isEnrolled, isOrderPlaced, uid, courseId]);

  const data = {
    userId: uid,
    creatorId: creatorId,
    userName: userData?.name || 'Unknown User',
    userEmail: user?.email || 'Unknown Email',
    courseId: courseId,
    courseName: title,
    amount: price,
    currency: 'INR',
    paymentProvider: 'stripe' as const,
    status: 'pending' as const,
  }


  const createPreorder = async () => {
    await placeOrder(data)
  }

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isPublished) {
      enrollUser(uid, courseId)
    } else {
      createPreorder()
    }
  }


  return (
    <Link className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300" href={(`courses/${courseId}`)}>
      {/* Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <div className="text-6xl">image</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#78866B] transition-colors">
          {title}
        </h3>

        {/* creatorName */}
        <p className="text-sm text-muted-foreground mb-3">{creatorName}</p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(rating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{rating}</span>
          {/* <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span> */}
        </div>

        {/* Students */}
        <div className="flex items-center gap-1 mb-4 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{enrollmentCount.toLocaleString()} students</span>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-3 flex-1" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleEnrollClick}
            className={`px-4 py-2 ${isEnrolled ? "bg-green-500" : "bg-[#2563EB]"} text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors active:scale-95`}
          >
            {isPublished ? (isEnrolled ? 'Enrolled' : 'Enroll') : (isOrderPlaced ? "Order Already Placed" : 'Pre Order')}
          </button>
        </div>
      </div>
    </Link>
  )
}

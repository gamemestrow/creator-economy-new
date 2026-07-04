import { Star, Users } from 'lucide-react'
import { useEnrollInCourse } from '@/lib/hooks/use-attendee-mutations'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useEffect, useState } from 'react'
import { isUserEnrolled } from '@/lib/firestore/enrollments'
import { useRouter } from 'next/navigation'
interface CourseCardProps {
  id: string
  title: string
  creatorName: string
  category: string
  level: string
  rating: number
  reviews: number
  price: number
  image: string
  enrollmentCount: number
}

export function CourseCard({
  id,
  title,
  creatorName,
  category,
  level,
  rating,
  reviews,
  price,
  image,
  enrollmentCount,
}: CourseCardProps) {
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


  const { enroll, loading, error, success } = useEnrollInCourse()
  const [uid, setuid] = useState('')
  const [isEnrolled, setisEnrolled] = useState(false)
  const router = useRouter();


  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  useEffect(() => {
    if (!user || !authorized) return;

    setuid(user.uid);
  }, [user, authorized]);

  useEffect(() => {

    async function checkEnrollment() {
      const isEnrolled = await isUserEnrolled(uid, id);

      if (isEnrolled) {
        setisEnrolled(true)
      } else {
        setisEnrolled(false)
      }
    }
    checkEnrollment();
  }, [isEnrolled, uid, id]);

  return (
    <div className="group flex flex-col h-full bg-white border border-border rounded-lg overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-border" onClick={() => router.push(`courses/${id}`)}>
      {/* Image */}
      <div className="relative w-full h-48 bg-primary   flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <div className="text-6xl">{image}</div>
        <div className="absolute inset-0 bg-primary from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 text-xs font-medium bg-muted text-foreground rounded">
            {category}
          </span>
          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded text-center ${getLevelColor(level)}`}>
            {level}
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
                className={`h-3.5 w-3.5 ${i < Math.floor(rating)
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
          <button onClick={() => enroll(uid, id)} className={`px-4 py-2 ${isEnrolled ? "bg-green-500" : "bg-[#78866B]"} text-white text-xs font-semibold rounded-lg hover:bg-primary transition-colors active:scale-95`}>
            {isEnrolled ? 'Enrolled' : 'Enroll'}
          </button>
        </div>
      </div>
    </div>
  )
}

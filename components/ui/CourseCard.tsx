import { MoreHorizontal, Trash2, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'
import { Course } from '@/lib/firestore/types'

function CourseCard({ course, onDelete }: { course: Course, onDelete: (id: string) => void }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.category}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-input rounded transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-40 bg-card border border-border rounded-lg shadow-xl z-10 py-1">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this course?')) {
                    onDelete(course.courseId)
                  }
                  setShowMenu(false)
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Course
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{(course.enrollmentCount || 0).toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>{course.rating || 0} ★</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">₹{course.price || 0}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${course.isPublished
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
              }`}
          >
            {course.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Created {new Date(course.createdAt?.seconds * 1000).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default CourseCard

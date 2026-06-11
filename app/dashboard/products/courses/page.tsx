'use client'

import { useState } from 'react'
import { Plus, MoreHorizontal, Users, TrendingUp, Clock, BookOpen, Trash2, Loader2, X } from 'lucide-react'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorCourses } from '@/lib/hooks/use-creator-data'
import { createCourse, deleteCourse } from '@/lib/firestore/courses'
import { Course } from '@/lib/firestore/types'

function StatCard({ icon: Icon, label, value, loading }: any) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          {loading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{value}</p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

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
          <span className="font-semibold text-foreground">${course.price || 0}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.isPublished
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

export default function CoursesPage() {
  const { loading: authLoading, user } = useRequireRole(['creator'])
  const { courses, loading: coursesLoading, refresh } = useCreatorCourses(user?.uid || '')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    price: 0,
    difficulty: 'beginner' as const,
    isPublished: true,
  })

  const totalStudents = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0)
  const totalRevenue = courses.reduce((sum, c) => sum + ((c.enrollmentCount || 0) * (c.price || 0)), 0)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsCreating(true)
      // await createCourse({
      //   ...formData,
      //   creatorId: user.uid,
      //   creatorName: user.displayName || 'Unknown Creator',
      //   totalLessons: 1, // Default
      //   duration: 60, // Default
      //   tags: [formData.category],
      // })
      setShowCreateModal(false)
      setFormData({
        title: '',
        description: '',
        category: 'Development',
        price: 0,
        difficulty: 'beginner',
        isPublished: true,
      })
      await refresh()
    } catch (error) {
      console.error('Failed to create course:', error)
      alert('Failed to create course. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id)
      await refresh()
    } catch (error) {
      console.error('Failed to delete course:', error)
      alert('Failed to delete course.')
    }
  }

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground mt-2">Manage all online courses and learning content</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={BookOpen} label="Total Courses" value={courses.length} loading={coursesLoading} />
          <StatCard icon={Users} label="Total Students" value={totalStudents.toLocaleString()} loading={coursesLoading} />
          <StatCard icon={TrendingUp} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} loading={coursesLoading} />
        </div>

        {/* Courses Grid */}
        {coursesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-card border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.courseId} course={course} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border rounded-xl">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No courses found</h3>
            <p className="text-muted-foreground">Start by creating your first online course.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="mt-6 text-primary hover:underline font-medium"
            >
              Create Course
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Create New Course</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Course Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced React Patterns"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn..."
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-border"
                />
                <label htmlFor="published" className="text-sm text-foreground">Publish immediately</label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

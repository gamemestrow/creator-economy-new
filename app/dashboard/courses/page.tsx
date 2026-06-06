'use client'

import { Plus, MoreHorizontal, Users, TrendingUp, Clock, BookOpen } from 'lucide-react'

const mockCourses = [
  {
    id: 1,
    title: 'Web Development Masterclass',
    instructor: 'Sarah Chen',
    students: 1250,
    rating: 4.8,
    revenue: '$12,500',
    status: 'Active',
    created: '2024-01-10',
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    instructor: 'John Developer',
    students: 890,
    rating: 4.9,
    revenue: '$8,900',
    status: 'Active',
    created: '2024-02-05',
  },
  {
    id: 3,
    title: 'AI & Machine Learning 101',
    instructor: 'Emma Watson',
    students: 2100,
    rating: 4.7,
    revenue: '$18,200',
    status: 'Active',
    created: '2024-01-15',
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    instructor: 'Lisa Johnson',
    students: 650,
    rating: 4.6,
    revenue: '$5,200',
    status: 'Draft',
    created: '2024-04-01',
  },
]

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        </div>
        <button className="p-2 hover:bg-input rounded transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>{course.rating} ★</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">{course.revenue}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {course.status}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Created {course.created}</p>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const totalCourses = mockCourses.length
  const totalStudents = mockCourses.reduce((sum, c) => sum + c.students, 0)
  const totalRevenue = mockCourses.reduce((sum, c) => sum + parseInt(c.revenue.replace('$', '').replace(',', '')), 0)

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground mt-2">Manage all online courses and learning content</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={BookOpen} label="Total Courses" value={totalCourses} />
          <StatCard icon={Users} label="Total Students" value={totalStudents.toLocaleString()} />
          <StatCard icon={TrendingUp} label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}

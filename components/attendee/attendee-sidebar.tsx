import { Award, BarChart3, BookOpen, LogOut, Settings, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const AttendeeSidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
    const router = useRouter()
    const location = usePathname()
    const handleLogout = async () => {
        try {
            await signOut(auth)
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }
    return (
        <aside
            className={cn(
                "fixed inset-y-0 top-[73px] left-0 w-64 border-r border-gray-200 bg-white p-6 transition-transform duration-300 z-20 md:relative md:top-0 md:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <nav className="space-y-1">
                {[
                    { icon: BarChart3, label: 'Dashboard', link: "/attendee/dashboard" },
                    { icon: BookOpen, label: 'Courses', link: '/attendee/courses' },
                    { icon: Award, label: 'Certificates', link: '/attendee/membership' },
                    { icon: Users, label: 'Community', link: '/attendee/community' },
                    { icon: Settings, label: 'Settings', link: '/attendee/settings' },
                ].map((item) => {
                    const active = location === item.link


                    return (<Link
                        key={item.label}
                        href={item.link}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-colors",
                            active
                                ? "bg-[#2563EB]/10 text-[#2563EB]"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>)

                })}
            </nav>

            <div className="mt-auto border-t border-gray-100 pt-4 md:hidden">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 font-medium hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default AttendeeSidebar

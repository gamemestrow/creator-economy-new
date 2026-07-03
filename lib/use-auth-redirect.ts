import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUserRole, getRedirectPath, UserRole } from '@/lib/auth-utils'

export function useAuthRedirect() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login')
        return
      }

      const userRole = await getUserRole(firebaseUser)
      setUser(firebaseUser)
      setRole(userRole)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  return { loading, user, role }
}

export function useRequireRole(allowedRoles: UserRole[]) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authorized, setAuthorized] = useState(false)

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    try {
      if (!firebaseUser) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      const userRole = await getUserRole(firebaseUser);

      if (!userRole || !allowedRoles.includes(userRole)) {
        setLoading(false);
        router.replace(getRedirectPath(userRole));
        return;
      }

      setUser(firebaseUser);
      setAuthorized(true);
    } finally {
      setLoading(false);
    }
  });

  return unsubscribe;
}, [router, allowedRoles]);

  return { loading, user, authorized }
}

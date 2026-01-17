'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { authApi } from '@/lib/api/auth'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { setUser, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function checkAuth() {
      if (!isAuthenticated()) {
        setIsLoading(false)
        return
      }

      try {
        const status = await authApi.getAuthStatus()
        setUser({
          id: status.user_id,
          email: status.email,
          is_verified: status.is_verified,
        })
      } catch (error) {
        console.error('Auth check failed:', error)
        logout()
        if (pathname?.startsWith('/projects')) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return <>{children}</>
}
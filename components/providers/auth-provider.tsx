'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { authApi } from '@/lib/api/auth'
import { useEffect } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout, isAuthenticated } = useAuthStore()

  useEffect(() => {
    async function validateAuth() {
      // Only validate if we think we're authenticated
      if (!isAuthenticated()) {
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
        console.error('Auth validation failed:', error)
        // Token is invalid or expired, clear auth state
        logout()
      }
    }

    validateAuth()
  }, [])

  return <>{children}</>
}
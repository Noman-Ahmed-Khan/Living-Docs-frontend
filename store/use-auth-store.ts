import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: {
    id: string
    email: string
    is_verified: boolean
  } | null
  setTokens: (accessToken: string, refreshToken: string) => void
  setUser: (user: AuthState['user']) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken })
        // Set cookie for middleware
        if (typeof window !== 'undefined') {
          document.cookie = `auth-storage=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
        }
      },

      setUser: (user) => {
        set({ user })
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null })
        // Remove cookie
        if (typeof window !== 'undefined') {
          document.cookie = 'auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      },

      isAuthenticated: () => {
        return !!get().accessToken
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
)
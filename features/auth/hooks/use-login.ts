import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useLogin() {
  const router = useRouter()
  const { setTokens, setUser } = useAuthStore()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return authApi.login(email, password)
    },
    onSuccess: async (data) => {
      setTokens(data.access_token, data.refresh_token)

      // Fetch user profile
      try {
        const status = await authApi.getAuthStatus()
        setUser({
          id: status.user_id,
          email: status.email,
          is_verified: status.is_verified,
        })

        toast.success('Welcome back!')

        // Use replace instead of push to prevent back button issues
        // Small delay to ensure state is fully updated
        setTimeout(() => {
          router.replace('/projects')
        }, 100)
      } catch (error) {
        toast.error('Failed to load user profile')
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Login failed'
      toast.error(message)
    },
  })
}
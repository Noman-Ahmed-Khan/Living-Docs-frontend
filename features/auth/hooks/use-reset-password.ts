import { useMutation } from '@tanstack/react-query'
import { authApi, ResetPasswordRequest } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useResetPassword() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successful! You can now login.')
      router.push('/login')
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Password reset failed'
      toast.error(message)
    },
  })
}
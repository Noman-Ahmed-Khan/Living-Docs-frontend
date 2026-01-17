import { useMutation } from '@tanstack/react-query'
import { authApi, ForgotPasswordRequest } from '@/lib/api/auth'
import { toast } from 'sonner'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to send reset email'
      toast.error(message)
    },
  })
}
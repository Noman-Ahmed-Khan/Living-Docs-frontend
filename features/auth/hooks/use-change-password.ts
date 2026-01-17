import { useMutation } from '@tanstack/react-query'
import { authApi, ChangePasswordRequest } from '@/lib/api/auth'
import { toast } from 'sonner'

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to change password')
    },
  })
}
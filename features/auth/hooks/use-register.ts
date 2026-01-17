import { useMutation } from '@tanstack/react-query'
import { authApi, RegisterRequest } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success('Account created! Please check your email to verify your account.')
      router.push('/login')
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Registration failed'
      toast.error(message)
    },
  })
}
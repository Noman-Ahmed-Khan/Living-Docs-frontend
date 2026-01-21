import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/lib/api/users'
import { toast } from 'sonner'

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: usersApi.getProfile,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      toast.success('Profile updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { password: string, confirmation: 'DELETE' }) => usersApi.deleteAccount(data.password, data.confirmation),
    onSuccess: () => {
      toast.success('Account deleted successfully')
      window.location.href = '/login'
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete account')
    }
  })
}
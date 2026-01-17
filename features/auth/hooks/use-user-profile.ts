import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/lib/api/users'

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: usersApi.getProfile,
  })
}
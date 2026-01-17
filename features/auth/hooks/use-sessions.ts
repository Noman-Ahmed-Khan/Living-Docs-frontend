import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/api/auth'
import { toast } from 'sonner'

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: authApi.getSessions,
  })
}

export function useRevokeSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => authApi.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      toast.success('Session revoked successfully')
    },
    onError: () => {
      toast.error('Failed to revoke session')
    },
  })
}

export function useLogoutAll() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logoutAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      toast.success('All sessions terminated')
    },
    onError: () => {
      toast.error('Failed to logout all sessions')
    },
  })
}
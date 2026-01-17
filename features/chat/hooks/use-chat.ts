import { useMutation } from '@tanstack/react-query'
import { queryApi, QueryRequest } from '@/lib/api/query'

export function useChat() {
  return useMutation({
    mutationFn: (request: QueryRequest) => queryApi.query(request),
  })
}

export function useFindSimilar() {
  return useMutation({
    mutationFn: queryApi.findSimilar,
  })
}
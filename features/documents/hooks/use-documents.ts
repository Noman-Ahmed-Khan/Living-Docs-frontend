import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { documentsApi, DocumentStatus } from '@/lib/api/documents'
import { toast } from 'sonner'

export function useDocuments(
  projectId: string,
  params?: { status?: DocumentStatus; page?: number }
) {
  return useQuery({
    queryKey: ['documents', projectId, params],
    queryFn: () => documentsApi.list(projectId, params),
    enabled: !!projectId,
    refetchInterval: (data) => {
      // Refetch every 3 seconds if there are processing documents
      const hasProcessing = data?.items.some(
        (doc) =>
          doc.status === DocumentStatus.PROCESSING ||
          doc.status === DocumentStatus.PENDING
      )
      return hasProcessing ? 3000 : false
    },
  })
}

export function useDocument(documentId: string, projectId: string) {
  return useQuery({
    queryKey: ['documents', projectId, documentId],
    queryFn: () => documentsApi.get(documentId, projectId),
    enabled: !!documentId && !!projectId,
  })
}

export function useDocumentStatus(documentId: string, projectId: string) {
  return useQuery({
    queryKey: ['documents', projectId, documentId, 'status'],
    queryFn: () => documentsApi.getStatus(documentId, projectId),
    enabled: !!documentId && !!projectId,
    refetchInterval: 2000, // Poll every 2 seconds
  })
}

export function useUploadDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      documentsApi.upload(projectId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId, 'stats'] })
      toast.success('Document uploaded successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to upload document')
    },
  })
}

export function useBulkUpload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, files }: { projectId: string; files: File[] }) =>
      documentsApi.bulkUpload(projectId, files),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId, 'stats'] })
      
      const successCount = data.total_uploaded
      const failCount = data.total_failed
      
      if (successCount > 0) {
        toast.success(`${successCount} document(s) uploaded successfully`)
      }
      if (failCount > 0) {
        toast.error(`${failCount} document(s) failed to upload`)
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to upload documents')
    },
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, projectId }: { documentId: string; projectId: string }) =>
      documentsApi.delete(documentId, projectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId, 'stats'] })
      toast.success('Document deleted')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete document')
    },
  })
}

export function useReingestDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      documentId,
      projectId,
      options,
    }: {
      documentId: string
      projectId: string
      options?: { chunk_size?: number; chunk_overlap?: number; force?: boolean }
    }) => documentsApi.reingest(documentId, projectId, options),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.projectId] })
      toast.success('Document re-processing started')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to re-process document')
    },
  })
}
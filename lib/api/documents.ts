import apiClient from './client'

export enum DocumentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Document {
  id: string
  filename: string
  original_filename: string
  project_id: string
  file_size?: number
  file_type?: string
  status: DocumentStatus
  status_message?: string
  chunk_count: number
  page_count?: number
  character_count?: number
  created_at: string
  updated_at: string
  processed_at?: string
}

export interface DocumentDetail extends Document {
  content_type?: string
  file_path: string
}

export interface DocumentUploadResponse {
  document: Document
  message: string
  processing: boolean
}

export interface BulkUploadResponse {
  uploaded: Document[]
  failed: Array<{ filename: string; error: string }>
  total_uploaded: number
  total_failed: number
}

export interface DocumentListResponse {
  items: Document[]
  total: number
  page: number
  page_size: number
  pages: number
}

export interface DocumentIngestionStatus {
  document_id: string
  status: DocumentStatus
  message?: string
  progress?: number
  chunks_created: number
  pages_processed?: number
  started_at?: string
  completed_at?: string
}

export const documentsApi = {
  upload: async (
    projectId: string,
    file: File,
    processImmediately = true
  ): Promise<DocumentUploadResponse> => {
    const formData = new FormData()
    formData.append('project_id', projectId)
    formData.append('file', file)
    formData.append('process_immediately', String(processImmediately))

    const { data } = await apiClient.post<DocumentUploadResponse>(
      '/api/v1/documents/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },

  bulkUpload: async (
    projectId: string,
    files: File[]
  ): Promise<BulkUploadResponse> => {
    const formData = new FormData()
    formData.append('project_id', projectId)
    files.forEach((file) => {
      formData.append('files', file)
    })

    const { data } = await apiClient.post<BulkUploadResponse>(
      '/api/v1/documents/upload/bulk',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },

  list: async (
    projectId: string,
    params?: {
      page?: number
      page_size?: number
      status?: DocumentStatus
    }
  ): Promise<DocumentListResponse> => {
    const { data } = await apiClient.get<DocumentListResponse>(
      `/api/v1/documents/project/${projectId}`,
      { params }
    )
    return data
  },

  get: async (documentId: string, projectId: string): Promise<DocumentDetail> => {
    const { data } = await apiClient.get<DocumentDetail>(
      `/api/v1/documents/${documentId}`,
      { params: { project_id: projectId } }
    )
    return data
  },

  getStatus: async (
    documentId: string,
    projectId: string
  ): Promise<DocumentIngestionStatus> => {
    const { data } = await apiClient.get<DocumentIngestionStatus>(
      `/api/v1/documents/${documentId}/status`,
      { params: { project_id: projectId } }
    )
    return data
  },

  delete: async (documentId: string, projectId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/documents/${documentId}`, {
      params: { project_id: projectId },
    })
  },

  reingest: async (
    documentId: string,
    projectId: string,
    options?: {
      chunk_size?: number
      chunk_overlap?: number
      force?: boolean
    }
  ): Promise<Document> => {
    const { data } = await apiClient.post<Document>(
      `/api/v1/documents/${documentId}/reingest`,
      options,
      { params: { project_id: projectId } }
    )
    return data
  },

  getSupportedTypes: async (): Promise<string[]> => {
    const { data } = await apiClient.get<string[]>(
      '/api/v1/documents/supported-types'
    )
    return data
  },
}
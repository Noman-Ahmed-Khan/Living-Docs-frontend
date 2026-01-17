import apiClient from './client'

export enum RetrievalStrategy {
  SIMILARITY = 'similarity',
  MMR = 'mmr',
  HYBRID = 'hybrid',
}

export interface Citation {
  chunk_id: string
  document_id?: string
  source_file: string
  page?: number
  char_start?: number
  char_end?: number
  text_snippet?: string
  relevance_score?: number
}

export interface QueryRequest {
  project_id: string
  question: string
  document_ids?: string[]
  include_all_sources?: boolean
  retrieval_strategy?: RetrievalStrategy
  top_k?: number
}

export interface QueryResponse {
  answer: string
  citations: Citation[]
  metadata?: Record<string, any>
  query_id?: string
}

export interface SimilarChunksRequest {
  project_id: string
  text: string
  top_k?: number
  document_ids?: string[]
}

export interface SimilarChunksResponse {
  chunks: Citation[]
  query_text: string
}

export const queryApi = {
  query: async (request: QueryRequest): Promise<QueryResponse> => {
    const { data } = await apiClient.post<QueryResponse>('/api/v1/query/', request)
    return data
  },

  findSimilar: async (
    request: SimilarChunksRequest
  ): Promise<SimilarChunksResponse> => {
    const { data } = await apiClient.post<SimilarChunksResponse>(
      '/api/v1/query/similar',
      request
    )
    return data
  },
}
import apiClient from './client'

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export interface Project {
  id: string
  name: string
  description?: string
  owner_id: string
  status: ProjectStatus
  chunk_size: number
  chunk_overlap: number
  created_at: string
  updated_at: string
}

export interface ProjectCreate {
  name: string
  description?: string
  chunk_size?: number
  chunk_overlap?: number
}

export interface ProjectUpdate {
  name?: string
  description?: string
  status?: ProjectStatus
  chunk_size?: number
  chunk_overlap?: number
}

export interface ProjectStats {
  document_count: number
  completed_documents: number
  failed_documents: number
  pending_documents: number
  total_chunks: number
  total_size_bytes: number
}

export interface ProjectWithStats extends Project {
  stats: ProjectStats
}

export interface ProjectListResponse {
  items: Project[]
  total: number
  page: number
  page_size: number
  pages: number
}

export const projectsApi = {
  list: async (params?: {
    page?: number
    page_size?: number
    status?: ProjectStatus
  }): Promise<ProjectListResponse> => {
    const { data } = await apiClient.get<ProjectListResponse>('/api/v1/projects/', {
      params,
    })
    return data
  },

  create: async (project: ProjectCreate): Promise<Project> => {
    const { data } = await apiClient.post<Project>('/api/v1/projects/', project)
    return data
  },

  get: async (projectId: string): Promise<Project> => {
    const { data } = await apiClient.get<Project>(`/api/v1/projects/${projectId}`)
    return data
  },

  getWithStats: async (projectId: string): Promise<ProjectWithStats> => {
    const { data } = await apiClient.get<ProjectWithStats>(
      `/api/v1/projects/${projectId}/stats`
    )
    return data
  },

  update: async (projectId: string, updates: ProjectUpdate): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(
      `/api/v1/projects/${projectId}`,
      updates
    )
    return data
  },

  delete: async (projectId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/projects/${projectId}`)
  },

  archive: async (projectId: string): Promise<Project> => {
    const { data } = await apiClient.post<Project>(
      `/api/v1/projects/${projectId}/archive`
    )
    return data
  },

  unarchive: async (projectId: string): Promise<Project> => {
    const { data } = await apiClient.post<Project>(
      `/api/v1/projects/${projectId}/unarchive`
    )
    return data
  },
}
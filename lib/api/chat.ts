import apiClient from './client'

export interface ChatSessionSummary {
    id: string
    project_id: string
    title: string | null
    is_active: boolean
    created_at: string
    updated_at: string
    last_message_at: string | null
}

export interface ChatSessionCreate {
    project_id: string
    title?: string | null
}

export interface ChatMessageRead {
    id: string
    session_id: string
    role: 'user' | 'assistant'
    content: string
    created_at: string
}

export const chatApi = {
    listSessions: async (projectId?: string): Promise<ChatSessionSummary[]> => {
        const params = projectId ? { project_id: projectId } : {}
        const { data } = await apiClient.get<ChatSessionSummary[]>('/api/v1/chat/sessions', {
            params,
        })
        return data
    },

    createSession: async (session: ChatSessionCreate): Promise<ChatSessionSummary> => {
        const { data } = await apiClient.post<ChatSessionSummary>('/api/v1/chat/sessions', session)
        return data
    },

    deleteSession: async (sessionId: string): Promise<void> => {
        await apiClient.delete(`/api/v1/chat/sessions/${sessionId}`)
    },

    getSessionMessages: async (sessionId: string): Promise<ChatMessageRead[]> => {
        const { data } = await apiClient.get<ChatMessageRead[]>(
            `/api/v1/chat/sessions/${sessionId}/messages`
        )
        return data
    },
}

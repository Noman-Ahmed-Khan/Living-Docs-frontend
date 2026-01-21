'use client'

import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chatApi, ChatSessionSummary, ChatMessageRead } from '@/lib/api/chat'
import { Message, ChatSession } from '../types'

export function useChatHistory(projectId: string) {
    const queryClient = useQueryClient()
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

    // Fetch all sessions for the project
    const { data: sessionSummaries = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['chat-sessions', projectId],
        queryFn: () => chatApi.listSessions(projectId),
        enabled: !!projectId,
    })

    // Fetch messages for the current session
    const { data: apiMessages = [], isLoading: messagesLoading } = useQuery({
        queryKey: ['chat-messages', currentSessionId],
        queryFn: () => chatApi.getSessionMessages(currentSessionId!),
        enabled: !!currentSessionId,
    })

    // Map session summaries to our internal ChatSession type
    const sessions: ChatSession[] = sessionSummaries.map(s => ({
        id: s.id,
        title: s.title || 'Untitled Chat',
        projectId: s.project_id,
        lastModified: s.updated_at,
    }))

    const projectSessions = sessions.sort(
        (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    )

    // Map API messages to our internal Message type
    const messages: Message[] = apiMessages.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.created_at,
    }))

    // Create new session mutation
    const createSessionMutation = useMutation({
        mutationFn: (title: string = 'New Chat') => chatApi.createSession({ project_id: projectId, title }),
        onSuccess: (newSession) => {
            queryClient.invalidateQueries({ queryKey: ['chat-sessions', projectId] })
            setCurrentSessionId(newSession.id)
        },
    })

    // Delete session mutation
    const deleteSessionMutation = useMutation({
        mutationFn: (sessionId: string) => chatApi.deleteSession(sessionId),
        onSuccess: (_, sessionId) => {
            queryClient.invalidateQueries({ queryKey: ['chat-sessions', projectId] })
            if (currentSessionId === sessionId) {
                setCurrentSessionId(null)
            }
        },
    })

    const currentSession = projectSessions.find(s => s.id === currentSessionId) || null

    const addMessageToSession = useCallback(async (sessionId: string, message: Message) => {
        // This is now primarily for invalidating the cache to trigger a re-fetch
        // since the backend handles message creation via the query endpoint.
        await queryClient.invalidateQueries({ queryKey: ['chat-messages', sessionId] })
        // Also invalidate sessions to update the "last_message_at" or title
        await queryClient.invalidateQueries({ queryKey: ['chat-sessions', projectId] })
    }, [queryClient, projectId])

    return {
        sessions: projectSessions,
        currentSession,
        currentSessionId,
        messages,
        isLoading: sessionsLoading || messagesLoading,
        setCurrentSessionId,
        createNewSession: createSessionMutation.mutateAsync,
        deleteSession: deleteSessionMutation.mutate,
        addMessageToSession,
    }
}

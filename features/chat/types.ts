import { Citation } from '@/lib/api/query'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  timestamp: string
  isError?: boolean
}

export interface ChatSession {
  id: string
  title: string
  projectId: string
  lastModified: string
}


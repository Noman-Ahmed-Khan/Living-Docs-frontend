import { Citation } from '@/lib/api/query'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  timestamp: Date
  isError?: boolean
}
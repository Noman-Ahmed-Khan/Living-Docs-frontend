'use client'

import { Message } from '../types'
import { formatDateTime } from '@/lib/utils'
import { User, Bot, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface MessageBubbleProps {
  message: Message
  onCitationClick?: (citation: any) => void
}

export function MessageBubble({ message, onCitationClick }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  const handleCitationClick = (citationId: string) => {
    const citation = message.citations?.find((c) => c.chunk_id === citationId)
    if (citation && onCitationClick) {
      onCitationClick(citation)
    }
  }

  const processContent = (content: string) => {
    // Replace citation markers [chunk_id] with clickable links
    return content.replace(/\[([^\]]+)\]/g, (match, citationId) => {
      return `<button class="citation-link" data-citation="${citationId}">${match}</button>`
    })
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="avatar placeholder">
        <div
          className={`w-10 rounded-full ${
            isUser ? 'bg-primary text-primary-content' : 'bg-secondary text-secondary-content'
          }`}
        >
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-content'
              : message.isError
              ? 'bg-error text-error-content'
              : 'bg-base-200'
          }`}
        >
          {message.isError ? (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{message.content}</span>
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div
              className="prose prose-sm max-w-none"
              onClick={(e) => {
                const target = e.target as HTMLElement
                if (target.classList.contains('citation-link')) {
                  const citationId = target.getAttribute('data-citation')
                  if (citationId) handleCitationClick(citationId)
                }
              }}
              dangerouslySetInnerHTML={{ __html: processContent(message.content) }}
            />
          )}
        </div>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.citations.map((citation, index) => (
              <button
                key={citation.chunk_id}
                className="badge badge-sm badge-outline gap-1 hover:badge-primary"
                onClick={() => onCitationClick?.(citation)}
              >
                <span className="font-mono text-xs">{index + 1}</span>
                {citation.source_file}
                {citation.page && ` (p.${citation.page})`}
              </button>
            ))}
          </div>
        )}

        <span className="text-xs text-base-content/50 mt-1">
          {formatDateTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
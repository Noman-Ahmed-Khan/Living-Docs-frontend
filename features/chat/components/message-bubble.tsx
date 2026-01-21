'use client'

import { Message } from '../types'
import { formatDateTime } from '@/lib/utils'
import { User, Bot, AlertCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    return content.replace(/\[([^\]]+)\]/g, (match, citationId) => {
      const index = message.citations?.findIndex(c => c.chunk_id === citationId)
      const label = index !== undefined && index !== -1 ? `[${index + 1}]` : match

      return `<button class="citation-link group inline-flex items-center justify-center px-1.5 py-0.5 mx-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200" data-citation="${citationId}">${label}</button>`
    })
  }

  return (
    <div className={cn(
      "w-full flex flex-col gap-2 mb-8 animate-fade-in",
      isUser ? "items-end" : "items-start"
    )}>
      <div className={cn(
        "flex items-end gap-3 max-w-[85%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={cn(
          "size-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border",
          isUser ? "bg-base-100 border-base-300 text-base-content/40" : "bg-primary border-primary/20 text-primary-content"
        )}>
          <span className="material-symbols-outlined !text-xl">
            {isUser ? 'person' : 'auto_awesome'}
          </span>
        </div>

        {/* Bubble */}
        <div className={cn(
          "relative group p-4 md:p-6 rounded-[2rem] border transition-all",
          isUser
            ? "bg-base-200/80 border-base-300 rounded-br-lg text-base-content shadow-sm hover:bg-base-200"
            : "bg-primary/5 border-primary/10 rounded-bl-lg text-base-content shadow-sm hover:bg-primary/10"
        )}>
          <div className={cn(
            "text-[15px] leading-relaxed",
            message.isError && "text-error flex items-start gap-2"
          )}>
            {message.isError && <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}

            {message.isError ? (
              <span>{message.content}</span>
            ) : isUser ? (
              <p className="whitespace-pre-wrap font-medium">{message.content}</p>
            ) : (
              <div
                className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-primary dark:prose-invert"
                onClick={(e) => {
                  const target = e.target as HTMLElement
                  const button = target.closest('.citation-link') as HTMLElement
                  if (button) {
                    const citationId = button.getAttribute('data-citation')
                    if (citationId) handleCitationClick(citationId)
                  }
                }}
                dangerouslySetInnerHTML={{ __html: processContent(message.content) }}
              />
            )}
          </div>

          <div className={cn(
            "mt-3 text-[10px] font-bold uppercase tracking-widest text-base-content/30",
            isUser ? "text-right" : "text-left"
          )}>
            {isUser ? 'You' : 'LivingDocs AI'} • {formatDateTime(message.timestamp)}
          </div>
        </div>
      </div>

      {/* Citations Panel Below Bubble */}
      {!isUser && message.citations && message.citations.length > 0 && (
        <div className="ml-14 flex flex-wrap gap-2 animate-fade-in max-w-2xl">
          {message.citations.map((citation, index) => (
            <button
              key={citation.chunk_id || index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-base-200/50 hover:bg-base-200 border border-base-300 transition-all text-[11px] font-bold text-base-content/70 shadow-sm group"
              onClick={() => onCitationClick?.(citation)}
            >
              <span className="size-5 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black group-hover:bg-primary group-hover:text-primary-content transition-colors">
                {index + 1}
              </span>
              <span className="truncate max-w-[150px]">{citation.source_file}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

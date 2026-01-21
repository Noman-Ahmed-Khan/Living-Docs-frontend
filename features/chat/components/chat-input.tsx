'use client'

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react'
import { Send, CornerDownLeft, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="w-full pt-2 pb-6 px-6">
      <div className="max-w-4xl mx-auto relative">
        <div className={cn(
          "relative flex items-end w-full glass-card rounded-2xl border border-base-300/50 shadow-lg focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300",
          disabled && "opacity-60 cursor-not-allowed"
        )}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="w-full bg-transparent px-5 py-4 pr-14 text-base outline-none resize-none min-h-[56px] max-h-[200px] placeholder:text-base-content/30 leading-relaxed"
            rows={1}
            disabled={false} // Don't disable textarea to maintain focus
          />

          <div className="absolute right-2 bottom-2">
            <button
              onClick={() => handleSubmit()}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                input.trim() && !disabled
                  ? "gradient-primary text-white shadow-glow-primary scale-100 opacity-100"
                  : "bg-base-300 text-base-content/30 scale-90 opacity-50 cursor-not-allowed"
              )}
              disabled={!input.trim() || disabled}
              title="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

        </div>

        <p className="mt-3 text-[10px] text-center text-base-content/30 font-medium">
          LivingDocs can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}

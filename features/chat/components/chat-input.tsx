
'use client'

import { useState, FormEvent, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-base-300">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your documents..."
          className="textarea textarea-bordered flex-1 resize-none"
          rows={3}
          disabled={disabled}
        />
        <button
          type="submit"
          className="btn btn-primary btn-circle self-end"
          disabled={!input.trim() || disabled}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="text-xs text-base-content/60 mt-2">
        Press <kbd className="kbd kbd-xs">Enter</kbd> to send,{' '}
        <kbd className="kbd kbd-xs">Shift</kbd> +{' '}
        <kbd className="kbd kbd-xs">Enter</kbd> for new line
      </div>
    </form>
  )
}
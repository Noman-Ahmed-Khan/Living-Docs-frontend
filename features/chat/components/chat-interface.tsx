'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageBubble } from './message-bubble'
import { CitationPanel } from './citation-panel'
import { ChatInput } from './chat-input'
import { useChat } from '../hooks/use-chat'
import { Message } from '../types'
import { Loader2, Settings } from 'lucide-react'
import { RetrievalStrategy } from '@/lib/api/query'

interface ChatInterfaceProps {
  projectId: string
  projectName: string
}

export function ChatInterface({ projectId, projectName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedCitation, setSelectedCitation] = useState<any>(null)
  const [retrievalStrategy, setRetrievalStrategy] = useState<RetrievalStrategy>(
    RetrievalStrategy.MMR
  )
  const [topK, setTopK] = useState(5)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { mutate: sendQuery, isPending } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Send query
    sendQuery(
      {
        project_id: projectId,
        question,
        retrieval_strategy: retrievalStrategy,
        top_k: topK,
      },
      {
        onSuccess: (data) => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.answer,
            citations: data.citations,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
        },
        onError: (error: any) => {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: error.response?.data?.detail || 'Sorry, I encountered an error processing your question.',
            timestamp: new Date(),
            isError: true,
          }
          setMessages((prev) => [...prev, errorMessage])
        },
      }
    )
  }

  return (
    <div className="flex h-full gap-4">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-base-100 rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{projectName}</h2>
            <p className="text-sm text-base-content/70">AI Assistant</p>
          </div>
          <button
            className="btn btn-ghost btn-sm gap-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 bg-base-200 border-b border-base-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Retrieval Strategy</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={retrievalStrategy}
                  onChange={(e) => setRetrievalStrategy(e.target.value as RetrievalStrategy)}
                >
                  <option value={RetrievalStrategy.SIMILARITY}>Similarity</option>
                  <option value={RetrievalStrategy.MMR}>MMR (Diverse)</option>
                  <option value={RetrievalStrategy.HYBRID}>Hybrid</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Top K Results</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="input input-bordered input-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-2">Ask me anything</h3>
                <p className="text-base-content/70 mb-6">
                  I can help you find information from your documents, summarize content,
                  and answer questions based on your uploaded files.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleSendMessage('Summarize the main points from all documents')}
                  >
                    Summarize all documents
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleSendMessage('What are the key findings?')}
                  >
                    What are the key findings?
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCitationClick={setSelectedCitation}
                />
              ))}
              {isPending && (
                <div className="flex items-center gap-3 text-base-content/70">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} disabled={isPending} />
      </div>

      {/* Citation Panel */}
      {selectedCitation && (
        <CitationPanel
          citation={selectedCitation}
          onClose={() => setSelectedCitation(null)}
        />
      )}
    </div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageBubble } from './message-bubble'
import { CitationPanel } from './citation-panel'
import { ChatInput } from './chat-input'
import { useChat } from '../hooks/use-chat'
import { useChatHistory } from '../hooks/use-chat-history'
import { Message } from '../types'
import {
  Loader2,
  Settings,
  Sparkles,
  MessageSquare,
  Plus,
  History,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Bot
} from 'lucide-react'
import { RetrievalStrategy } from '@/lib/api/query'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  projectId: string
  projectName: string
}

export function ChatInterface({ projectId, projectName }: ChatInterfaceProps) {
  const {
    sessions,
    currentSession,
    currentSessionId,
    messages: historyMessages,
    isLoading: historyLoading,
    setCurrentSessionId,
    createNewSession,
    addMessageToSession,
    deleteSession,
  } = useChatHistory(projectId)

  const [selectedCitation, setSelectedCitation] = useState<any>(null)
  const [retrievalStrategy, setRetrievalStrategy] = useState<RetrievalStrategy>(
    RetrievalStrategy.MMR
  )
  const [topK, setTopK] = useState(5)
  const [showSettings, setShowSettings] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { mutate: sendQuery, isPending } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Combine history messages with the currently sending message for optimistic UI
  const messages = [...historyMessages]
  if (pendingMessage) {
    messages.push({
      id: 'pending',
      role: 'user',
      content: pendingMessage,
      timestamp: new Date().toISOString()
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isPending])

  const handleSendMessage = async (question: string) => {
    if (isSubmitting || isPending) return

    setIsSubmitting(true)
    setPendingMessage(question)

    let sessionId = currentSessionId
    if (!sessionId) {
      try {
        const newSession = await createNewSession('New Chat')
        sessionId = newSession.id
      } catch (error) {
        console.error('Failed to create session', error)
        setIsSubmitting(false)
        setPendingMessage(null)
        return
      }
    }

    // Send query with session_id
    sendQuery(
      {
        project_id: projectId,
        question,
        retrieval_strategy: retrievalStrategy,
        top_k: topK,
        session_id: sessionId,
      },
      {
        onSuccess: () => {
          setPendingMessage(null)
          setIsSubmitting(false)
          addMessageToSession(sessionId!, {} as any)
        },
        onError: () => {
          setPendingMessage(null)
          setIsSubmitting(false)
          addMessageToSession(sessionId!, {} as any)
        },
      }
    )
  }



  return (
    <div className="flex h-full w-full bg-base-100 rounded-2xl overflow-hidden shadow-2xl border border-base-200">
      {/* History Sidebar */}
      <div className={cn(
        "bg-base-200/50 border-r border-base-300/30 flex flex-col transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={() => createNewSession('New Chat')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-100 border border-base-300/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-bold shadow-sm mb-6 group"
          >
            <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-1 pr-2">
            <h3 className="px-4 text-[10px] font-bold text-base-content/30 uppercase tracking-widest mb-3 flex items-center gap-2">
              <History className="h-3 w-3" />
              Recent Chats
            </h3>
            {sessions.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-base-content/40 italic">No chat history yet</p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-sm",
                    currentSessionId === session.id
                      ? "bg-primary/10 text-primary font-bold shadow-inner"
                      : "hover:bg-base-300 text-base-content/70 hover:text-base-content"
                  )}
                  onClick={() => setCurrentSessionId(session.id)}
                >
                  <MessageSquare className={cn(
                    "h-4 w-4 flex-shrink-0",
                    currentSessionId === session.id ? "text-primary" : "text-base-content/30"
                  )} />
                  <span className="truncate flex-1 pr-6">{session.title}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSession(session.id)
                    }}
                    className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-error/10 hover:text-error rounded-lg transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative min-w-0 bg-base-100">
        {/* Header */}
        <div className="h-16 border-b border-base-300/30 flex items-center justify-between px-6 bg-base-100/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-base-200 rounded-lg text-base-content/50 hover:text-primary transition-all"
              title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </button>
            <div className="h-4 w-[1px] bg-base-300/30 mx-1" />
            <div>
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {projectName}
              </h2>
              <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest leading-none">AI Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={cn(
                "btn btn-ghost btn-sm btn-circle hover:bg-base-200",
                showSettings && "text-primary bg-base-200"
              )}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Floating Settings */}
        {showSettings && (
          <div className="absolute top-16 right-6 z-20 glass-card p-4 rounded-2xl border border-base-300/50 shadow-xl min-w-[300px] animate-scale-in">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">Retrieval Strategy</label>
                <select
                  className="select select-bordered select-sm w-full bg-base-100"
                  value={retrievalStrategy}
                  onChange={(e) => setRetrievalStrategy(e.target.value as RetrievalStrategy)}
                >
                  <option value={RetrievalStrategy.SIMILARITY}>Similarity</option>
                  <option value={RetrievalStrategy.MMR}>MMR (Diverse)</option>
                  <option value={RetrievalStrategy.HYBRID}>Hybrid</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">Top Results (K)</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="input input-bordered input-sm w-full bg-base-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scroll-smooth flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm border border-primary/20">
                <MessageSquare className="h-8 w-8 text-primary opacity-80" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-bold font-display">How can I help you?</h3>
                <p className="text-sm text-base-content/50 leading-relaxed">
                  I can analyze your project documents and answer any questions with citations.
                </p>
                <div className="grid grid-cols-1 gap-2 mt-8">
                  {[
                    'Summarize the main goals',
                    'Extract key research points',
                    'Explain the results'
                  ].map((query, i) => (
                    <button
                      key={i}
                      className="px-4 py-3 rounded-xl border border-base-300/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-bold text-base-content/60 hover:text-primary text-left bg-base-200/30"
                      onClick={() => handleSendMessage(query)}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCitationClick={setSelectedCitation}
                />
              ))}
              {isPending && (
                <div className="w-full py-8 bg-base-200/30">
                  <div className="max-w-4xl mx-auto px-6 flex gap-6">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-3 text-base-content/30 italic text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-20" />
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="sticky bottom-0 bg-gradient-to-t from-base-100 via-base-100 to-transparent pt-10">
          <ChatInput onSend={handleSendMessage} disabled={isSubmitting || isPending} />
        </div>
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

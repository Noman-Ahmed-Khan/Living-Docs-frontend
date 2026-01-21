'use client'

import { ChatInterface } from '@/features/chat/components/chat-interface'
import { useParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/use-projects'
import { Loader2, AlertCircle } from 'lucide-react'

export default function ProjectChatPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { data: project, isLoading } = useProject(projectId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-base-content/40">Initializing Intelligence...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="glass-card p-12 text-center max-w-lg mx-auto mt-20 flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-error mb-4" />
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <p className="text-base-content/60 mt-2">We couldn't locate the project knowledge base.</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-6rem)]">
      <ChatInterface projectId={projectId} projectName={project.name} />
    </div>
  )
}
'use client'

import { ChatInterface } from '@/features/chat/components/chat-interface'
import { useParams } from 'next/navigation'
import { useProject } from '@/features/projects/hooks/use-projects'
import { Loader2 } from 'lucide-react'

export default function ProjectChatPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { data: project, isLoading } = useProject(projectId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="alert alert-error">
        <span>Project not found</span>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <ChatInterface projectId={projectId} projectName={project.name} />
    </div>
  )
}
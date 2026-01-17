'use client'

import { useProjectWithStats } from '@/features/projects/hooks/use-projects'
import { StatsOverview } from '@/features/projects/components/stats-overview'
import { Loader2, Settings, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProjectDashboardPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { data: project, isLoading } = useProjectWithStats(projectId)

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>
        {project.description && (
          <p className="text-base-content/70 mt-2">{project.description}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Link 
          href={`/projects/${projectId}/documents`}
          className="btn btn-primary gap-2"
        >
          <FileText className="h-5 w-5" />
          Documents
        </Link>
        <Link 
          href={`/projects/${projectId}/chat`}
          className="btn btn-secondary gap-2"
        >
          <MessageSquare className="h-5 w-5" />
          Chat
        </Link>
        <Link 
          href={`/projects/${projectId}/settings`}
          className="btn btn-ghost gap-2"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>

      <StatsOverview stats={project.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="space-y-2">
              <Link 
                href={`/projects/${projectId}/documents`}
                className="btn btn-outline w-full justify-start"
              >
                <FileText className="h-5 w-5" />
                Upload Documents
              </Link>
              <Link 
                href={`/projects/${projectId}/chat`}
                className="btn btn-outline w-full justify-start"
              >
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Project Settings</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-base-content/70">Chunk Size:</span>
                <span className="font-semibold">{project.chunk_size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Chunk Overlap:</span>
                <span className="font-semibold">{project.chunk_overlap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Status:</span>
                <div className={`badge ${project.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                  {project.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
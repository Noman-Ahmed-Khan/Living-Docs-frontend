'use client'

import { useProjects } from '../hooks/use-projects'
import { ProjectCard } from './project-card'
import { Loader2, FolderOpen } from 'lucide-react'
import { ProjectStatus } from '@/lib/api/projects'
import { useState } from 'react'

export function ProjectList() {
  const [status, setStatus] = useState<ProjectStatus | undefined>()
  const { data, isLoading, error } = useProjects({ status })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Failed to load projects. Please try again.</span>
      </div>
    )
  }

  if (!data?.items.length) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-12">
          <FolderOpen className="h-16 w-16 text-base-content/30" />
          <h3 className="text-xl font-semibold mt-4">No projects yet</h3>
          <p className="text-base-content/70">
            Create your first project to get started with document intelligence
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`btn btn-sm ${!status ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(undefined)}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${status === ProjectStatus.ACTIVE ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(ProjectStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${status === ProjectStatus.ARCHIVED ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(ProjectStatus.ARCHIVED)}
        >
          Archived
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {data.pages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
              <button key={page} className="join-item btn btn-sm">
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
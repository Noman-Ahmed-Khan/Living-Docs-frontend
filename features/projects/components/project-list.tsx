'use client'

import { useProjects, useProjectStats } from '../hooks/use-projects'
import { ProjectCard } from './project-card'
import { Loader2, Plus } from 'lucide-react'
import { ProjectStatus } from '@/lib/api/projects'

export function ProjectList() {
  const { data: projects, isLoading } = useProjects({
    page: 1,
    page_size: 100,
    status: ProjectStatus.ACTIVE
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!projects?.items.length) {
    return (
      <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-base-300 bg-base-100/30">
        <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-4">
          <Plus className="h-8 w-8 text-base-content/30" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-base-content/60 max-w-sm mx-auto">
          Get started by creating a new project to manage your documents.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {projects.items.map((project, index) => (
        <div key={project.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-scale-in">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
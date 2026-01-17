'use client'

import { ProjectList } from '@/features/projects/components/project-list'
import { CreateProjectDialog } from '@/features/projects/components/create-project-dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-base-content/70 mt-1">
            Manage your document intelligence projects
          </p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="h-5 w-5" />
          New Project
        </button>
      </div>

      <ProjectList />

      <CreateProjectDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
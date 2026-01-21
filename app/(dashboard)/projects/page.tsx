'use client'

import { ProjectList } from '@/features/projects/components/project-list'
import { CreateProjectDialog } from '@/features/projects/components/create-project-dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">Projects</h1>
          <p className="text-base-content/70 mt-1">
            Manage your document intelligence workspaces
          </p>
        </div>
        <button
          className="btn btn-gradient gap-2 rounded-full px-6 shadow-glow hover:shadow-glow-lg transition-all"
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
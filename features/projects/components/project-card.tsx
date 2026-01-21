'use client'

import { Project, ProjectStatus } from '@/lib/api/projects'
import { formatDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {
  FolderKanban,
  MoreVertical,
  Archive,
  ArchiveRestore,
  Trash2,
  Settings as SettingsIcon,
  FileText,
  Clock,
  Layers
} from 'lucide-react'
import { useArchiveProject, useUnarchiveProject, useDeleteProject } from '../hooks/use-projects'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const archiveMutation = useArchiveProject()
  const unarchiveMutation = useUnarchiveProject()
  const deleteMutation = useDeleteProject()

  const handleArchive = () => {
    archiveMutation.mutate(project.id)
    setShowMenu(false)
  }

  const handleUnarchive = () => {
    unarchiveMutation.mutate(project.id)
    setShowMenu(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure? This will permanently delete the project and all its documents.')) {
      deleteMutation.mutate(project.id)
    }
    setShowMenu(false)
  }

  const navigateToProject = () => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <div
      className="glass-card group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-glow cursor-pointer"
      onClick={navigateToProject}
    >
      {/* Hover Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FolderKanban className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold font-display truncate pr-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-base-content/60 mt-1">
                <Clock className="h-3 w-3" />
                Created {formatDate(project.created_at)}
              </div>
            </div>
          </div>

          <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-sm btn-circle hover:bg-base-content/10"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="h-4 w-4" />
            </label>
            {showMenu && (
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-200">
                <li>
                  <button onClick={() => router.push(`/projects/${project.id}/settings`)} className="hover:bg-base-200">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </button>
                </li>
                <li>
                  {project.status === ProjectStatus.ACTIVE ? (
                    <button onClick={handleArchive} className="hover:bg-base-200">
                      <Archive className="h-4 w-4" />
                      Archive
                    </button>
                  ) : (
                    <button onClick={handleUnarchive} className="hover:bg-base-200">
                      <ArchiveRestore className="h-4 w-4" />
                      Restore
                    </button>
                  )}
                </li>
                <li>
                  <button onClick={handleDelete} className="text-error hover:bg-error/10">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-base-content/70 line-clamp-2 mb-6 h-10">
            {project.description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-4">
          <div className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border",
            project.status === ProjectStatus.ACTIVE
              ? "bg-success/10 text-success border-success/20"
              : "bg-neutral/10 text-neutral border-neutral/20"
          )}>
            {project.status === 'active' ? 'Active' : 'Archived'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-base-300/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-base-200/50 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-base-content/50">Chunk Size</div>
              <div className="font-semibold text-sm">{project.chunk_size}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-base-200/50 flex items-center justify-center">
              <FileText className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <div className="text-xs text-base-content/50">Overlap</div>
              <div className="font-semibold text-sm">{project.chunk_overlap}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
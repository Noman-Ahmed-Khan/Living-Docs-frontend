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
  Settings as SettingsIcon
} from 'lucide-react'
import { useArchiveProject, useUnarchiveProject, useDeleteProject } from '../hooks/use-projects'
import { useState } from 'react'

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

  return (
    <div 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-lg w-12">
                <FolderKanban className="h-6 w-6" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="card-title text-lg truncate">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-base-content/70 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="h-4 w-4" />
            </label>
            {showMenu && (
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={() => router.push(`/projects/${project.id}/settings`)}>
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </button>
                </li>
                <li>
                  {project.status === ProjectStatus.ACTIVE ? (
                    <button onClick={handleArchive}>
                      <Archive className="h-4 w-4" />
                      Archive
                    </button>
                  ) : (
                    <button onClick={handleUnarchive}>
                      <ArchiveRestore className="h-4 w-4" />
                      Restore
                    </button>
                  )}
                </li>
                <li>
                  <button onClick={handleDelete} className="text-error">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className={`badge ${project.status === ProjectStatus.ACTIVE ? 'badge-success' : 'badge-neutral'}`}>
            {project.status}
          </div>
          <div className="text-xs text-base-content/60">
            Created {formatDate(project.created_at)}
          </div>
        </div>

        <div className="stats stats-horizontal shadow mt-4">
          <div className="stat py-3 px-4">
            <div className="stat-title text-xs">Chunk Size</div>
            <div className="stat-value text-lg">{project.chunk_size}</div>
          </div>
          <div className="stat py-3 px-4">
            <div className="stat-title text-xs">Overlap</div>
            <div className="stat-value text-lg">{project.chunk_overlap}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
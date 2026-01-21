'use client'

import { useParams } from 'next/navigation'
import { useProject, useUpdateProject } from '@/features/projects/hooks/use-projects'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProjectSchema, UpdateProjectFormData } from '@/lib/validators/project-schemas'
import { Loader2, Save, Settings, AlertTriangle, RefreshCcw, Layout, Database } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function ProjectSettingsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { data: project, isLoading } = useProject(projectId)
  const updateMutation = useUpdateProject(projectId)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateProjectFormData>({
    resolver: zodResolver(updateProjectSchema),
  })

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description || '',
        chunk_size: project.chunk_size,
        chunk_overlap: project.chunk_overlap,
      })
    }
  }, [project, reset])

  const onSubmit = (data: UpdateProjectFormData) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        reset(data)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-base-content/40">Loading Configuration...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="glass-card p-12 text-center max-w-lg mx-auto mt-20">
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <p className="text-base-content/60 mt-2">The project you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
            <Settings className="h-3 w-3" />
            Project Configuration
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text">Settings</h1>
          <p className="text-base-content/60 font-light max-w-xl">
            Fine-tune the intelligence and behavior of your project workspace.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* General Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Layout className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/40">General Knowledge</h3>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-base-content/70">Project Name</label>
                <input
                  type="text"
                  className={cn(
                    "input input-bordered w-full bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.name && "input-error"
                  )}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-[10px] text-error font-bold uppercase mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-base-content/70">Workspace Description</label>
                <textarea
                  className={cn(
                    "textarea textarea-bordered w-full h-32 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                    errors.description && "textarea-error"
                  )}
                  placeholder="Describe the purpose of this project..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-[10px] text-error font-bold uppercase mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Config */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Database className="h-4 w-4 text-secondary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/40">Intelligence Engine</h3>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-warning/5 border border-warning/10">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold">Heads Up</h4>
                <p className="text-xs text-base-content/60 leading-relaxed font-medium">
                  Changing chunking parameters will only affect newly uploaded documents. To apply changes to existing files, you'll need to re-process them individually.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold text-base-content/70">
                  <label>Chunk Size</label>
                  <span className="text-[10px] uppercase font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">100 - 4000 chars</span>
                </div>
                <input
                  type="number"
                  className={cn(
                    "input input-bordered w-full bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.chunk_size && "input-error"
                  )}
                  {...register('chunk_size', { valueAsNumber: true })}
                />
                <p className="text-[10px] text-base-content/40 font-medium leading-normal">
                  The number of characters per document piece. Large chunks provide more context but might use more tokens.
                </p>
                {errors.chunk_size && (
                  <p className="text-[10px] text-error font-bold uppercase mt-1">{errors.chunk_size.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold text-base-content/70">
                  <label>Chunk Overlap</label>
                  <span className="text-[10px] uppercase font-bold text-secondary px-2 py-0.5 rounded-md bg-secondary/10">0 - 1000 chars</span>
                </div>
                <input
                  type="number"
                  className={cn(
                    "input input-bordered w-full bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.chunk_overlap && "input-error"
                  )}
                  {...register('chunk_overlap', { valueAsNumber: true })}
                />
                <p className="text-[10px] text-base-content/40 font-medium leading-normal">
                  The number of characters that overlap between adjacent chunks. This helps maintain semantic continuity.
                </p>
                {errors.chunk_overlap && (
                  <p className="text-[10px] text-error font-bold uppercase mt-1">{errors.chunk_overlap.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 glass-card rounded-2xl bg-base-100/30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={cn(
                "btn btn-ghost hover:bg-base-200/50 flex items-center gap-2",
                !isDirty && "opacity-0 pointer-events-none"
              )}
              onClick={() => reset()}
            >
              <RefreshCcw className="h-4 w-4" />
              Discard Changes
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-gradient gap-2 rounded-xl shadow-glow hover:shadow-glow-lg transition-all px-8"
            disabled={!isDirty || updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Commit Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
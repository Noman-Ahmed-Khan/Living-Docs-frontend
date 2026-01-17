
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProjectSchema, CreateProjectFormData } from '@/lib/validators/project-schemas'
import { useCreateProject } from '../hooks/use-projects'
import { Loader2, X } from 'lucide-react'
import { useEffect } from 'react'

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateProjectDialog({ open, onClose }: CreateProjectDialogProps) {
  const { mutate: createProject, isPending } = useCreateProject()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      chunk_size: 1000,
      chunk_overlap: 200,
    },
  })

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const onSubmit = (data: CreateProjectFormData) => {
    createProject(data, {
      onSuccess: () => {
        onClose()
        reset()
      },
    })
  }

  if (!open) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-2xl">Create New Project</h3>
          <button 
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
            disabled={isPending}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Project Name *</span>
            </label>
            <input
              type="text"
              placeholder="My Document Project"
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              {...register('name')}
              disabled={isPending}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Describe your project..."
              className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
              {...register('description')}
              disabled={isPending}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.description.message}</span>
              </label>
            )}
          </div>

          <div className="divider">Advanced Settings</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Chunk Size</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.chunk_size ? 'input-error' : ''}`}
                {...register('chunk_size', { valueAsNumber: true })}
                disabled={isPending}
              />
              <label className="label">
                <span className="label-text-alt">Characters per chunk (100-4000)</span>
              </label>
              {errors.chunk_size && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.chunk_size.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Chunk Overlap</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.chunk_overlap ? 'input-error' : ''}`}
                {...register('chunk_overlap', { valueAsNumber: true })}
                disabled={isPending}
              />
              <label className="label">
                <span className="label-text-alt">Overlapping characters (0-1000)</span>
              </label>
              {errors.chunk_overlap && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.chunk_overlap.message}</span>
                </label>
              )}
            </div>
          </div>

          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-sm">
              <p className="font-semibold">What are chunks?</p>
              <p>Documents are split into chunks for better search results. Smaller chunks provide more precise results, while larger chunks give more context.</p>
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
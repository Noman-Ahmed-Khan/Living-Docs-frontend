'use client'

import { useParams } from 'next/navigation'
import { useProject, useUpdateProject } from '@/features/projects/hooks/use-projects'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProjectSchema, UpdateProjectFormData } from '@/lib/validators/project-schemas'
import { Loader2, Save } from 'lucide-react'
import { useEffect } from 'react'

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
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Settings</h1>
        <p className="text-base-content/70 mt-1">
          Manage your project configuration
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">General Information</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Project Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                {...register('name')}
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
                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                {...register('description')}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Chunking Configuration</h2>
            <div className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm">
                Changing these settings will not affect existing documents. You'll need to
                re-process documents for changes to take effect.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Chunk Size</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered ${errors.chunk_size ? 'input-error' : ''}`}
                  {...register('chunk_size', { valueAsNumber: true })}
                />
                <label className="label">
                  <span className="label-text-alt">100 - 4000 characters</span>
                </label>
                {errors.chunk_size && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.chunk_size.message}
                    </span>
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
                />
                <label className="label">
                  <span className="label-text-alt">0 - 1000 characters</span>
                </label>
                {errors.chunk_overlap && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.chunk_overlap.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => reset()}
            disabled={!isDirty || updateMutation.isPending}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary gap-2"
            disabled={!isDirty || updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
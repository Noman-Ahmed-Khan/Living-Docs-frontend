'use client'

import { Dialog } from '@headlessui/react'
import { useCreateProject } from '../hooks/use-projects'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().max(2000).optional(),
  chunk_size: z.number().min(100).max(4000).default(1000),
  chunk_overlap: z.number().min(0).max(1000).default(200),
})

type CreateProjectForm = z.infer<typeof createProjectSchema>

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateProjectDialog({ open, onClose }: CreateProjectDialogProps) {
  const createMutation = useCreateProject()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      chunk_size: 1000,
      chunk_overlap: 200,
    },
  })

  const onSubmit = (data: CreateProjectForm) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset()
        onClose()
      },
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-300/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg glass-card rounded-2xl shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-base-300/30">
          <h2 className="text-xl font-display font-bold">Create New Project</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <input
              type="text"
              {...register('name')}
              className={cn(
                "input input-bordered w-full bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                errors.name && "input-error"
              )}
              placeholder="e.g. Q4 Financial Reports"
            />
            {errors.name && (
              <span className="text-xs text-error">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register('description')}
              className="textarea textarea-bordered w-full h-24 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Optional description..."
            />
            {errors.description && (
              <span className="text-xs text-error">{errors.description.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chunk Size</label>
              <input
                type="number"
                {...register('chunk_size', { valueAsNumber: true })}
                className="input input-bordered w-full bg-base-100/50"
              />
              <p className="text-[10px] text-base-content/50">
                Characters per chunk (100-4000)
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Chunk Overlap</label>
              <input
                type="number"
                {...register('chunk_overlap', { valueAsNumber: true })}
                className="input input-bordered w-full bg-base-100/50"
              />
              <p className="text-[10px] text-base-content/50">
                Overlap characters (0-1000)
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="btn btn-gradient px-6"
            >
              {createMutation.isPending ? (
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
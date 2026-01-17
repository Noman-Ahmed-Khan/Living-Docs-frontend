import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(255, 'Project name is too long'),
  description: z.string().max(2000, 'Description is too long').optional(),
  chunk_size: z
    .number()
    .min(100, 'Chunk size must be at least 100')
    .max(4000, 'Chunk size must be at most 4000')
    .default(1000),
  chunk_overlap: z
    .number()
    .min(0, 'Chunk overlap must be at least 0')
    .max(1000, 'Chunk overlap must be at most 1000')
    .default(200),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  chunk_size: z.number().min(100).max(4000).optional(),
  chunk_overlap: z.number().min(0).max(1000).optional(),
})

export type CreateProjectFormData = z.infer<typeof createProjectSchema>
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>
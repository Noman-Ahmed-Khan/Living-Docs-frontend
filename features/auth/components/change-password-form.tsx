'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useChangePassword } from '../hooks/use-change-password'
import { Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
})

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const { mutate: changePassword, isPending } = useChangePassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    }, {
      onSuccess: () => reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-base-content/70 ml-1">Current Password</label>
          <input
            type="password"
            placeholder="••••••••••••"
            className={cn(
              "w-full bg-base-100/60 border border-base-300 rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none text-base-content",
              errors.currentPassword && "border-error bg-error/10"
            )}
            {...register('currentPassword')}
            disabled={isPending}
          />
          {errors.currentPassword && (
            <p className="text-xs text-error mt-1 ml-1">{errors.currentPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-base-content/70 ml-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className={cn(
              "w-full bg-base-100/60 border border-base-300 rounded-2xl py-3.5 px-5 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none text-base-content",
              errors.newPassword && "border-error bg-error/10"
            )}
            {...register('newPassword')}
            disabled={isPending}
          />
          {errors.newPassword && (
            <p className="text-xs text-error mt-1 ml-1">{errors.newPassword.message}</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-base-content/40 font-medium">
          Password must be at least 8 characters with one symbol.
        </p>
        <button
          type="submit"
          className="btn btn-primary px-8 h-12 rounded-2xl font-bold text-sm min-w-[160px] flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </div>
    </form>
  )
}
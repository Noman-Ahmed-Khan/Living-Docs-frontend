'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useResetPassword } from '../hooks/use-reset-password'
import { Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const { mutate: resetPassword, isPending } = useResetPassword()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    if (token) {
      resetPassword({ token, password: data.password })
    }
  }

  if (!token) {
    return (
      <div className="alert alert-error">
        <span>Invalid or missing reset token.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium">New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
            <Lock className="h-4 w-4" />
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className={cn(
              "input input-bordered w-full pl-10 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
              errors.password && "input-error"
            )}
            {...register('password')}
            disabled={isPending}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-error mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
            <Lock className="h-4 w-4" />
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className={cn(
              "input input-bordered w-full pl-10 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
              errors.confirmPassword && "input-error"
            )}
            {...register('confirmPassword')}
            disabled={isPending}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-error mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-gradient w-full shadow-glow hover:shadow-glow-lg transition-all"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  )
}
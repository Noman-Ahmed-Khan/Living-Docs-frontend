'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForgotPassword } from '../hooks/use-forgot-password'
import { Loader2, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
            <Mail className="h-4 w-4" />
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            className={cn(
              "input input-bordered w-full pl-10 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
              errors.email && "input-error"
            )}
            {...register('email')}
            disabled={isPending}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-error mt-1">{errors.email.message}</p>
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
            Sending link...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>
    </form>
  )
}
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormData } from '@/lib/validators/auth-schemas'
import { useRegister } from '../hooks/use-register'
import { Loader2 } from 'lucide-react'

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister()
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    register({ email: data.email, password: data.password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
          {...registerField('email')}
          disabled={isPending}
        />
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.email.message}</span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
          {...registerField('password')}
          disabled={isPending}
        />
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.password.message}</span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
          {...registerField('confirmPassword')}
          disabled={isPending}
        />
        {errors.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.confirmPassword.message}
            </span>
          </label>
        )}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
}
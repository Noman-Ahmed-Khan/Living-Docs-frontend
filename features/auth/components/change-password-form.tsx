'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, ChangePasswordFormData } from '@/lib/validators/auth-schemas'
import { useChangePassword } from '../hooks/use-change-password'
import { Loader2 } from 'lucide-react'

export function ChangePasswordForm() {
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(
      {
        current_password: data.currentPassword,
        new_password: data.newPassword,
      },
      {
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {isSuccess && (
        <div className="alert alert-success">
          <span>Password changed successfully!</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Current Password</span>
        </label>
        <input
          type="password"
          className={`input input-bordered ${errors.currentPassword ? 'input-error' : ''}`}
          {...register('currentPassword')}
          disabled={isPending}
        />
        {errors.currentPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.currentPassword.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">New Password</span>
        </label>
        <input
          type="password"
          className={`input input-bordered ${errors.newPassword ? 'input-error' : ''}`}
          {...register('newPassword')}
          disabled={isPending}
        />
        {errors.newPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.newPassword.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm New Password</span>
        </label>
        <input
          type="password"
          className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
          {...register('confirmPassword')}
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

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Changing...
          </>
        ) : (
          'Change Password'
        )}
      </button>
    </form>
  )
}
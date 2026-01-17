'use client'

import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Invalid Reset Link</h2>
          <p className="text-base-content/70">
            This password reset link is invalid or has expired.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Set New Password</h2>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
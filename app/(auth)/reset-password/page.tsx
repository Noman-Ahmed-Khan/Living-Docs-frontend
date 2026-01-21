'use client'

import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="space-y-6 animate-fade-in text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-error" />
        </div>
        <h2 className="text-2xl font-display font-bold">Invalid Link</h2>
        <p className="text-sm text-base-content/60 font-medium">
          This password reset link is invalid, malformed, or has expired. Please request a new one.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold">Security Reset</h2>
        <p className="text-sm text-base-content/60 font-medium leading-relaxed">
          Establish a new, strong password for your account to regain access.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  )
}
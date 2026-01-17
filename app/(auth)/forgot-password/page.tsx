'use client'

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href="/login" className="btn btn-ghost btn-sm gap-2 self-start">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
        <h2 className="card-title text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-sm text-base-content/70 mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
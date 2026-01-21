'use client'

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <Link href="/login" className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-focus transition-colors uppercase tracking-widest mb-4">
          <ArrowLeft className="h-3 w-3" />
          Back to access
        </Link>
        <h2 className="text-3xl font-display font-bold">Lost your way?</h2>
        <p className="text-sm text-base-content/60 font-medium leading-relaxed">
          Enter your registered email below. We'll send you a secure link to reclaim your workspace.
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="p-4 rounded-xl bg-base-200/50 border border-base-300/30">
        <p className="text-[10px] text-base-content/40 font-bold uppercase text-center tracking-widest leading-normal">
          For security reasons, we will never disclose if an email is registered or not.
        </p>
      </div>
    </div>
  )
}
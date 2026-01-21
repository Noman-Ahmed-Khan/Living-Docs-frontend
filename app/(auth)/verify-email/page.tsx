'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token: string) => {
    try {
      await authApi.verifyEmail({ token })
      setStatus('success')
      setMessage('Email verified successfully! We are redirecting you to sign in.')

      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.detail || 'Verification failed')
    }
  }

  return (
    <div className="space-y-8 animate-fade-in text-center py-4">
      <div className="flex flex-col items-center">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse scale-150" />
              <div className="w-20 h-20 rounded-3xl bg-base-100 flex items-center justify-center relative border border-white/10 shadow-lg">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold">Verifying Email</h2>
              <p className="text-sm text-base-content/60 font-medium">Please wait while we confirm your identity...</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 blur-xl rounded-full scale-150" />
              <div className="w-20 h-20 rounded-3xl bg-base-100 flex items-center justify-center relative border border-white/10 shadow-lg">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-success">Verification Successful!</h2>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">{message}</p>
            </div>
            <div className="loading loading-dots loading-sm text-success"></div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-error/20 blur-xl rounded-full scale-150" />
              <div className="w-20 h-20 rounded-3xl bg-base-100 flex items-center justify-center relative border border-white/10 shadow-lg">
                <XCircle className="h-10 w-10 text-error" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-error">Verification Failed</h2>
              <p className="text-sm text-base-content/60 font-medium">{message}</p>
            </div>
            <button
              className="btn btn-gradient px-8 shadow-glow hover:shadow-glow-lg transition-all"
              onClick={() => router.push('/login')}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
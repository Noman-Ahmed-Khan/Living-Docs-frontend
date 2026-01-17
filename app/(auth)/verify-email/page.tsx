'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { toast } from 'sonner'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

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
      setMessage('Email verified successfully! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.detail || 'Verification failed')
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="card-title mt-4">Verifying your email...</h2>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-success" />
            <h2 className="card-title mt-4 text-success">Verification Successful!</h2>
            <p className="text-base-content/70">{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-error" />
            <h2 className="card-title mt-4 text-error">Verification Failed</h2>
            <p className="text-base-content/70">{message}</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
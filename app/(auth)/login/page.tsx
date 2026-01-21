'use client'

import { LoginForm } from '@/features/auth/components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold">Welcome back</h2>
        <p className="text-sm text-base-content/60 font-medium">Please enter your credentials to access your workspace</p>
      </div>

      <LoginForm />

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-base-300/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-base-content/40 font-bold tracking-widest backdrop-blur-sm">Helpful Links</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm text-center text-base-content/60 font-medium">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-bold transition-all">
            Create one for free
          </Link>
        </p>
        <div className="text-center">
          <Link href="/forgot-password" className="text-xs text-base-content/40 hover:text-secondary transition-colors font-semibold">
            Securely reset your password
          </Link>
        </div>
      </div>
    </div>
  )
}
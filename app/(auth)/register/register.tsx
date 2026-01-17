'use client'

import { LoginForm } from '@/features/auth/components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Sign In</h2>
        <LoginForm />
        <div className="divider">OR</div>
        <div className="text-center space-y-2">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link href="/forgot-password" className="link link-secondary">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}s
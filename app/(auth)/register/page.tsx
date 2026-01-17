'use client'

import { RegisterForm } from '@/features/auth/components/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Create Account</h2>
        <RegisterForm />
        <div className="divider">OR</div>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
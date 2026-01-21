'use client'

import { RegisterForm } from '@/features/auth/components/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold">Join Living Docs</h2>
        <p className="text-sm text-base-content/60 font-medium">Start building your document intelligence knowledge base</p>
      </div>

      <RegisterForm />

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-base-300/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-base-content/40 font-bold tracking-widest backdrop-blur-sm">Already a member?</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-base-content/60 font-medium">
          Discover the power of RAG.{' '}
          <Link href="/login" className="text-primary hover:underline font-bold transition-all">
            Sign back in
          </Link>
        </p>
      </div>
    </div>
  )
}
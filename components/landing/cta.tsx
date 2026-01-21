'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-16 text-center border-none shadow-2xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to chat with your docs?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of users who are saving hours of research time with AI-powered document intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="btn glass btn-lg text-white hover:bg-white/20 border-white/40 gap-2 min-w-[200px]"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/60">
              No credit card required · Free 14-day trial
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
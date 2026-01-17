import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-semibold text-white">
            Start Free Today
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Documents?
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already getting instant answers from their documents with AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 gap-2 group"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary gap-2"
          >
            Sign In
          </Link>
        </div>

        <p className="text-sm text-white/70 mt-6">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  )
}
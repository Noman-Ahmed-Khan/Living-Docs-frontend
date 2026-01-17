'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, FileText } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            AI-Powered Document Intelligence
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Transform Your Documents
          <br />
          Into Intelligent Answers
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-base-content/70 mb-8 max-w-3xl mx-auto">
          Upload, analyze, and chat with your documents using advanced AI. 
          Get instant answers with precise citations from your knowledge base.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/register" className="btn btn-primary btn-lg gap-2 group">
            Get Started Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#how-it-works" className="btn btn-outline btn-lg gap-2">
            See How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          <div>
            <div className="text-4xl font-bold text-primary">10+</div>
            <div className="text-sm text-base-content/60">File Formats</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary">99%</div>
            <div className="text-sm text-base-content/60">Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent">⚡</div>
            <div className="text-sm text-base-content/60">Instant Results</div>
          </div>
        </div>

        {/* Demo mockup */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent h-32 bottom-0 z-10"></div>
          <div className="mockup-window bg-base-300 shadow-2xl border border-base-content/10">
            <div className="bg-base-200 px-4 py-16">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Mock chat message */}
                <div className="chat chat-start">
                  <div className="chat-bubble">What are the key findings in the Q4 report?</div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-primary">
                    The Q4 report shows a 25% increase in revenue... <span className="text-primary-content/60">[source: report.pdf, p.3]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Wand2, Bot, FileText } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered Document Intelligence
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight animate-fade-in">
          Transform Your Documents
          <br />
          Into <span className="gradient-text">Intelligent Answers</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-base-content/70 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in delay-100">
          Upload, analyze, and chat with your documents using advanced AI.
          Get instant answers with precise citations from your knowledge base.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-200">
          <Link href="/register" className="btn btn-gradient btn-lg rounded-full px-8 gap-2 group">
            Get Started Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#how-it-works" className="btn glass btn-lg rounded-full px-8 gap-2 hover:bg-base-100/50">
            See How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-20 animate-scale-in delay-300">
          {[
            { value: '10+', label: 'File Formats', icon: FileText },
            { value: '99%', label: 'Accuracy', icon: Wand2 },
            { value: 'Instant', label: 'Processing', icon: Sparkles },
            { value: '24/7', label: 'AI Assistant', icon: Bot },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-6 w-6 text-primary/60" />
              </div>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-base-content/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Demo Mockup */}
        <div className="relative mx-auto max-w-5xl animate-float delay-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-30 blur-lg"></div>
          <div className="relative glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="bg-base-100/50 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="mx-auto bg-base-200/50 px-3 py-1 rounded-md text-xs font-mono text-base-content/50">
                living-docs.ai/chat
              </div>
            </div>
            <div className="bg-base-100/80 p-6 md:p-12 aspect-[16/9] flex flex-col justify-end">
              <div className="max-w-2xl mx-auto w-full space-y-6">
                <div className="chat chat-start">
                  <div className="message-bubble assistant shadow-sm">
                    Hello! I've analyzed your documents. What would you like to know?
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="message-bubble user shadow-lg bg-primary text-white">
                    What are the key findings in the Q4 report?
                  </div>
                </div>
                <div className="chat chat-start">
                  <div className="message-bubble assistant shadow-sm">
                    <p className="mb-2">The Q4 report highlights a <span className="font-bold text-success">25% increase</span> in revenue compared to the previous quarter.</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded cursor-pointer hover:bg-primary/20 transition-colors">
                        source: report.pdf, p.3
                      </span>
                    </div>
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
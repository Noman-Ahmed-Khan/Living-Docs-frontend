'use client'

import {
  FileText,
  MessageSquare,
  Search,
  Shield,
  Zap,
  BarChart
} from 'lucide-react'

const features = [
  {
    name: 'Smart Document Analysis',
    description: 'Automatically extract and understand key information from PDFs, Word docs, and more.',
    icon: FileText,
  },
  {
    name: 'Contextual Chat',
    description: 'Ask questions and get answers based strictly on your document content.',
    icon: MessageSquare,
  },
  {
    name: 'Semantic Search',
    description: 'Find exactly what you stand for, not just keyword matches, using vector similarity.',
    icon: Search,
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade encryption for your documents and data at rest and in transit.',
    icon: Shield,
  },
  {
    name: 'Real-time Processing',
    description: 'Upload documents and start chatting instantly with our optimized pipeline.',
    icon: Zap,
  },
  {
    name: 'Insightful Analytics',
    description: 'Track usage, query patterns, and document engagement metrics.',
    icon: BarChart,
  },
]

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden bg-base-100">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Everything you need to <span className="gradient-text">master your docs</span>
          </h2>
          <p className="text-xl text-base-content/70 font-light">
            Powerful features designed to help you extract value from your knowledge base instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className="glass-card p-8 rounded-2xl hover:bg-base-100/80 transition-all duration-300 group hover:shadow-glow"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{feature.name}</h3>
              <p className="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
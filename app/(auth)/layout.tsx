import { FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-base-100">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse-slow delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-primary mb-4 transform transition-transform group-hover:scale-110 duration-500">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold gradient-text mb-2">Living Docs</h1>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px w-8 bg-base-content/10" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-base-content/40 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary/60" />
              Knowledge Intelligent
            </p>
            <div className="h-px w-8 bg-base-content/10" />
          </div>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
          {children}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-base-content/40 font-medium">
            © 2024 Living Docs Platform. Built with Advanced RAG.
          </p>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useProjectWithStats } from '@/features/projects/hooks/use-projects'
import { StatsOverview } from '@/features/projects/components/stats-overview'
import { Loader2, Settings, MessageSquare, FileText, LayoutDashboard, ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function ProjectDashboardPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { data: project, isLoading } = useProjectWithStats(projectId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="glass-card p-12 text-center max-w-lg mx-auto mt-20">
        <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
          <Activity className="h-8 w-8 text-error" />
        </div>
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <p className="text-base-content/60 mt-2">The project you are looking for does not exist or you don't have access to it.</p>
        <Link href="/projects" className="btn btn-primary mt-6">Back to Projects</Link>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Analyze Documents',
      desc: 'Upload and process your knowledge base',
      href: `/projects/${projectId}/documents`,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Smart Chat',
      desc: 'Ask questions and get AI answers',
      href: `/projects/${projectId}/chat`,
      icon: MessageSquare,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'Security & Access',
      desc: 'Manage permissions and visibility',
      href: `/projects/${projectId}/settings`,
      icon: ShieldCheck,
      color: 'text-accent',
      bg: 'bg-accent/10',
    }
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
            <LayoutDashboard className="h-3 w-3" />
            Project Dashboard
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text">{project.name}</h1>
          {project.description && (
            <p className="text-base-content/60 max-w-2xl text-lg font-light leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/projects/${projectId}/chat`}
            className="btn btn-gradient gap-2 rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
          >
            <Zap className="h-4 w-4" />
            Launch Assistant
          </Link>
          <Link
            href={`/projects/${projectId}/settings`}
            className="btn glass btn-square rounded-xl hover:bg-base-200/50"
          >
            <Settings className="h-5 w-5 text-base-content/60" />
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <StatsOverview stats={project.stats} />

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions Card */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/40 px-1">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <Link
                key={action.title}
                href={action.href}
                className="glass-card p-6 rounded-2xl group border-none hover:bg-base-100/30 transition-all duration-300 shadow-sm hover:shadow-md animate-scale-in"
                style={{ animationDelay: `${(i + 5) * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors", action.bg, action.color)}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-base-content/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-lg font-bold font-display mb-1">{action.title}</h4>
                <p className="text-sm text-base-content/50">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/40 px-1">Configuration</h3>
          <div className="glass-card p-6 rounded-2xl space-y-6 shadow-sm animate-scale-in" style={{ animationDelay: '800ms' }}>
            <div className="space-y-4">
              {[
                { label: 'Chunk Size', value: project.chunk_size, unit: 'chars', icon: Activity },
                { label: 'Chunk Overlap', value: project.chunk_overlap, unit: 'chars', icon: Zap },
              ].map((cfg) => (
                <div key={cfg.label} className="flex items-center justify-between p-3 rounded-xl bg-base-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-base-100/50 flex items-center justify-center border border-white/5">
                      <cfg.icon className="h-4 w-4 text-primary/70" />
                    </div>
                    <span className="text-sm font-medium text-base-content/70">{cfg.label}</span>
                  </div>
                  <div className="text-sm font-bold">
                    {cfg.value} <span className="text-[10px] text-base-content/40 font-bold uppercase">{cfg.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-base-300/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-base-content/40">Knowledge Status</span>
                <div className={cn(
                  "badge gap-1.5 px-3 py-1 font-bold rounded-full text-[10px] uppercase border-none",
                  project.status === 'active' ? 'bg-success/10 text-success' : 'bg-neutral/10 text-base-content/50'
                )}>
                  <div className={cn("h-1.5 w-1.5 rounded-full", project.status === 'active' ? 'bg-success animate-pulse' : 'bg-base-content/30')} />
                  {project.status}
                </div>
              </div>
            </div>

            <Link
              href={`/projects/${projectId}/settings`}
              className="btn btn-ghost btn-sm w-full text-[11px] font-bold uppercase tracking-widest hover:bg-base-200/50"
            >
              Configure Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
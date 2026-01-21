'use client'

import { ProjectStats } from '@/lib/api/projects'
import { formatBytes, cn } from '@/lib/utils'
import { FileText, CheckCircle, XCircle, Clock, Box, HardDrive } from 'lucide-react'

interface StatsOverviewProps {
  stats: ProjectStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      label: 'Total Documents',
      value: stats.document_count,
      icon: FileText,
      color: 'primary',
      gradient: 'gradient-primary',
    },
    {
      label: 'Completed',
      value: stats.completed_documents,
      icon: CheckCircle,
      color: 'success',
      gradient: 'bg-success',
    },
    {
      label: 'Pending',
      value: stats.pending_documents,
      icon: Clock,
      color: 'warning',
      gradient: 'bg-warning',
    },
    {
      label: 'Failed',
      value: stats.failed_documents,
      icon: XCircle,
      color: 'error',
      gradient: 'bg-error',
    },
    {
      label: 'Total Chunks',
      value: stats.total_chunks,
      icon: Box,
      color: 'info',
      gradient: 'bg-info',
      desc: formatBytes(stats.total_size_bytes),
      descIcon: HardDrive
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <div
          key={item.label}
          className="glass-card p-5 rounded-2xl group hover:shadow-glow transition-all duration-300 animate-scale-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
              item.gradient
            )}>
              <item.icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display group-hover:text-primary transition-colors">
              {item.value}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/50 mt-1">
              {item.label}
            </div>
            {item.desc && (
              <div className="flex items-center gap-1 text-[10px] text-base-content/40 mt-2 font-medium">
                {item.descIcon && <item.descIcon className="h-3 w-3" />}
                {item.desc}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
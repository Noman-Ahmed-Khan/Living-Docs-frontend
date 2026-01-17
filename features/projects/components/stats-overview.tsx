'use client'

import { ProjectStats } from '@/lib/api/projects'
import { formatBytes } from '@/lib/utils'
import { FileText, CheckCircle, XCircle, Clock, Box } from 'lucide-react'

interface StatsOverviewProps {
  stats: ProjectStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-figure text-primary">
          <FileText className="h-8 w-8" />
        </div>
        <div className="stat-title">Total Documents</div>
        <div className="stat-value text-primary">{stats.document_count}</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-figure text-success">
          <CheckCircle className="h-8 w-8" />
        </div>
        <div className="stat-title">Completed</div>
        <div className="stat-value text-success">{stats.completed_documents}</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-figure text-warning">
          <Clock className="h-8 w-8" />
        </div>
        <div className="stat-title">Pending</div>
        <div className="stat-value text-warning">{stats.pending_documents}</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-figure text-error">
          <XCircle className="h-8 w-8" />
        </div>
        <div className="stat-title">Failed</div>
        <div className="stat-value text-error">{stats.failed_documents}</div>
      </div>

      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-figure text-info">
          <Box className="h-8 w-8" />
        </div>
        <div className="stat-title">Total Chunks</div>
        <div className="stat-value text-info">{stats.total_chunks}</div>
        <div className="stat-desc">{formatBytes(stats.total_size_bytes)}</div>
      </div>
    </div>
  )
}
'use client'

import { useDocuments } from '../hooks/use-documents'
import { DocumentTable } from './document-table'
import { Loader2, FileQuestion, Filter, Search, CheckCircle2, Clock, AlertCircle, LayoutGrid } from 'lucide-react'
import { DocumentStatus } from '@/lib/api/documents'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DocumentListProps {
  projectId: string
}

export function DocumentList({ projectId }: DocumentListProps) {
  const [status, setStatus] = useState<DocumentStatus | undefined>()
  const { data, isLoading } = useDocuments(projectId, { status })

  const filterItems = [
    { label: 'All', value: undefined, icon: LayoutGrid },
    { label: 'Completed', value: DocumentStatus.COMPLETED, icon: CheckCircle2, color: 'text-success' },
    { label: 'Processing', value: DocumentStatus.PROCESSING, icon: Clock, color: 'text-warning' },
    { label: 'Failed', value: DocumentStatus.FAILED, icon: AlertCircle, color: 'text-error' },
  ]

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="text-xs font-bold uppercase tracking-widest text-base-content/40">Fetching Knowledge Base...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-base-100/30 p-2 rounded-2xl border border-white/5">
        <div className="flex p-1 bg-base-200/50 rounded-xl gap-1 overflow-x-auto w-full sm:w-auto overflow-hidden">
          {filterItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap",
                status === item.value
                  ? "bg-base-100 shadow-sm text-primary scale-105"
                  : "text-base-content/60 hover:text-base-content hover:bg-base-100/50"
              )}
              onClick={() => setStatus(item.value)}
            >
              <item.icon className={cn("h-3.5 w-3.5", status === item.value ? "text-primary" : item.color)} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-bold text-base-content/40 uppercase tracking-widest pr-4">
          <Filter className="h-3 w-3" />
          Showing {data?.items.length || 0} of {data?.total || 0} Documents
        </div>
      </div>

      {data?.items.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-24 text-center border-dashed border-2">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6 opacity-50">
            <FileQuestion className="h-10 w-10 text-base-content/50" />
          </div>
          <h3 className="text-xl font-display font-bold">No results found</h3>
          <p className="text-sm text-base-content/60 mt-2 max-w-xs mx-auto">
            No documents match the selected filter. Try changing your search or upload new files.
          </p>
          {status && (
            <button
              className="btn btn-ghost btn-sm mt-6 text-primary"
              onClick={() => setStatus(undefined)}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <DocumentTable documents={data?.items || []} projectId={projectId} />
      )}
    </div>
  )
}
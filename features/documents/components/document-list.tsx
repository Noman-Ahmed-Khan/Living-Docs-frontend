'use client'

import { useDocuments } from '../hooks/use-documents'
import { DocumentTable } from './document-table'
import { Loader2, FileQuestion } from 'lucide-react'
import { DocumentStatus } from '@/lib/api/documents'
import { useState } from 'react'

interface DocumentListProps {
  projectId: string
}

export function DocumentList({ projectId }: DocumentListProps) {
  const [status, setStatus] = useState<DocumentStatus | undefined>()
  const { data, isLoading } = useDocuments(projectId, { status })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data?.items.length) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-12">
          <FileQuestion className="h-16 w-16 text-base-content/30" />
          <h3 className="text-xl font-semibold mt-4">No documents yet</h3>
          <p className="text-base-content/70">
            Upload your first document to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`btn btn-sm ${!status ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(undefined)}
        >
          All ({data.total})
        </button>
        <button
          className={`btn btn-sm ${status === DocumentStatus.COMPLETED ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(DocumentStatus.COMPLETED)}
        >
          Completed
        </button>
        <button
          className={`btn btn-sm ${status === DocumentStatus.PROCESSING ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(DocumentStatus.PROCESSING)}
        >
          Processing
        </button>
        <button
          className={`btn btn-sm ${status === DocumentStatus.FAILED ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setStatus(DocumentStatus.FAILED)}
        >
          Failed
        </button>
      </div>

      <DocumentTable documents={data.items} projectId={projectId} />
    </div>
  )
}
'use client'

import { DocumentList } from '@/features/documents/components/document-list'
import { FileUploader } from '@/features/documents/components/file-uploader'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Upload, FileText, Info } from 'lucide-react'

export default function ProjectDocumentsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [showUploader, setShowUploader] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
            <FileText className="h-3 w-3" />
            Knowledge Base
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text">Documents</h1>
          <p className="text-base-content/60 font-light max-w-xl">
            Upload, manage and monitor the status of your knowledge base documents.
          </p>
        </div>

        <button
          className="btn btn-gradient gap-2 rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
          onClick={() => setShowUploader(true)}
        >
          <Upload className="h-4 w-4" />
          Add Documents
        </button>
      </div>

      {/* Helpful Banner */}
      <div className="flex items-center gap-4 p-5 rounded-2xl glass-card bg-primary/5 border-primary/10 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <Info className="h-5 w-5 text-white" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold">Automatic Synchronization</h4>
          <p className="text-xs text-base-content/60 leading-relaxed font-medium">
            Every document you upload is automatically analyzed, chunked, and indexed. You can see the real-time processing status below. Once "Completed", documents are ready for querying.
          </p>
        </div>
      </div>

      {/* Main List */}
      <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <DocumentList projectId={projectId} />
      </div>

      {/* Modals */}
      {showUploader && (
        <FileUploader
          projectId={projectId}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  )
}
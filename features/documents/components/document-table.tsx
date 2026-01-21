'use client'

import { Document, DocumentStatus } from '@/lib/api/documents'
import { formatBytes, formatDateTime, cn } from '@/lib/utils'
import { StatusBadge } from './status-badge'
import { MoreVertical, Download, Trash2, RefreshCw, FileText, File, FileType } from 'lucide-react'
import { useDeleteDocument, useReingestDocument } from '../hooks/use-documents'
import { useState } from 'react'

interface DocumentTableProps {
  documents: Document[]
  projectId: string
  onDocumentSelect?: (docId: string) => void
}

export function DocumentTable({ documents, projectId, onDocumentSelect }: DocumentTableProps) {
  const deleteMutation = useDeleteDocument()
  const reingestMutation = useReingestDocument()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleDelete = (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteMutation.mutate({ documentId, projectId })
    }
    setActiveMenu(null)
  }

  const handleReingest = (documentId: string) => {
    reingestMutation.mutate({ documentId, projectId })
    setActiveMenu(null)
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return <FileType className="h-5 w-5 text-error/70" />
      case 'docx':
      case 'doc': return <FileType className="h-5 w-5 text-primary/70" />
      case 'xlsx':
      case 'xls': return <FileType className="h-5 w-5 text-success/70" />
      case 'pptx':
      case 'ppt': return <FileType className="h-5 w-5 text-warning/70" />
      default: return <FileText className="h-5 w-5 text-base-content/40" />
    }
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-base-300/30">
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-base-200/30 text-base-content/50 text-[11px] uppercase tracking-wider font-bold border-b border-base-300/30">
              <th className="px-6 py-4 text-left">Document</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Size</th>
              <th className="px-6 py-4 text-left">Stats</th>
              <th className="px-6 py-4 text-left">Uploaded</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/20">
            {documents.map((doc, index) => (
              <tr
                key={doc.id}
                className="group hover:bg-base-200/30 transition-colors animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => onDocumentSelect?.(doc.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-base-200/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {getFileIcon(doc.original_filename)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate max-w-[200px] group-hover:text-primary transition-colors">
                        {doc.original_filename}
                      </div>
                      {doc.file_type && (
                        <div className="text-[10px] font-mono text-base-content/40 uppercase tracking-tighter mt-0.5">
                          {doc.file_type.split('/').pop()}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc.status} message={doc.status_message} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-base-content/70">
                    {doc.file_size ? formatBytes(doc.file_size) : '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-base-content/40 uppercase">Chunks: {doc.chunk_count || 0}</span>
                    <span className="text-[10px] font-bold text-base-content/40 uppercase">Pages: {doc.page_count || '-'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[11px] text-base-content/60 font-medium">
                    {formatDateTime(doc.created_at)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-xs btn-circle hover:bg-base-200"
                      onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </label>
                    {activeMenu === doc.id && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[2] menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-200 mt-2"
                      >
                        <li className="menu-title px-4 py-2 text-[10px] uppercase tracking-widest text-base-content/40">Actions</li>
                        <li>
                          <button
                            onClick={() => handleReingest(doc.id)}
                            className="text-sm py-2"
                            disabled={doc.status === DocumentStatus.PROCESSING}
                          >
                            <RefreshCw className={cn("h-4 w-4", doc.status === DocumentStatus.PROCESSING && "animate-spin")} />
                            Re-process
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="text-error text-sm py-2 hover:bg-error/10"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Document
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mb-4">
            <File className="h-8 w-8 text-base-content/20" />
          </div>
          <h3 className="text-lg font-bold">No documents uploaded</h3>
          <p className="text-sm text-base-content/50 max-w-xs mx-auto mt-2">
            Start by uploading some documents to this project to build your knowledge base.
          </p>
        </div>
      )}
    </div>
  )
}
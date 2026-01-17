'use client'

import { Document } from '@/lib/api/documents'
import { formatBytes, formatDateTime } from '@/lib/utils'
import { StatusBadge } from './status-badge'
import { MoreVertical, Download, Trash2, RefreshCw } from 'lucide-react'
import { useDeleteDocument, useReingestDocument } from '../hooks/use-documents'
import { useState } from 'react'

interface DocumentTableProps {
  documents: Document[]
  projectId: string
}

export function DocumentTable({ documents, projectId }: DocumentTableProps) {
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

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Size</th>
            <th>Chunks</th>
            <th>Pages</th>
            <th>Uploaded</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{doc.original_filename}</div>
                    {doc.file_type && (
                      <div className="text-sm opacity-50">{doc.file_type}</div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <StatusBadge status={doc.status} message={doc.status_message} />
              </td>
              <td>{doc.file_size ? formatBytes(doc.file_size) : '-'}</td>
              <td>{doc.chunk_count || 0}</td>
              <td>{doc.page_count || '-'}</td>
              <td>{formatDateTime(doc.created_at)}</td>
              <td>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </label>
                  {activeMenu === doc.id && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={() => handleReingest(doc.id)}>
                          <RefreshCw className="h-4 w-4" />
                          Re-process
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-error"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
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
  )
}
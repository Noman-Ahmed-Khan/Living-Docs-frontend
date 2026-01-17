'use client'

import { DocumentList } from '@/features/documents/components/document-list'
import { FileUploader } from '@/features/documents/components/file-uploader'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function ProjectDocumentsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [showUploader, setShowUploader] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-base-content/70 mt-1">
            Manage and upload documents for this project
          </p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowUploader(true)}
        >
          <Upload className="h-5 w-5" />
          Upload Documents
        </button>
      </div>

      <DocumentList projectId={projectId} />

      {showUploader && (
        <FileUploader
          projectId={projectId}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  )
}
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUploadDocument, useBulkUpload } from '../hooks/use-documents'
import { X, Upload, File, Loader2 } from 'lucide-react'
import { formatBytes } from '@/lib/utils'

interface FileUploaderProps {
  projectId: string
  onClose: () => void
}

export function FileUploader({ projectId, onClose }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const uploadMutation = useUploadDocument()
  const bulkUploadMutation = useBulkUpload()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/markdown': ['.md'],
      'text/plain': ['.txt'],
      'text/html': ['.html', '.htm'],
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (files.length === 1) {
      uploadMutation.mutate(
        { projectId, file: files[0] },
        {
          onSuccess: () => {
            onClose()
          },
        }
      )
    } else if (files.length > 1) {
      bulkUploadMutation.mutate(
        { projectId, files },
        {
          onSuccess: () => {
            onClose()
          },
        }
      )
    }
  }

  const isPending = uploadMutation.isPending || bulkUploadMutation.isPending

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-2xl">Upload Documents</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
            disabled={isPending}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-base-300 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-base-content/50" />
          {isDragActive ? (
            <p className="text-lg">Drop files here...</p>
          ) : (
            <>
              <p className="text-lg mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-base-content/60">
                Supports: PDF, DOCX, PPTX, XLSX, MD, TXT, HTML
              </p>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Selected Files ({files.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-base-200 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-base-content/60">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => removeFile(index)}
                    disabled={isPending}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={files.length === 0 || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload {files.length} {files.length === 1 ? 'File' : 'Files'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
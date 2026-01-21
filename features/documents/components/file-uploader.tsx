'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUploadDocument, useBulkUpload } from '../hooks/use-documents'
import { X, Upload, File, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { formatBytes, cn } from '@/lib/utils'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-300/60 backdrop-blur-sm animate-fade-in"
        onClick={!isPending ? onClose : undefined}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl animate-scale-in flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-base-300/30">
          <div>
            <h2 className="text-2xl font-display font-bold gradient-text">Upload Documents</h2>
            <p className="text-xs text-base-content/60 mt-1">Add knowledge to your project</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200/50"
            disabled={isPending}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group",
              isDragActive
                ? "border-primary bg-primary/5 shadow-glow-primary"
                : "border-base-300 hover:border-primary/50 hover:bg-base-100/30"
            )}
          >
            <input {...getInputProps()} />
            <div className="relative z-10">
              <div className={cn(
                "w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                isDragActive && "animate-float"
              )}>
                <Upload className="h-8 w-8 text-white" />
              </div>

              {isDragActive ? (
                <p className="text-lg font-semibold text-primary">Drop files here to start processing</p>
              ) : (
                <>
                  <p className="text-lg font-semibold mb-2">
                    Drag & drop documents here, or <span className="text-primary italic">browse</span>
                  </p>
                  <p className="text-sm text-base-content/60 max-w-xs mx-auto">
                    Supported: PDF, DOCX, PPTX, XLSX, Markdown, TXT, HTML (Max 50MB per file)
                  </p>
                </>
              )}
            </div>
            {/* Background Sparkle Effect */}
            <Sparkles className="absolute top-4 right-4 h-5 w-5 text-primary/20" />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/50">Selected Files</h4>
                <div className="badge badge-primary badge-sm bg-primary/10 text-primary border-none font-bold">
                  {files.length} {files.length === 1 ? 'file' : 'files'}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between glass-card p-3 rounded-xl border border-white/5 transition-all hover:border-primary/30 group animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-base-200/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <File className="h-5 w-5 text-primary/60 group-hover:text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate max-w-[120px]">{file.name}</p>
                        <p className="text-[10px] text-base-content/50 font-medium">
                          {formatBytes(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-xs btn-circle hover:bg-error/10 hover:text-error transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      disabled={isPending}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-info/5 border border-info/10 text-xs text-info/80">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>Uploaded documents will be automatically processed and indexed for retrieval. This might take a few moments depending on the file size.</p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-base-300/30 flex justify-end gap-3 bg-base-100/30">
          <button
            className="btn btn-ghost px-6"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className="btn btn-gradient px-8 shadow-glow hover:shadow-glow-lg transition-all"
            onClick={handleUpload}
            disabled={files.length === 0 || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Analyze {files.length} {files.length === 1 ? 'File' : 'Files'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
// components/ui/pdf-viewer.tsx
'use client'

import { useState } from 'react'
import { Loader2, ExternalLink } from 'lucide-react'

interface PdfViewerProps {
  url: string
  className?: string
}

export function PdfViewer({ url, className }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Use browser's native PDF viewer
  return (
    <div className={className}>
      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading PDF...</span>
        </div>
      )}
      
      {error && (
        <div className="alert alert-warning">
          <span>Could not load PDF viewer. </span>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open PDF in New Tab
          </a>
        </div>
      )}

      <iframe
        src={url}
        className={`w-full border-0 ${isLoading ? 'hidden' : ''}`}
        style={{ height: '600px' }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        title="PDF Viewer"
      />
    </div>
  )
}
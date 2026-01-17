// components/ui/pdf-viewer.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface PdfViewerProps {
  url: string
  className?: string
}

export function PdfViewer({ url, className }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Use PDF.js from CDN
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs'

        const loadingTask = pdfjsLib.getDocument(url)
        const pdf = await loadingTask.promise

        if (!containerRef.current) return

        // Clear container
        containerRef.current.innerHTML = ''

        // Render first page (you can extend this to render all pages)
        const page = await pdf.getPage(1)
        const scale = 1.5
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        canvas.height = viewport.height
        canvas.width = viewport.width

        containerRef.current.appendChild(canvas)

        await page.render({ canvasContext: context, viewport }).promise
        setIsLoading(false)
      } catch (err: any) {
        console.error('Error loading PDF:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadPdf()
  }, [url])

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Failed to load PDF: {error}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="overflow-auto" />
    </div>
  )
}
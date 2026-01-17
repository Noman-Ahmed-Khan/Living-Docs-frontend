'use client'

import { Citation } from '@/lib/api/query'
import { X, ExternalLink, FileText } from 'lucide-react'

interface CitationPanelProps {
  citation: Citation
  onClose: () => void
}

export function CitationPanel({ citation, onClose }: CitationPanelProps) {
  return (
    <div className="w-96 bg-base-100 rounded-lg shadow-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Source Citation</h3>
        <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {/* File Info */}
        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
          <FileText className="h-5 w-5 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{citation.source_file}</p>
            {citation.page && (
              <p className="text-sm text-base-content/70">Page {citation.page}</p>
            )}
          </div>
        </div>

        {/* Location Info */}
        {(citation.char_start !== undefined || citation.char_end !== undefined) && (
          <div className="text-sm">
            <p className="font-semibold mb-1">Location:</p>
            <p className="text-base-content/70">
              Characters {citation.char_start} - {citation.char_end}
            </p>
          </div>
        )}

        {/* Relevance Score */}
        {citation.relevance_score !== undefined && (
          <div className="text-sm">
            <p className="font-semibold mb-1">Relevance Score:</p>
            <div className="flex items-center gap-2">
              <progress
                className="progress progress-primary w-full"
                value={citation.relevance_score * 100}
                max="100"
              ></progress>
              <span className="text-base-content/70">
                {(citation.relevance_score * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* Text Snippet */}
        {citation.text_snippet && (
          <div>
            <p className="font-semibold mb-2">Excerpt:</p>
            <div className="bg-base-200 p-3 rounded-lg max-h-64 overflow-y-auto">
              <p className="text-sm whitespace-pre-wrap">{citation.text_snippet}</p>
            </div>
          </div>
        )}

        {/* Chunk ID */}
        <div className="text-xs text-base-content/50">
          <p>Chunk ID: {citation.chunk_id}</p>
        </div>
      </div>
    </div>
  )
}
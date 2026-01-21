'use client'

import { Citation } from '@/lib/api/query'
import { X, FileText, MapPin, BarChart3, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CitationPanelProps {
  citation: Citation
  onClose: () => void
}

export function CitationPanel({ citation, onClose }: CitationPanelProps) {
  return (
    <div className="w-96 glass-card rounded-2xl shadow-xl border border-white/10 flex flex-col max-h-[80vh] animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-300/30">
        <h3 className="font-bold text-lg font-display flex items-center gap-2">
          <Quote className="h-4 w-4 text-primary" />
          Source Citation
        </h3>
        <button
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-200/50"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto space-y-5">
        {/* File Info */}
        <div className="glass p-3 rounded-xl border border-white/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-sm">{citation.source_file}</p>
              {citation.page && (
                <p className="text-xs text-base-content/60 mt-0.5">Page {citation.page}</p>
              )}
            </div>
          </div>
        </div>

        {/* Relevance Score */}
        {citation.relevance_score !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-base-content/70">
              <div className="flex items-center gap-1.5 font-medium">
                <BarChart3 className="h-3.5 w-3.5" />
                Relevance
              </div>
              <span className="font-mono">{(citation.relevance_score * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-base-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${citation.relevance_score * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Text Snippet */}
        {citation.text_snippet && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-base-content/70">
              <Quote className="h-3.5 w-3.5" />
              Excerpt
            </div>
            <div className="bg-base-100/40 p-3 rounded-xl border border-base-content/5 text-sm leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
              <p className="whitespace-pre-wrap">{citation.text_snippet}</p>
            </div>
          </div>
        )}

        {/* Location Info */}
        {(citation.char_start !== undefined || citation.char_end !== undefined) && (
          <div className="glass p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-base-content/60">
              <MapPin className="h-3.5 w-3.5" />
              <span>Char Range</span>
            </div>
            <div className="font-mono bg-base-100/50 px-2 py-1 rounded">
              {citation.char_start} - {citation.char_end}
            </div>
          </div>
        )}

        {/* Chunk ID */}
        <div className="text-[10px] text-base-content/30 text-center font-mono truncate px-2">
          ID: {citation.chunk_id}
        </div>
      </div>
    </div>
  )
}
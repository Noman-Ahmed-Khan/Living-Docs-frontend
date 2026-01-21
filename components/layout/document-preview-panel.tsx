'use client'

import { X, FileText, Calendar, HardDrive, Layers, Trash2, RefreshCw } from 'lucide-react'
import { useDocument, useDeleteDocument, useReingestDocument } from '@/features/documents/hooks/use-documents'
import { cn, formatDate, formatBytes } from '@/lib/utils'
import { DocumentStatus } from '@/lib/api/documents'
import { useEffect, useRef } from 'react'

interface DocumentPreviewPanelProps {
    documentId: string | null
    projectId: string
    isOpen: boolean
    onClose: () => void
}

export function DocumentPreviewPanel({
    documentId,
    projectId,
    isOpen,
    onClose
}: DocumentPreviewPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

    const { data: doc, isLoading } = useDocument(
        documentId || '',
        projectId
    )

    const deleteMutation = useDeleteDocument()
    const reingestMutation = useReingestDocument()

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    // Handle escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
            return () => window.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    const handleDelete = () => {
        if (documentId && confirm('Are you sure you want to delete this document?')) {
            deleteMutation.mutate({ documentId, projectId })
            onClose()
        }
    }

    const handleReingest = () => {
        if (documentId) {
            reingestMutation.mutate({ documentId, projectId })
        }
    }

    const getStatusBadge = (status: DocumentStatus) => {
        const statusConfig = {
            [DocumentStatus.COMPLETED]: {
                className: 'bg-success/10 text-success',
                label: 'Completed'
            },
            [DocumentStatus.PROCESSING]: {
                className: 'bg-info/10 text-info',
                label: 'Processing'
            },
            [DocumentStatus.PENDING]: {
                className: 'bg-warning/10 text-warning',
                label: 'Pending'
            },
            [DocumentStatus.FAILED]: {
                className: 'bg-error/10 text-error',
                label: 'Failed'
            },
        }

        const config = statusConfig[status] || { className: 'bg-base-300', label: status }

        return (
            <span className={cn('px-3 py-1 rounded-full text-xs font-medium', config.className)}>
                {config.label}
            </span>
        )
    }

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="slide-panel-overlay animate-fade-in"
                onClick={onClose}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className={cn(
                    "slide-panel glass-card",
                    isOpen ? "animate-slide-in-left" : "animate-slide-out-left"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-base-300/30">
                    <h2 className="text-lg font-display font-semibold">Document Details</h2>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : doc ? (
                        <div className="space-y-6">
                            {/* File Info Card */}
                            <div className="glass-card p-5 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-base-content truncate">
                                            {doc.original_filename}
                                        </h3>
                                        <div className="mt-2">
                                            {getStatusBadge(doc.status)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass-card p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1">
                                        <HardDrive className="h-3.5 w-3.5" />
                                        File Size
                                    </div>
                                    <p className="font-semibold">
                                        {doc.file_size ? formatBytes(doc.file_size) : 'Unknown'}
                                    </p>
                                </div>

                                <div className="glass-card p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1">
                                        <Layers className="h-3.5 w-3.5" />
                                        Chunks
                                    </div>
                                    <p className="font-semibold">{doc.chunk_count || 0}</p>
                                </div>

                                <div className="glass-card p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Uploaded
                                    </div>
                                    <p className="font-semibold text-sm">
                                        {formatDate(doc.created_at)}
                                    </p>
                                </div>

                                <div className="glass-card p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-base-content/50 text-xs mb-1">
                                        <FileText className="h-3.5 w-3.5" />
                                        Pages
                                    </div>
                                    <p className="font-semibold">
                                        {doc.page_count || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Status Message */}
                            {doc.status_message && (
                                <div className={cn(
                                    "p-4 rounded-xl text-sm",
                                    doc.status === DocumentStatus.FAILED
                                        ? "bg-error/10 text-error"
                                        : "bg-info/10 text-info"
                                )}>
                                    {doc.status_message}
                                </div>
                            )}

                            {/* File Type */}
                            {doc.file_type && (
                                <div className="glass-card p-4 rounded-xl">
                                    <div className="text-xs text-base-content/50 mb-1">File Type</div>
                                    <p className="font-mono text-sm">{doc.file_type}</p>
                                </div>
                            )}

                            {/* Character Count */}
                            {doc.character_count && (
                                <div className="glass-card p-4 rounded-xl">
                                    <div className="text-xs text-base-content/50 mb-1">Character Count</div>
                                    <p className="font-semibold">{doc.character_count.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-base-content/50">
                            <FileText className="h-12 w-12 mb-4 opacity-30" />
                            <p>Document not found</p>
                        </div>
                    )}
                </div>

                {/* Actions Footer */}
                {doc && (
                    <div className="p-6 border-t border-base-300/30 space-y-3">
                        {doc.status === DocumentStatus.COMPLETED && (
                            <button
                                onClick={handleReingest}
                                disabled={reingestMutation.isPending}
                                className="btn btn-outline btn-sm w-full gap-2"
                            >
                                {reingestMutation.isPending ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <RefreshCw className="h-4 w-4" />
                                )}
                                Re-process Document
                            </button>
                        )}

                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="btn btn-outline btn-error btn-sm w-full gap-2"
                        >
                            {deleteMutation.isPending ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                            Delete Document
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

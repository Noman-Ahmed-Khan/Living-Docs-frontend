'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { DocumentPreviewPanel } from '@/components/layout/document-preview-panel'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const params = useParams()
  const [isHydrated, setIsHydrated] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  // Get projectId from params for the preview panel
  const projectId = params?.projectId as string || ''

  useEffect(() => {
    // Mark as hydrated after initial mount
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Only check auth after hydration is complete
    if (isHydrated && !isAuthenticated()) {
      router.push('/login')
    }
  }, [isHydrated, isAuthenticated, router])

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden">
      {/* Sidebar - Retractable */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">
        <Sidebar onDocumentSelect={setSelectedDocumentId} />
      </div>

      {/* Mobile Drawer wrapper could go here if we want to keep mobile drawer support separately, 
          but for now relying on hidden lg:block for sidebar and assuming mobile menu in header handles a mobile sidebar or drawer.
          The existing header has a sidebar-drawer toggle. We might need to adjust Header to work with this new layout or keep a mobile sidebar.
      */}
      {/* Mobile Sidebar (Drawer) implementation for smaller screens */}
      <div className="drawer lg:hidden absolute z-50">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <div className="h-full">
            <Sidebar onDocumentSelect={(docId) => {
              setSelectedDocumentId(docId)
              // Close drawer on selection
              const checkbox = document.getElementById('sidebar-drawer') as HTMLInputElement
              if (checkbox) checkbox.checked = false
            }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Right-side Document Preview Panel */}
      <DocumentPreviewPanel
        documentId={selectedDocumentId}
        projectId={projectId}
        isOpen={!!selectedDocumentId}
        onClose={() => setSelectedDocumentId(null)}
      />
    </div>
  )
}
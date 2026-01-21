'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import {
  FolderKanban,
  Settings,
  LogOut,
  FileText,
  ChevronLeft,
  ChevronRight,
  File,
  FileType,
  Loader2,
} from 'lucide-react'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { useDocuments } from '@/features/documents/hooks/use-documents'

const navigation = [
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  onDocumentSelect?: (documentId: string) => void
}

import { ThemeToggle } from './theme-toggle'

export function Sidebar({ onDocumentSelect }: SidebarProps) {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  // Get projectId from URL if we're in a project context
  const projectId = params?.projectId as string | undefined

  // Sidebar collapse state with localStorage persistence
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
  }

  // Fetch documents when in project context
  const { data: documentsData, isLoading: documentsLoading } = useDocuments(
    projectId || '',
    { page: 1 }
  )

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf':
        return <FileType className="h-4 w-4 text-error" />
      case 'doc':
      case 'docx':
        return <FileType className="h-4 w-4 text-info" />
      case 'txt':
      case 'md':
        return <FileText className="h-4 w-4 text-base-content/50" />
      default:
        return <File className="h-4 w-4 text-base-content/50" />
    }
  }

  return (
    <aside
      className={cn(
        "bg-base-100 border-r border-base-300 flex flex-col overflow-hidden transition-all duration-300",
        isCollapsed ? "w-24" : "w-80"
      )}
    >
      <div className={cn("p-8 flex items-center justify-between gap-4", isCollapsed && "justify-center p-4")}>
        <div className="flex items-center gap-4">
          <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-primary-content shadow-xl shadow-primary/20 flex-shrink-0">
            <span className="material-symbols-outlined !text-3xl">auto_awesome</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-base-content leading-none">LivingDocs</h1>
              <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest mt-1">Management Console</p>
            </div>
          )}
        </div>

        {/* Collapse toggle button */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="size-8 rounded-xl bg-base-200 border border-base-300 shadow-sm flex items-center justify-center text-base-content/50 hover:text-primary hover:border-primary/30 transition-all"
          >
            <span className="material-symbols-outlined !text-lg">side_navigation</span>
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleCollapse}
            className="size-10 rounded-xl bg-base-200 border border-base-300 shadow-sm flex items-center justify-center text-base-content/50 hover:text-primary hover:border-primary/30 transition-all"
          >
            <span className="material-symbols-outlined">menu_open</span>
          </button>
        </div>
      )}

      <nav className="flex-1 px-6 space-y-2 py-4 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-4 transition-all rounded-2xl",
                isActive
                  ? "text-primary bg-primary/10 border border-primary/20 shadow-sm font-bold"
                  : "text-base-content/60 hover:text-primary hover:bg-base-200 font-semibold",
                isCollapsed && "justify-center px-0"
              )}
            >
              <span className="material-symbols-outlined">
                {item.name === 'Projects' ? 'dashboard' : 'settings'}
              </span>
              {!isCollapsed && <span className="text-sm">{item.name}</span>}
            </Link>
          )
        })}

        {/* Project Documents Section */}
        {!isCollapsed && projectId && (
          <div className="pt-6 pb-2">
            <div className="flex items-center justify-between mb-4 px-5">
              <h2 className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Project Documents</h2>
              {documentsLoading && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
            </div>
            <div className="space-y-1">
              {documentsData?.items?.map((doc: any) => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentSelect?.(doc.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-base-content/60 hover:text-primary hover:bg-base-200 rounded-2xl transition-all text-left group"
                >
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                    {getFileIcon(doc.original_filename)}
                  </div>
                  <span className="truncate flex-1 font-medium">{doc.original_filename}</span>
                </button>
              ))}
              {!documentsLoading && (!documentsData?.items || documentsData.items.length === 0) && (
                <p className="px-5 py-2 text-xs text-base-content/40 italic">No documents found</p>
              )}
            </div>
          </div>
        )}

        {!isCollapsed && (
          <div className="pt-4">
            <a className="flex items-center gap-3 px-5 py-4 text-base-content/60 hover:text-primary hover:bg-base-200 rounded-2xl transition-all" href="#">
              <span className="material-symbols-outlined">shield_person</span>
              <span className="font-semibold text-sm">Security</span>
            </a>
            <a className="flex items-center gap-3 px-5 py-4 text-base-content/60 hover:text-primary hover:bg-base-200 rounded-2xl transition-all" href="#">
              <span className="material-symbols-outlined">payments</span>
              <span className="font-semibold text-sm">Billing</span>
            </a>
          </div>
        )}
      </nav>

      <div className="p-8 space-y-4">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <ThemeToggle />
          {!isCollapsed && <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Theme</span>}
        </div>

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center justify-center gap-3 px-4 py-4 bg-base-200 border border-base-300 text-base-content/70 font-bold text-sm rounded-2xl hover:bg-error/10 hover:text-error hover:border-error/20 transition-all",
            isCollapsed && "px-0"
          )}
        >
          <span className="material-symbols-outlined">logout</span>
          {!isCollapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  )
}
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FolderKanban, 
  Settings, 
  LogOut,
  FileText,
} from 'lucide-react'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="bg-base-100 w-80 min-h-screen flex flex-col">
      <div className="p-4 border-b border-base-300">
        <Link href="/projects" className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Living Docs</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="menu menu-lg gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    isActive && 'active'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="text-sm">
                {user?.email?.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-base-content/60">
              {user?.is_verified ? 'Verified' : 'Unverified'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error btn-sm w-full gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
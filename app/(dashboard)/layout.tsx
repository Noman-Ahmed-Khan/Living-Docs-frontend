'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)

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
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-base-200 p-4 lg:p-8">
          {children}
        </main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  )
}
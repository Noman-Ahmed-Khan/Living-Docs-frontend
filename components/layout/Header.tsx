'use client'

import { Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-base-100 border-b border-base-300 lg:hidden">
      <div className="navbar">
        <div className="flex-none">
          <label htmlFor="sidebar-drawer" className="btn btn-square btn-ghost">
            <Menu className="h-5 w-5" />
          </label>
        </div>
        <div className="flex-1">
          <span className="text-xl font-bold">Living Docs</span>
        </div>
      </div>
    </header>
  )
}
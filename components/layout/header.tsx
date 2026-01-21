'use client'

import { Menu } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="glass sticky top-0 z-20 lg:hidden border-b border-base-300">
      <div className="navbar min-h-[4rem] px-4">
        <div className="flex-none">
          <label
            htmlFor="sidebar-drawer"
            className="btn btn-square btn-ghost hover:bg-base-content/5 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </label>
        </div>
        <div className="flex-1">
          <span className="text-xl font-display font-bold text-primary ml-2">
            Living Docs
          </span>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
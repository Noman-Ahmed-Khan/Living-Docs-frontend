'use client'

import Link from 'next/link'
import { FileText, Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              Living Docs
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Noman-Ahmed-Khan/Living-Docs-frontend"
              target="_blank"
              className="btn btn-ghost btn-circle hidden sm:flex hover:bg-base-content/5"
            >
              <Github className="h-5 w-5" />
            </Link>

            <Link href="/login" className="btn btn-ghost hover:bg-base-content/5 font-medium">
              Sign In
            </Link>

            <Link href="/register" className="btn btn-gradient gap-2 rounded-full px-6 shadow-glow hover:shadow-glow-lg transition-all animate-fade-in text-white border-none">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
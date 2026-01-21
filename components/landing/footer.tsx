'use client'

import Link from 'next/link'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-base-300/30 bg-base-100/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold font-display">Living Docs</span>
            </div>
            <p className="text-sm text-base-content/60">
              © 2024 Living Docs. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-base-content/60 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-base-content/60 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-base-content/60 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-base-content/5">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="https://github.com/Noman-Ahmed-Khan/Living-Docs-frontend" className="btn btn-ghost btn-sm btn-circle hover:bg-base-content/5">
              <Github className="h-4 w-4" />
            </Link>
            <Link href="#" className="btn btn-ghost btn-sm btn-circle hover:bg-base-content/5">
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
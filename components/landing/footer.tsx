import Link from 'next/link'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <FileText className="h-6 w-6 text-primary-content" />
              </div>
              <span className="text-xl font-bold">Living Docs</span>
            </Link>
            <p className="text-base-content/70 mb-4 max-w-md">
              AI-powered document intelligence platform. Transform your documents
              into intelligent, searchable knowledge bases.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-base-content/70 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-base-content/70 hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-base-content/70 hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-base-content/70 hover:text-primary">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-base-content/70 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base-content/70 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base-content/70 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base-content/70 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-8 text-center text-base-content/60">
          <p>© {new Date().getFullYear()} Living Docs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/login', '/register', '/verify-email', '/forgot-password', '/reset-password']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookie
  const hasAuthCookie = request.cookies.has('auth-storage')

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  // Redirect authenticated users away from auth pages
  if (hasAuthCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/projects', request.url))
  }

  // Redirect unauthenticated users to login (except public routes)
  if (!hasAuthCookie && !isPublicRoute && pathname.startsWith('/projects')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
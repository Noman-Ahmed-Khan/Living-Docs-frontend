import { Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
}

export function LoadingSpinner({ className, size = 'md', label }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Animated Glow Backdrop */}
        <div className={cn(
          "absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow",
          sizeClasses[size]
        )} />

        {/* Main Spinner */}
        <div className="relative">
          <Loader2 className={cn(
            'animate-spin text-primary',
            sizeClasses[size],
            className
          )} />

          {size !== 'sm' && (
            <Sparkles className={cn(
              "absolute -top-1 -right-1 text-secondary animate-float opacity-50",
              size === 'md' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-6 w-6'
            )} />
          )}
        </div>
      </div>

      {label && (
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/40 animate-pulse">
          {label}
        </p>
      )}
    </div>
  )
}
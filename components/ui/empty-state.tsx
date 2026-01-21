import { LucideIcon, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-base-300/50 bg-base-100/30 animate-fade-in",
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 animate-pulse" />
        <div className="relative w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner group">
          <Icon className="h-10 w-10 text-primary opacity-60 group-hover:scale-110 transition-transform duration-500" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-secondary animate-float" />
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
      <p className="text-base-content/50 mb-10 max-w-sm font-medium leading-relaxed">
        {description}
      </p>

      {action && (
        <button
          className="btn btn-gradient px-8 shadow-glow hover:shadow-glow-lg transition-all rounded-xl"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
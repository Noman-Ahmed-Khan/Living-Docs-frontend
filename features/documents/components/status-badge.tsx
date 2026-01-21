import { DocumentStatus } from '@/lib/api/documents'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: DocumentStatus
  message?: string
  className?: string
}

export function StatusBadge({ status, message, className }: StatusBadgeProps) {
  const config = {
    [DocumentStatus.COMPLETED]: {
      icon: CheckCircle,
      className: 'bg-success/10 text-success border-success/20',
      label: 'Completed',
      dotClass: 'bg-success',
    },
    [DocumentStatus.PROCESSING]: {
      icon: Loader2,
      className: 'bg-warning/10 text-warning border-warning/20',
      label: 'Processing',
      dotClass: 'bg-warning',
    },
    [DocumentStatus.PENDING]: {
      icon: Clock,
      className: 'bg-info/10 text-info border-info/20',
      label: 'Pending',
      dotClass: 'bg-info',
    },
    [DocumentStatus.FAILED]: {
      icon: XCircle,
      className: 'bg-error/10 text-error border-error/20',
      label: 'Failed',
      dotClass: 'bg-error',
    },
  }

  const { icon: Icon, className: statusClass, label, dotClass } = config[status]

  return (
    <div className={cn("tooltip-modern", message && "tooltip")} data-tip={message || label}>
      <div className={cn(
        "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all duration-300",
        statusClass,
        className
      )}>
        <span className="relative flex h-1.5 w-1.5">
          {status === DocumentStatus.PROCESSING && (
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotClass)}></span>
          )}
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotClass)}></span>
        </span>
        <Icon className={cn("h-3 w-3", status === DocumentStatus.PROCESSING && "animate-spin")} />
        <span className="capitalize">{label}</span>
      </div>
    </div>
  )
}
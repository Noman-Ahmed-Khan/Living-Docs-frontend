import { DocumentStatus } from '@/lib/api/documents'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'

interface StatusBadgeProps {
  status: DocumentStatus
  message?: string
}

export function StatusBadge({ status, message }: StatusBadgeProps) {
  const config = {
    [DocumentStatus.COMPLETED]: {
      icon: CheckCircle,
      className: 'badge-success',
      label: 'Completed',
    },
    [DocumentStatus.PROCESSING]: {
      icon: Loader2,
      className: 'badge-warning',
      label: 'Processing',
    },
    [DocumentStatus.PENDING]: {
      icon: Clock,
      className: 'badge-info',
      label: 'Pending',
    },
    [DocumentStatus.FAILED]: {
      icon: XCircle,
      className: 'badge-error',
      label: 'Failed',
    },
  }

  const { icon: Icon, className, label } = config[status]

  return (
    <div className="tooltip" data-tip={message || label}>
      <div className={`badge gap-2 ${className}`}>
        <Icon className={`h-3 w-3 ${status === DocumentStatus.PROCESSING ? 'animate-spin' : ''}`} />
        {label}
      </div>
    </div>
  )
}
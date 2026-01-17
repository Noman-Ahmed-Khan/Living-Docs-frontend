'use client'

import { useSessions, useRevokeSession, useLogoutAll } from '../hooks/use-sessions'
import { formatDateTime } from '@/lib/utils'
import { Loader2, Trash2, Monitor, Smartphone } from 'lucide-react'

export function SessionList() {
  const { data: sessions, isLoading } = useSessions()
  const revokeMutation = useRevokeSession()
  const logoutAllMutation = useLogoutAll()

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!sessions || sessions.length === 0) {
    return <div className="text-base-content/70">No active sessions</div>
  }

  const getDeviceIcon = (deviceInfo?: string) => {
    if (deviceInfo?.toLowerCase().includes('mobile')) {
      return <Smartphone className="h-5 w-5" />
    }
    return <Monitor className="h-5 w-5" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-base-content/70">{sessions.length} active session(s)</p>
        {sessions.length > 1 && (
          <button
            className="btn btn-error btn-sm"
            onClick={() => {
              if (confirm('Logout from all devices?')) {
                logoutAllMutation.mutate()
              }
            }}
            disabled={logoutAllMutation.isPending}
          >
            {logoutAllMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Logout All'
            )}
          </button>
        )}
      </div>

      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`card ${session.is_current ? 'bg-primary/10' : 'bg-base-200'}`}
          >
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getDeviceIcon(session.device_info)}
                  <div>
                    <p className="font-semibold">
                      {session.device_info || 'Unknown Device'}
                      {session.is_current && (
                        <span className="badge badge-primary badge-sm ml-2">Current</span>
                      )}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {session.ip_address || 'Unknown IP'}
                    </p>
                    <p className="text-xs text-base-content/60">
                      Created: {formatDateTime(session.created_at)}
                    </p>
                  </div>
                </div>
                {!session.is_current && (
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => revokeMutation.mutate(session.id)}
                    disabled={revokeMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
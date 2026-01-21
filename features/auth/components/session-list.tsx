'use client'

import { useSessions, useRevokeSession, useLogoutAll } from '../hooks/use-sessions'
import { formatDateTime, cn } from '@/lib/utils'
import { Loader2, Trash2, Monitor, Smartphone, Globe, Shield, Power, Clock } from 'lucide-react'

export function SessionList() {
  const { data: sessions, isLoading } = useSessions()
  const revokeMutation = useRevokeSession()
  const logoutAllMutation = useLogoutAll()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">Securing Sessions...</p>
      </div>
    )
  }

  if (!sessions || sessions.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-base-300 rounded-3xl">
        <Shield className="h-10 w-10 text-base-content/20 mx-auto mb-3" />
        <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">No active sessions tracked</p>
      </div>
    )
  }

  const getDeviceIcon = (deviceInfo?: string) => {
    if (deviceInfo?.toLowerCase().includes('mobile')) {
      return <Smartphone className="h-5 w-5" />
    }
    return <Monitor className="h-5 w-5" />
  }

  return (
    <div className="space-y-3">
      {sessions.map((session, i) => (
        <div
          key={session.id}
          className={cn(
            "flex items-center gap-4 p-5 rounded-2xl transition-all border",
            session.is_current
              ? "bg-primary/5 border-primary/20 hover:bg-primary/10 shadow-sm"
              : "bg-base-200/50 border-base-300 hover:bg-base-200 opacity-80"
          )}
        >
          <div className="size-12 bg-base-100 rounded-xl flex items-center justify-center border border-base-300 shadow-sm flex-shrink-0 text-base-content/40">
            <span className="material-symbols-outlined">
              {session.device_info?.toLowerCase().includes('mobile') || session.device_info?.toLowerCase().includes('iphone') || session.device_info?.toLowerCase().includes('android')
                ? 'smartphone'
                : 'laptop_mac'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold text-base-content truncate">
                {session.device_info || 'Unknown Device'}
              </p>
              {session.is_current && (
                <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold rounded-full border border-success/20 uppercase">
                  Current
                </span>
              )}
            </div>
            <p className="text-sm text-base-content/50">
              {session.ip_address || '127.0.0.1'} • {formatDateTime(session.created_at)}
            </p>
          </div>
          <div className="text-right mr-4 hidden md:block flex-shrink-0">
            <p className="text-xs font-bold text-base-content/30 uppercase tracking-tighter">Last Active</p>
            <p className="text-sm font-bold text-base-content/70">
              {session.is_current ? 'Just now' : 'Active'}
            </p>
          </div>
          <button
            onClick={() => !session.is_current && revokeMutation.mutate(session.id)}
            disabled={session.is_current || revokeMutation.isPending}
            className={cn(
              "px-4 py-2 bg-base-100 border border-base-300 rounded-xl text-xs font-bold transition-all",
              session.is_current
                ? "text-base-content/20 cursor-not-allowed border-transparent"
                : "text-base-content/60 hover:text-error hover:border-error/20 hover:bg-error/5"
            )}
          >
            {revokeMutation.isPending && !session.is_current ? (
              <Loader2 className="h-3 w-3 animate-spin mx-auto" />
            ) : (
              'Revoke'
            )}
          </button>
        </div>
      ))}
    </div>
  )
}
'use client'

import { useUserProfile } from '../hooks/use-user-profile'
import { formatDateTime } from '@/lib/utils'
import { Loader2, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react'

export function UserProfileSection() {
  const { data: profile, isLoading } = useUserProfile()

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return <div className="alert alert-error">Failed to load profile</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-base-content/70" />
        <div>
          <p className="text-sm text-base-content/70">Email</p>
          <p className="font-semibold">{profile.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {profile.is_verified ? (
          <CheckCircle className="h-5 w-5 text-success" />
        ) : (
          <XCircle className="h-5 w-5 text-error" />
        )}
        <div>
          <p className="text-sm text-base-content/70">Verification Status</p>
          <p className={`font-semibold ${profile.is_verified ? 'text-success' : 'text-error'}`}>
            {profile.is_verified ? 'Verified' : 'Not Verified'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-base-content/70" />
        <div>
          <p className="text-sm text-base-content/70">Member Since</p>
          <p className="font-semibold">{formatDateTime(profile.created_at)}</p>
        </div>
      </div>

      {profile.last_login_at && (
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-base-content/70" />
          <div>
            <p className="text-sm text-base-content/70">Last Login</p>
            <p className="font-semibold">{formatDateTime(profile.last_login_at)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
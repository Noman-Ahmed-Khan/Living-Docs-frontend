'use client'

import { ChangePasswordForm } from '@/features/auth/components/change-password-form'
import { SessionList } from '@/features/auth/components/session-list'
import { UserProfileSection } from '@/features/auth/components/user-profile-section'
import { Shield, Key, MonitorSmartphone } from 'lucide-react' // Changed Devices to MonitorSmartphone

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-base-content/70 mt-1">
          Manage your account and security settings
        </p>
      </div>

      {/* Profile Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="card-title">Profile Information</h2>
          </div>
          <UserProfileSection />
        </div>
      </div>

      {/* Password Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <Key className="h-6 w-6 text-primary" />
            <h2 className="card-title">Change Password</h2>
          </div>
          <ChangePasswordForm />
        </div>
      </div>

      {/* Sessions Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <MonitorSmartphone className="h-6 w-6 text-primary" />
            <h2 className="card-title">Active Sessions</h2>
          </div>
          <SessionList />
        </div>
      </div>
    </div>
  )
}
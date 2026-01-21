"use client"

import { ChangePasswordForm } from '@/features/auth/components/change-password-form'
import { SessionList } from '@/features/auth/components/session-list'
import { UserProfileSection } from '@/features/auth/components/user-profile-section'
import { useLogoutAll } from '@/features/auth/hooks/use-sessions'
import { useDeleteAccount } from '@/features/auth/hooks/use-user-profile'
import { useState } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
export default function SettingsPage() {
  const logoutAll = useLogoutAll()
  const deleteAccount = useDeleteAccount()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const handleDeleteAccount = () => {
    if (confirm('Are you absolutely sure? This action is irreversible.')) {
      deleteAccount.mutate({ password: deletePassword, confirmation: 'DELETE' })
    }
  }

  return (
    <div className="relative min-h-full">
      <div className="max-w-4xl mx-auto py-6 md:py-12 space-y-10 px-4 md:px-0">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-base-content tracking-tight">Account Management</h2>
          <p className="text-base-content/60 mt-2 font-medium">Manage your profile details, security, and active sessions.</p>
        </header>

        {/* Profile Section */}
        <UserProfileSection />

        {/* Security Section */}
        <section className="glass-card rounded-3xl p-6 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-12 rounded-2xl bg-warning/10 flex items-center justify-center border border-warning/20">
              <span className="material-symbols-outlined text-warning">lock_reset</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-base-content">Reset Password</h3>
              <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-0.5">Security Settings</p>
            </div>
          </div>
          <ChangePasswordForm />
        </section>

        {/* Session Management */}
        <section className="glass-card rounded-3xl p-6 md:p-10 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary">devices</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Active Sessions</h3>
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-0.5">Device History</p>
              </div>
            </div>
            <button
              onClick={() => logoutAll.mutate()}
              disabled={logoutAll.isPending}
              className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              {logoutAll.isPending && <Loader2 className="size-4 animate-spin" />}
              Revoke All
            </button>
          </div>
          <SessionList />
        </section>

        {/* Danger Zone */}
        <section className="glass-card border-error/20 bg-error/5 rounded-3xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="size-12 rounded-2xl bg-error/10 flex items-center justify-center border border-error/20 text-error">
                <AlertTriangle className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Danger Zone</h3>
                <p className="text-sm text-base-content/60 mt-0.5">Permanently delete your account and all data.</p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-8 py-3.5 bg-base-100 border border-error/20 rounded-2xl text-sm font-bold text-error hover:bg-error/5 transition-all shadow-sm"
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-base-100 rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full border border-base-300 animate-scale-in">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="size-16 rounded-3xl bg-error/10 flex items-center justify-center text-error border border-error/20">
                  <span className="material-symbols-outlined !text-4xl">delete_forever</span>
                </div>
                <h3 className="text-2xl font-bold text-base-content">Are you sure?</h3>
                <p className="text-base-content/60 leading-relaxed font-medium">
                  This action will permanently delete your LivingDocs account. Please enter your password to confirm.
                </p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-base-200 border border-base-300 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-error/20 focus:border-error/50 transition-all outline-none text-base-content"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
                <div className="flex w-full gap-3 pt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-4 bg-base-200 text-base-content/70 rounded-2xl font-bold text-sm hover:bg-base-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={!deletePassword || deleteAccount.isPending}
                    className="flex-1 py-4 bg-error text-error-content rounded-2xl font-bold text-sm hover:bg-error/90 transition-colors shadow-lg shadow-error/20 disabled:opacity-50"
                  >
                    {deleteAccount.isPending ? <Loader2 className="size-4 animate-spin mx-auto" /> : 'Confirm Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="pt-10 pb-20 text-center space-y-4">
          <p className="text-xs text-base-content/40 font-bold uppercase tracking-[0.2em]">LivingDocs v2.4.0 — Security Engine 4.0</p>
          <div className="flex justify-center gap-8">
            <a className="text-xs font-bold text-base-content/40 hover:text-primary transition-colors uppercase tracking-widest" href="#">Privacy Policy</a>
            <a className="text-xs font-bold text-base-content/40 hover:text-primary transition-colors uppercase tracking-widest" href="#">Terms of Service</a>
            <a className="text-xs font-bold text-base-content/40 hover:text-primary transition-colors uppercase tracking-widest" href="#">Support</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

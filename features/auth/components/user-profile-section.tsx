'use client'

import { useUserProfile, useUpdateProfile } from '../hooks/use-user-profile'
import { Loader2, Check, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ProfileFormData {
  email: string
}

export function UserProfileSection() {
  const { data: profile, isLoading } = useUserProfile()
  const updateProfile = useUpdateProfile()
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    values: {
      email: profile?.email || ''
    }
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 glass-card rounded-3xl">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fetching Profile...</p>
      </div>
    )
  }

  const userInitial = profile?.email?.split('@')[0] || 'User'
  const fullName = userInitial.charAt(0).toUpperCase() + userInitial.slice(1)

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        setIsEditing(false)
      }
    })
  }

  return (
    <section className="glass-card rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-10">
      <div className="relative group">
        <div className="size-40 rounded-[2.5rem] bg-primary/10 overflow-hidden border-4 border-base-100 shadow-2xl relative flex items-center justify-center">
          <div className="text-5xl font-extrabold text-primary uppercase">
            {profile?.email?.[0] || 'U'}
          </div>
        </div>
        <button className="absolute -bottom-2 -right-2 size-12 bg-base-100 border border-base-300 rounded-2xl shadow-xl flex items-center justify-center text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">photo_camera</span>
        </button>
      </div>
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-bold text-base-content">{fullName}</h3>
            <p className="text-primary font-semibold flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="material-symbols-outlined !text-lg">verified</span>
              {profile?.is_verified ? 'Verified Member' : 'Standard Member'}
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 bg-base-100 border border-base-300 rounded-xl text-sm font-bold text-base-content/70 hover:bg-base-200 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">edit</span> Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={updateProfile.isPending}
                className="px-4 py-2 bg-primary text-primary-content rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {updateProfile.isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  reset()
                }}
                className="px-4 py-2 bg-base-100 border border-base-300 text-base-content/60 rounded-xl text-sm font-bold hover:bg-base-200 transition-colors flex items-center gap-2"
              >
                <X className="size-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2 max-w-sm mx-auto md:mx-0">
            <label className="text-xs font-bold text-base-content/40 uppercase tracking-widest ml-1">Email Address</label>
            <input
              {...register('email')}
              className="w-full bg-base-100/60 border border-base-300/80 rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none text-base-content font-medium"
              placeholder="Enter your email"
            />
          </div>
        ) : (
          <p className="text-base-content/70 leading-relaxed max-w-xl">
            {profile?.email?.includes('livingdocs.ai')
              ? 'Senior UX Designer & AI Enthusiast. Helping teams build the future of document collaboration at LivingDocs.'
              : 'LivingDocs user exploring the future of intelligent document collaboration and AI-driven insights.'}
          </p>
        )}

        <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
          {!isEditing && (
            <div className="flex items-center gap-2 text-base-content/40 text-sm font-medium">
              <span className="material-symbols-outlined text-lg">mail</span>
              {profile?.email}
            </div>
          )}
          <div className="flex items-center gap-2 text-base-content/40 text-sm font-medium">
            <span className="material-symbols-outlined text-lg">location_on</span>
            Global
          </div>
        </div>
      </div>
    </section>
  )
}
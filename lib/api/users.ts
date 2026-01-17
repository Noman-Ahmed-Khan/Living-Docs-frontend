import apiClient from './client'

export interface User {
  id: string
  email: string
  is_active: boolean
  is_verified: boolean
  created_at: string
  last_login_at?: string
}

export interface UserProfile extends User {
  updated_at: string
  password_changed_at: string
}

export interface UserUpdate {
  email?: string
}

export const usersApi = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<UserProfile>('/api/v1/users/me')
    return data
  },

  updateProfile: async (updates: UserUpdate): Promise<User> => {
    const { data } = await apiClient.patch<User>('/api/v1/users/me', updates)
    return data
  },

  deleteAccount: async (password: string, confirmation: string): Promise<void> => {
    await apiClient.delete('/api/v1/users/me', {
      data: { password, confirmation },
    })
  },

  deactivateAccount: async (password: string): Promise<void> => {
    await apiClient.post('/api/v1/users/me/deactivate', {
      password,
      confirmation: 'DELETE',
    })
  },

  activateAccount: async (): Promise<void> => {
    await apiClient.post('/api/v1/users/me/activate')
  },
}
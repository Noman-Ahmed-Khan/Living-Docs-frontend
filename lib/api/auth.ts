import apiClient from './client'

export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export interface AuthStatusResponse {
  is_authenticated: boolean
  is_verified: boolean
  email: string
  user_id: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  new_password: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

export interface SessionInfo {
  id: string
  device_info?: string
  ip_address?: string
  created_at: string
  expires_at: string
  is_current: boolean
}

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post('/api/v1/auth/register', data),

  login: async (email: string, password: string): Promise<TokenResponse> => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const { data } = await apiClient.post<TokenResponse>(
      '/api/v1/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return data
  },

  refresh: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/api/v1/auth/refresh', {
      refresh_token: refreshToken,
    }),

  logout: (refreshToken: string) =>
    apiClient.post('/api/v1/auth/logout', { refresh_token: refreshToken }),

  logoutAll: () => apiClient.post('/api/v1/auth/logout-all'),

  verifyEmail: (data: VerifyEmailRequest) =>
    apiClient.post('/api/v1/auth/verify-email', data),

  resendVerification: (email: string) =>
    apiClient.post('/api/v1/auth/resend-verification', { email }),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post('/api/v1/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/api/v1/auth/reset-password', data),

  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post('/api/v1/auth/change-password', data),

  getAuthStatus: async (): Promise<AuthStatusResponse> => {
    const { data } = await apiClient.get<AuthStatusResponse>('/api/v1/auth/status')
    return data
  },

  getSessions: async (): Promise<SessionInfo[]> => {
    const { data } = await apiClient.get<{ sessions: SessionInfo[] }>(
      '/api/v1/auth/sessions'
    )
    return data.sessions
  },

  revokeSession: (sessionId: string) =>
    apiClient.delete(`/api/v1/auth/sessions/${sessionId}`),
}
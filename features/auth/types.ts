export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  is_verified: boolean
}
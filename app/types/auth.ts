// app/types/auth.ts
export type UserRole = 'superadmin' | 'employee' | 'accountant' | 'artist'

export type Permission = 
  | 'manage_artists'
  | 'manage_files'
  | 'view_analytics'
  | 'manage_social'
  | 'manage_calendar'
  | 'view_financials'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  artist?: string // ID de l'artiste si le rôle est 'artist'
  createdAt: string
  lastLogin?: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}
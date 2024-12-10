// app/services/auth.ts
import { User } from "@/app/types/auth"

export const AuthService = {
  // Stocker les informations de session
  setSession: (token: string, user: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  // Récupérer les informations de session
  getSession: () => {
    try {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      return {
        token,
        user: user ? JSON.parse(user) : null
      }
    } catch (error) {
      return { token: null, user: null }
    }
  },

  // Nettoyer la session
  clearSession: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated: () => {
    const { token, user } = AuthService.getSession()
    return !!token && !!user
  },

  // Déconnexion
  async logout() {
    try {
      // Appel à l'API de déconnexion
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la déconnexion')
      }

      // Nettoyage local
      AuthService.clearSession()
      return true
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      return false
    }
  }
}
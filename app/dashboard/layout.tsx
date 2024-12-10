// app/dashboard/layout.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "sonner"
import { User } from "@/app/types/auth"
import Sidebar from "@/app/components/layout/sidebar"
import Topbar from "@/app/components/layout/topbar"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Gestion de l'authentification
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) {
        router.push('/login')
        return
      }

      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error('Erreur de données utilisateur:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Gestion du responsive
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      setIsSidebarOpen(!isMobileView)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar
        user={user}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className={`transition-all duration-300 ${isSidebarOpen && !isMobile ? 'md:pl-72' : ''}`}>
        <Topbar
          user={user}
          isMobile={isMobile}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
        />
        
        <main className="p-4 sm:p-6 md:p-8">
          {children}
          <Toaster position="bottom-center" />
        </main>
      </div>
    </div>
  )
}
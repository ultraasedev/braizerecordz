// app/components/layout/Topbar.tsx
"use client"

import { useState } from 'react'
import { BellIcon, SearchIcon, Menu, X, ChevronDown, Settings, LogOut } from 'lucide-react'
import { User } from '@/app/types/auth'
import { motion, AnimatePresence } from 'framer-motion'

interface TopbarProps {
  user: User | null
  isMobile: boolean
  onMenuClick: () => void
  onLogout: () => void
}

export default function Topbar({ user, isMobile, onMenuClick, onLogout }: TopbarProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Nouvelle sortie',
      message: 'LASHKA - "Burn Out" est maintenant disponible',
      time: 'Il y a 2h',
      unread: true
    },
    {
      id: 2,
      title: 'Nouvel artiste',
      message: 'MAES a rejoint le label',
      time: 'Il y a 5h',
      unread: true
    }
  ]

  return (
    <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-sm border-b border-zinc-800">
      <div className="px-4 h-16 flex items-center justify-between gap-4">
        {/* Menu Button & Search (Mobile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block relative w-64">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-zinc-900/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Toggle (Mobile) */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <SearchIcon className="w-6 h-6" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <BellIcon className="w-6 h-6" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-zinc-800">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white">{notification.title}</p>
                            <p className="mt-1 text-sm text-zinc-400">{notification.message}</p>
                            <p className="mt-1 text-xs text-zinc-500">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-medium">{user.name[0]}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg overflow-hidden"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfile(false)
                          onLogout()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-zinc-800 overflow-hidden"
          >
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-zinc-900/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
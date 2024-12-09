"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"

// Types pour les préférences de cookies
interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = "cookie-consent"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    setIsClient(true)
    // Vérifier le consentement existant
    const existingConsent = Cookies.get(COOKIE_CONSENT_KEY)
    
    if (existingConsent) {
      try {
        const parsedPreferences = JSON.parse(existingConsent)
        setPreferences(parsedPreferences)
      } catch (error) {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    savePreferences(allAccepted)
  }

  const rejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    savePreferences(allRejected)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    // Sauvegarder dans le cookie
    Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(prefs), { expires: 365 })
    setPreferences(prefs)

    // Gérer les services selon les préférences
    if (prefs.analytics) {
      // Activer les services analytiques
      // Exemple : window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }

    if (prefs.marketing) {
      // Activer les services marketing
      // Exemple : window.fbq?.('consent', 'grant')
    }

    setShowBanner(false)
    setShowPreferences(false)
  }

  // Ne rien rendre côté serveur
  if (!isClient) return null

  return (
    <AnimatePresence>
      {(showBanner || showPreferences) && (
        <>
          {/* Overlay pour le modal des préférences */}
          {showPreferences && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80"
              onClick={() => setShowPreferences(false)}
            />
          )}

          {/* Bannière de cookies */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-zinc-900 px-4 py-6 shadow-lg"
          >
            <div className="mx-auto max-w-7xl">
              {showPreferences ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium text-white">Paramètres des cookies</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Personnalisez vos préférences de cookies pour notre site.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Cookies nécessaires */}
                    <div className="rounded-lg bg-zinc-800/50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <label className="font-medium text-white">
                            Cookies nécessaires
                          </label>
                          <p className="mt-1 text-sm text-zinc-400">
                            Ces cookies sont essentiels au fonctionnement du site.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferences.necessary}
                          disabled
                          className="mt-1 h-4 w-4 rounded border-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Cookies analytics */}
                    <div className="rounded-lg bg-zinc-800/50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <label htmlFor="analytics" className="font-medium text-white">
                            Cookies analytiques
                          </label>
                          <p className="mt-1 text-sm text-zinc-400">
                            Nous aident à comprendre comment vous utilisez le site.
                          </p>
                        </div>
                        <input
                          id="analytics"
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            analytics: e.target.checked
                          }))}
                          className="mt-1 h-4 w-4 rounded border-zinc-600"
                        />
                      </div>
                    </div>

                    {/* Cookies marketing */}
                    <div className="rounded-lg bg-zinc-800/50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <label htmlFor="marketing" className="font-medium text-white">
                            Cookies marketing
                          </label>
                          <p className="mt-1 text-sm text-zinc-400">
                            Permettent de vous proposer des contenus personnalisés.
                          </p>
                        </div>
                        <input
                          id="marketing"
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            marketing: e.target.checked
                          }))}
                          className="mt-1 h-4 w-4 rounded border-zinc-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      onClick={rejectAll}
                      className="rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                      Tout refuser
                    </button>
                    <button
                      onClick={acceptAll}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Tout accepter
                    </button>
                    <button
                      onClick={() => savePreferences(preferences)}
                      className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                      Enregistrer mes choix
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-zinc-400">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={rejectAll}
                      className="rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                      Personnaliser
                    </button>
                    <button
                      onClick={acceptAll}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Tout accepter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
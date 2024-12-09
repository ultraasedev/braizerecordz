"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { usePathname } from "next/navigation"

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: "ARTISTES", href: "/artistes" },
  { label: "SERVICES", href: "/services" },
  { label: "SORTIES", href: "/sorties" },
  { label: "ACTUALITÉS", href: "/actualites" },
  { label: "CONTACT", href: "/contact" }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Vérifier l'état initial

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* Barre de navigation principale */}
      <nav 
        className={`
          relative flex h-20 items-center px-4 transition-all duration-300
          ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/50 to-transparent'}
        `}
      >
        <div className="relative z-10 flex w-full items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative h-20 w-20 transition-transform hover:scale-105"
            aria-label="Accueil"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </Link>

          {/* Bouton menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 p-2"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0
                }}
                className="block h-0.5 w-8 bg-white transition-colors group-hover:bg-red-500"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1
                }}
                className="block h-0.5 w-8 bg-white transition-colors group-hover:bg-red-500"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0
                }}
                className="block h-0.5 w-8 bg-white transition-colors group-hover:bg-red-500"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menu plein écran */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-40 flex bg-black"
          >
            {/* Contenu du menu */}
            <div className="flex w-full flex-col justify-between overflow-y-auto px-4 py-24">
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-3xl font-light text-white transition-colors group-hover:text-red-500 sm:text-4xl md:text-5xl lg:text-6xl">
                        {link.label}
                      </span>
                      <ArrowUpRight 
                        className="h-6 w-6 transform opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:h-8 sm:w-8"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Pied de page du menu */}
              <div className="mt-auto space-y-8 pt-8">
                <Link 
                  href="/submit-demo"
                  className="inline-block text-lg font-light text-white transition-colors hover:text-red-500 sm:text-xl"
                >
                  SOUMETTRE UNE DÉMO
                </Link>
                <div className="space-y-1 text-sm text-zinc-500">
                  <p>BRAIZERECORDS MUSIC GROUP</p>
                  <p>© 2024 - TOUS DROITS RÉSERVÉS</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
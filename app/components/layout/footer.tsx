"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"

// Types pour une meilleure organisation des données
interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
}

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

// Données des réseaux sociaux
const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" }
]

// Organisation des liens du footer
const footerSections: FooterSection[] = [
  {
    title: "Label",
    links: [
      { label: "À Propos", href: "/a-propos" },
      { label: "Nos Artistes", href: "/artistes" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Actualités", href: "/actualites" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "Production", href: "/services/production" },
      { label: "Distribution", href: "/services/distribution" },
      { label: "Edition", href: "/services/edition" },
      { label: "Management", href: "/services/management" }
    ]
  },
  {
    title: "Contact",
    links: [
      { label: "Nous Contacter", href: "/contact" },
      { label: "Rejoindre le Label", href: "/recrutement" },
      { label: "FAQ", href: "/faq" },
      { label: "Mentions Légales", href: "/mentions-legales" }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="relative bg-black pt-16 pb-6">
      {/* Effet de dégradé subtil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#FF0000,transparent_80%)] opacity-[0.02]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png" // Assurez-vous d'avoir votre logo
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-zinc-400 max-w-xs">
              Label de musique indépendant spécialisé dans les artistes urbains émergents et confirmés.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="rounded-full bg-zinc-900 p-2.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Sections de liens */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-sm font-medium text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Informations de contact */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-zinc-400">
              <MapPin size={18} className="text-red-500" />
              <span className="text-sm">5 Allee de la Grande Treille, 35200 Rennes</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <Phone size={18} className="text-red-500" />
              <span className="text-sm">+33 (0)1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <Mail size={18} className="text-red-500" />
              <span className="text-sm">contact@braizerecords.com</span>
            </div>
          </div>
        </div>

        {/* Copyright et liens légaux */}
        <div className="mt-8 border-t border-zinc-800 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-zinc-400">
              © 2024 BraizeRecords. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link
                href="/politique-confidentialite"
                className="text-xs text-zinc-400 transition-colors hover:text-white hover:underline"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/conditions-utilisation"
                className="text-xs text-zinc-400 transition-colors hover:text-white hover:underline"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
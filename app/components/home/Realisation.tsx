"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Play, Calendar, Award, Music, Eye } from "lucide-react"

type RealisationType = "Single" | "EP" | "Album" | "Compil" | "Placement Synchro & Pub" | "Promo & Marketing" | "Events"

interface Realisation {
  id: number
  title: string
  slug: string
  type: RealisationType
  artist: string
  image: string
  date: string
  description: string
  stats: {
    views?: string
    duration?: string
    awards?: string
  }
}

// Images plus professionnelles et orientées réalisations
const realisations: Realisation[] = [
    {
      id: 1,
      title: "Campagne Nike Air Max",
      slug: "campagne-nike-air-max",
      type: "Placement Synchro & Pub",
      artist: "MAES x Nike",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
      date: "2024",
      description: "Campagne publicitaire internationale",
      stats: {
        views: "2.5M",
        duration: "45s",
        awards: "Or FRAP Awards"
      }
    },
    {
      id: 2,
      title: "Festival Urban Wave",
      slug: "festival-urban-wave",
      type: "Events",
      artist: "Multi-Artists",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      date: "2023",
      description: "Festival - 25.000 spectateurs",
      stats: {
        duration: "3 jours",
        views: "850K"
      }
    },
    {
      id: 3,
      title: "Atmosphère",
      slug: "atmosphere",
      type: "Album",
      artist: "NORAJ",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      date: "2024",
      description: "Album 14 titres",
      stats: {
        views: "1.2M",
        duration: "48min",
        awards: "Disque d'Or"
      }
    },
    {
      id: 4,
      title: "PlayStation Showcase",
      slug: "playstation-showcase",
      type: "Placement Synchro & Pub",
      artist: "LYNA x Sony",
      image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9",
      date: "2024",
      description: "Bande-son événement gaming",
      stats: {
        views: "3.1M",
        duration: "30s"
      }
    },
    {
      id: 5,
      title: "Summer Hits 2024",
      slug: "summer-hits-2024",
      type: "Compil",
      artist: "Various Artists",
      image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae",
      date: "2024",
      description: "Compilation 25 titres",
      stats: {
        views: "750K",
        duration: "1h20"
      }
    },
    {
      id: 6,
      title: "Radio Tour France",
      slug: "radio-tour-france",
      type: "Promo & Marketing",
      artist: "KEYZAH",
      image: "https://plus.unsplash.com/premium_photo-1689052849144-c7f7b0491a8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhdGVhdSUyMHJhZGlvfGVufDB8fDB8fHww",
      date: "2024",
      description: "Tournée promotionnelle nationale",
      stats: {
        duration: "15 jours",
        views: "420K"
      }
    },
    {
      id: 7,
      title: "Eclipse",
      slug: "eclipse",
      type: "EP",
      artist: "SKYZO",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b",
      date: "2024",
      description: "EP 6 titres",
      stats: {
        views: "980K",
        duration: "22min"
      }
    },
    {
      id: 8,
      title: "Faya",
      slug: "faya",
      type: "Single",
      artist: "KEYZAH",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      date: "2024",
      description: "Single + Clip",
      stats: {
        views: "1.5M",
        duration: "3:42"
      }
    },
    {
      id: 9,
      title: "Red Bull Sound Tour",
      slug: "red-bull-sound-tour",
      type: "Events",
      artist: "MAES x Red Bull",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
      date: "2024",
      description: "Tournée événementielle",
      stats: {
        duration: "6 dates",
        views: "890K"
      }
    },
    {
      id: 10,
      title: "Contact",
      slug: "contact",
      type: "Single",
      artist: "DENZO",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      date: "2024",
      description: "Single + Clip",
      stats: {
        views: "2.1M",
        duration: "3:28"
      }
    },
    {
      id: 11,
      title: "Urban Connexion 2024",
      slug: "urban-connexion-2024",
      type: "Events",
      artist: "Multi-Artists",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      date: "2024",
      description: "Concert événement",
      stats: {
        duration: "1 soirée",
        views: "680K"
      }
    },
    {
      id: 12,
      title: "Campagne Adidas",
      slug: "campagne-adidas",
      type: "Placement Synchro & Pub",
      artist: "LASHKA x Adidas",
      image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
      date: "2024",
      description: "Campagne digitale",
      stats: {
        views: "1.8M",
        duration: "30s"
      }
    }
  ]

// Composant principal
export default function Realisations() {
    const [isMounted, setIsMounted] = useState(false)
    const [selectedType, setSelectedType] = useState<"Tous" | RealisationType>("Tous")
    const [isFilterVisible, setIsFilterVisible] = useState(false)
  
    // Effet de montage pour éviter l'hydratation côté serveur
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
    // Liste des types disponibles pour les filtres
    const availableTypes = [
      "Tous",
      "Single",
      "EP",
      "Album",
      "Compil",
      "Placement Synchro & Pub",
      "Promo & Marketing",
      "Events"
    ] as const
  
    // Fonction pour déterminer le nombre d'éléments à afficher selon la taille d'écran
    const getDisplayCount = () => {
      if (typeof window !== 'undefined') {
        if (window.matchMedia('(max-width: 767px)').matches) return 4
        return 6
      }
      return 6
    }
  
    // Filtrage des réalisations
    const filteredRealisations = realisations
      .filter(realisation => selectedType === "Tous" || realisation.type === selectedType)
      .slice(0, getDisplayCount())
  
    if (!isMounted) return null
  
    return (
      <section className="relative min-h-screen bg-zinc-950 py-4 sm:py-6 md:py-12 lg:py-24">
        {/* Arrière-plan avec motif visuel */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FF0000,transparent_50%)] opacity-[0.015]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#000000_90%)]" />
        </div>
  
        <div className="container relative mx-auto px-2 sm:px-4">
          {/* En-tête avec animation */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-2"
            >
              <span className="inline-block text-red-500 text-xs sm:text-sm font-medium tracking-wider uppercase">
                Notre expertise
              </span>
              <h2 className="text-center text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white px-2">
                RÉALISATIONS <span className="text-red-500">&</span> PROJETS
              </h2>
            </motion.div>
          </div>
  
          {/* Bouton toggle filtres mobile */}
          <div className="md:hidden mb-4 px-2">
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="w-full rounded-lg bg-zinc-900/80 backdrop-blur-sm px-4 py-2.5 text-sm text-white border border-zinc-800"
            >
              Filtrer par type {isFilterVisible ? '▼' : '▲'}
            </button>
          </div>
  
          {/* Filtres avec layout adaptatif */}
          <div className={`mb-6 sm:mb-8 space-y-4 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
            <div className="sm:flex sm:flex-wrap sm:justify-center">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 px-2 sm:flex sm:flex-wrap sm:gap-2 sm:justify-center sm:px-0">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`
                      rounded-md border px-3 py-2 text-xs 
                      sm:px-6 sm:text-sm 
                      whitespace-nowrap transition-all duration-300
                      ${selectedType === type
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-zinc-800 bg-black/50 text-zinc-400 hover:border-zinc-700 hover:bg-black"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Grille des réalisations */}
          <div className={`
            flex flex-col md:grid md:grid-cols-3 
            gap-4 md:gap-6 
            px-2 sm:px-0
          `}>
            {filteredRealisations.map((realisation, index) => (
              <motion.div
                key={realisation.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`
                  group relative overflow-hidden
                  rounded-xl 
                  h-[180px] xs:h-[200px] md:h-auto md:aspect-[4/5]
                  bg-black/20 backdrop-blur-sm
                  border border-zinc-800/50
                  transition-all duration-300
                  hover:border-zinc-700/70
                  ${index === 0 && 'md:col-span-2 md:aspect-[2/1]'}
                `}
              >
                <div className="relative h-full w-full">
                  <Link href={`/realisations/${realisation.slug}`} className="block h-full w-full">
                    <Image
                      src={realisation.image}
                      alt={realisation.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                      priority={realisation.id <= 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                      {/* En-tête de la carte */}
                      <div className="space-y-2">
                        <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 backdrop-blur-sm">
                          {realisation.type}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white">
                          {realisation.title}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {realisation.description}
                        </p>
                      </div>
  
                      {/* Pied de la carte */}
                      <div>
                        {/* Statistiques */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {realisation.stats.views && (
                            <div className="flex items-center gap-1.5">
                              <Eye size={14} className="text-red-500" />
                              <span className="text-xs text-zinc-400">{realisation.stats.views} vues</span>
                            </div>
                          )}
                          {realisation.stats.duration && (
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-red-500" />
                              <span className="text-xs text-zinc-400">{realisation.stats.duration}</span>
                            </div>
                          )}
                          {realisation.stats.awards && (
                            <div className="flex items-center gap-1.5">
                              <Award size={14} className="text-red-500" />
                              <span className="text-xs text-zinc-400">{realisation.stats.awards}</span>
                            </div>
                          )}
                        </div>
  
                        {/* Informations artiste et date */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Music size={14} className="text-red-500" />
                            <span className="text-sm font-medium text-white">{realisation.artist}</span>
                          </div>
                          <span className="text-xs text-zinc-500">{realisation.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* Bouton "Voir plus" */}
          <div className="mt-8 md:mt-12 px-4 sm:px-0">
            <Link
              href="/realisations"
              className="group flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-black/50 px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium text-white transition-all hover:bg-black hover:border-zinc-700 mx-auto max-w-[240px] w-full md:w-auto"
            >
              <span>Explorer toutes nos réalisations</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    )
  }
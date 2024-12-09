"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube } from "react-icons/si"
import { BiLogoDeezer } from "react-icons/bi"
import { ArrowUpRight } from "lucide-react"

interface Artist {
  id: number
  name: string
  slug: string
  genre: "Rap" | "Pop Urbaine" | "Shatta"
  image: string
  lastRelease: string
  releaseDate: string
  socials: {
    spotify?: string
    deezer?: string
    appleMusic?: string
    instagram?: string
    youtube?: string
  }
  contract: "Label" | "Distribution" | "Licence" | "Edition" | "Management"
}

const artists: Artist[] = [
  {
    id: 1,
    name: "LASHKA",
    slug: "lashka",
    genre: "Rap",
    image: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg",
    lastRelease: "Burn Out",
    releaseDate: "2024",
    socials: {
      instagram: "#",
      youtube: "#",
      spotify: "#",
      deezer: "#",
      appleMusic: "#"
    },
    contract: "Label"
  },
  {
    id: 2,
    name: "MAES",
    slug: "maes",
    genre: "Rap",
    image: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
    lastRelease: "Nuit Rouge",
    releaseDate: "2024",
    socials: {
      spotify: "#",
      deezer: "#",
      appleMusic: "#"
    },
    contract: "Distribution"
  },
  {
    id: 3,
    name: "KEYZAH",
    slug: "keyzah",
    genre: "Pop Urbaine",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
    lastRelease: "Faya",
    releaseDate: "2023",
    socials: {
      instagram: "#",
      youtube: "#",
      spotify: "#",
      deezer: "#"
    },
    contract: "Label"
  },
  {
    id: 4,
    name: "DENZO",
    slug: "denzo",
    genre: "Shatta",
    image: "https://toutelaculture.com/wp-content/uploads/2021/07/1.jpg",
    lastRelease: "Contact",
    releaseDate: "2024",
    socials: {
      spotify: "#",
      deezer: "#",
      instagram: "#"
    },
    contract: "Distribution"
  },
  {
    id: 5,
    name: "NORAJ",
    slug: "noraj",
    genre: "Rap",
    image: "https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg",
    lastRelease: "Atmosphère",
    releaseDate: "2024",
    socials: {
      spotify: "#",
      deezer: "#",
      appleMusic: "#"
    },
    contract: "Label"
  },
  {
    id: 6,
    name: "LYNA",
    slug: "lyna",
    genre: "Pop Urbaine",
    image: "https://images.pexels.com/photos/2889943/pexels-photo-2889943.jpeg",
    lastRelease: "Miroir",
    releaseDate: "2024",
    socials: {
      instagram: "#",
      spotify: "#",
      deezer: "#"
    },
    contract: "Edition"
  },
  {
    id: 7,
    name: "SKYZO",
    slug: "skyzo",
    genre: "Rap",
    image: "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg",
    lastRelease: "Night Call",
    releaseDate: "2024",
    socials: {
      spotify: "#",
      deezer: "#",
      youtube: "#"
    },
    contract: "Edition"
  },
  {
    id: 8,
    name: "MILA",
    slug: "mila",
    genre: "Pop Urbaine",
    image: "https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg",
    lastRelease: "Horizon",
    releaseDate: "2024",
    socials: {
      instagram: "#",
      spotify: "#",
    },
    contract: "Management"
  },
  {
    id: 9,
    name: "RAYCE",
    slug: "rayce",
    genre: "Shatta",
    image: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg",
    lastRelease: "Energy",
    releaseDate: "2024",
    socials: {
      spotify: "#",
      deezer: "#",
      youtube: "#"
    },
    contract: "Label"
  },
  {
    id: 10,
    name: "ZYNA",
    slug: "zyna",
    genre: "Pop Urbaine",
    image: "https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg",
    lastRelease: "Destiny",
    releaseDate: "2024",
    socials: {
      instagram: "#",
      spotify: "#",
      deezer: "#",
      appleMusic: "#"
    },
    contract: "Distribution"
  }
]

const SocialIcon = ({
  platform,
  link,
  size = 16
}: {
  platform: string
  link: string
  size?: number
}) => {
  const icons = {
    spotify: SiSpotify,
    deezer: BiLogoDeezer,
    appleMusic: SiApplemusic,
    instagram: SiInstagram,
    youtube: SiYoutube
  }

  const Icon = icons[platform as keyof typeof icons]
  if (!Icon) return null

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon size={size} />
    </a>
  )
}

export default function Artists() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState<string>("Tous")
  const [selectedContract, setSelectedContract] = useState<string>("Tous")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false) // État pour le menu mobile

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const availableGenres = ["Tous", ...Array.from(
    artists.reduce((acc: string[], artist) => {
      if (!acc.includes(artist.genre)) {
        acc.push(artist.genre)
      }
      return acc
    }, [])
  )]

  const availableContracts = ["Tous", ...Array.from(
    artists.reduce((acc: string[], artist) => {
      if (!acc.includes(artist.contract)) {
        acc.push(artist.contract)
      }
      return acc
    }, [])
  )]

  const filteredArtists = artists
    .filter(artist => {
      const genreMatch = selectedGenre === "Tous" || artist.genre === selectedGenre
      const contractMatch = selectedContract === "Tous" || artist.contract === selectedContract
      return genreMatch && contractMatch
    })
    .slice(0, 6)

  if (!isMounted) return null

// Ajustons la fonction getDisplayCount pour mieux correspondre à notre nouvelle mise en page
const getDisplayCount = () => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(max-width: 375px)').matches) return 2 // iPhone SE
      if (window.matchMedia('(max-width: 640px)').matches) return 3 // Petits mobiles
      if (window.matchMedia('(max-width: 768px)').matches) return 4 // Tablettes
      if (window.matchMedia('(max-width: 1024px)').matches) return 6 // Petits écrans
      return 6 // Grands écrans
    }
    return 6
  }
  
  
  return (
    <section className="relative min-h-screen bg-black py-4 sm:py-6 md:py-12 lg:py-24">
      {/* Arrière-plan avec dégradé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#FF0000,transparent_70%)] opacity-[0.02] sm:opacity-[0.03]" />
      </div>
  
      <div className="container relative mx-auto px-2 sm:px-4">
        {/* En-tête avec titre adaptatif */}
        <div className="mb-4 sm:mb-6 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white px-2"
          >
            NOS <span className="text-red-500">ARTISTES</span>
          </motion.h2>
        </div>
  
        {/* Section des filtres optimisée pour mobile et desktop */}
        <div className="mb-6 space-y-4">
          {/* Filtres par genre */}
          {availableGenres.length > 1 && (
            <div className="sm:flex sm:flex-wrap sm:justify-center">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 px-2 sm:flex sm:flex-wrap sm:gap-2 sm:justify-center sm:px-0">
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`
                      rounded-full px-3 py-2 text-xs 
                      sm:px-6 sm:text-sm 
                      whitespace-nowrap transition-all duration-300
                      ${selectedGenre === genre
                        ? "bg-red-500 text-white"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                      }
                    `}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
  
          {/* Filtres par type de contrat */}
          {availableContracts.length > 1 && (
            <div className="sm:flex sm:flex-wrap sm:justify-center">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 px-2 sm:flex sm:flex-wrap sm:gap-2 sm:justify-center sm:px-0">
                {availableContracts.map((contract) => (
                  <button
                    key={contract}
                    onClick={() => setSelectedContract(contract)}
                    className={`
                      rounded-full border-2 px-3 py-2 text-xs
                      sm:px-6 sm:text-sm
                      whitespace-nowrap transition-all duration-300
                      ${selectedContract === contract
                        ? "border-red-500 text-white"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                      }
                    `}
                  >
                    {contract}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
  
        {/* Grille d'artistes avec transition vertical/horizontal */}
        <div className={`
          flex flex-col md:grid md:grid-cols-3 
          gap-3 md:gap-4 
          px-2 sm:px-0
        `}>
          {filteredArtists.slice(0, window?.innerWidth < 768 ? 4 : 6).map((artist) => (
            <motion.div
              key={artist.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="group relative overflow-hidden rounded-lg h-[160px] md:h-auto md:aspect-square"
            >
              <div className="relative h-full w-full">
                <Link href={`/artistes/${artist.slug}`} className="block h-full w-full">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={artist.id <= 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 sm:opacity-60" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-row md:flex-col gap-2 md:gap-1.5">
                        <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-light text-red-500 backdrop-blur-sm">
                          {artist.genre}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-light text-white backdrop-blur-sm">
                          {artist.contract}
                        </span>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-white/10 p-1.5 md:p-2 backdrop-blur-sm"
                      >
                        <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </motion.div>
                    </div>
  
                    <div>
                      <h3 className="text-lg md:text-xl font-light text-white mb-0.5">
                        {artist.name}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400">
                        {artist.lastRelease} · {artist.releaseDate}
                      </p>
  
                      <div className="mt-2 flex gap-2 opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {Object.entries(artist.socials).map(([platform, link]) => (
                          <SocialIcon 
                            key={platform} 
                            platform={platform} 
                            link={link}
                            size={14}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* Bouton "Voir tous" avec style adaptatif */}
        <div className="mt-6 md:mt-8 px-4 sm:px-0">
          <Link
            href="/artistes"
            className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 md:px-6 py-2.5 text-xs md:text-sm font-light text-white transition-colors hover:bg-zinc-800 mx-auto max-w-[200px] w-full md:w-auto"
          >
            <span>Voir tous nos artistes</span>
            <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
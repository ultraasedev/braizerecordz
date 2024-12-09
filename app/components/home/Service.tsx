"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Play, Calendar, MapPin, ChevronRight, ChevronLeft } from "lucide-react"

// Types pour une meilleure organisation
interface Service {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  color: string // Pour la personnalisation de chaque service
}

// Services avec une identité visuelle unique pour chacun
const services: Service[] = [
  {
    id: 1,
    title: "LABEL",
    subtitle: "Production & Management",
    description: "Une approche personnalisée du développement artistique. Notre équipe d'experts vous accompagne à chaque étape de votre carrière pour maximiser votre potentiel et votre impact dans l'industrie.",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625",
    color: "#FF0000"
  },
  {
    id: 2,
    title: "STUDIO",
    subtitle: "Recording & Mix",
    description: "Des installations de pointe combinées à une expertise technique pointue. Nos studios sont conçus pour capturer votre son unique et donner vie à votre vision artistique.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    color: "#00C8FF"
  },
  {
    id: 3,
    title: "DISTRIBUTION",
    subtitle: "Digital & Physical",
    description: "Une stratégie de distribution globale adaptée à votre musique. Maximisez votre présence sur toutes les plateformes et touchez votre public cible avec précision.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    color: "#50FF00"
  }
]

// Configuration du festival avec données enrichies
const festivalInfo = {
  date: "15-17 AOÛT 2024",
  location: "PARIS UNDERGROUND",
  edition: "5ème ÉDITION",
  description: "LE PLUS GRAND RASSEMBLEMENT DE LA SCÈNE URBAINE UNDERGROUND",
  images: [
    {
      url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      alt: "Festival ambiance principale"
    },
    {
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      alt: "Performance live"
    },
    {
      url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      alt: "Vue du public"
    }
  ],
  lineup: {
    headliners: ["MAES", "LASHKA", "DENZO"],
    mainStage: ["KEYZAH", "NORAJ", "SKYZO"],
    discovery: ["+ 30 ARTISTES ÉMERGENTS"]
  },
  stats: {
    stages: 3,
    artists: "40+",
    attendees: "15,000+"
  }
}

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [direction, setDirection] = useState(0)
  const serviceContainerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Gestion du défilement horizontal pour les services
  const handleScroll = (direction: number) => {
    const newIndex = activeService + direction
    if (newIndex >= 0 && newIndex < services.length) {
      setDirection(direction)
      setActiveService(newIndex)
    }
  }

  // Rotation automatique des images du festival
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % festivalInfo.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Variants pour les animations Framer Motion
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Section Services avec défilement horizontal */}
      <div className="relative min-h-screen">
        {/* En-tête avec navigation */}
        <div className="absolute top-0 left-0 right-0 z-10 py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white">
                  NOS SERVICES
                </h2>
                <p className="text-sm text-zinc-500">
                  {activeService + 1} / {services.length}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleScroll(-1)}
                  disabled={activeService === 0}
                  className={`p-2 rounded-full ${
                    activeService === 0 ? 'text-zinc-600' : 'text-white hover:text-red-500'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleScroll(1)}
                  disabled={activeService === services.length - 1}
                  className={`p-2 rounded-full ${
                    activeService === services.length - 1 ? 'text-zinc-600' : 'text-white hover:text-red-500'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carrousel de services */}
        <div ref={serviceContainerRef} className="relative h-screen">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeService}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex items-center"
            >
              {/* Service actif */}
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Contenu */}
                  <div className="relative z-10">
                    {/* Numéro en arrière-plan */}
                    <div 
                      className="absolute -top-20 -left-8 text-[12rem] font-bold opacity-5"
                      style={{ color: services[activeService].color }}
                    >
                      {String(services[activeService].id).padStart(2, '0')}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white">
                        {services[activeService].title}
                      </h3>
                      <p className="text-xl text-zinc-400">
                        {services[activeService].subtitle}
                      </p>
                      <p className="text-base text-zinc-500 max-w-xl">
                        {services[activeService].description}
                      </p>
                      <button className="group flex items-center gap-2 text-white hover:text-red-500 transition-colors">
                        <span>Explorer</span>
                        <ArrowUpRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1 group-hover:translate-y--1" />
                      </button>
                    </motion.div>
                  </div>
                  
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{ 
                        background: `linear-gradient(45deg, ${services[activeService].color}50, transparent)`
                      }} 
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Section Festival */}
      <div className="relative min-h-screen bg-zinc-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#FF0000,transparent_70%)] opacity-[0.03]" />
        
        {/* Container principal */}
        <div className="container mx-auto px-4">
          {/* En-tête Festival */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-16 md:mb-24"
          >
            <span className="inline-block text-red-500 text-sm font-medium mb-4">
              {festivalInfo.edition}
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6">
              UNDERGROUND
              <br />
              <span className="text-red-500">FEST</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              {festivalInfo.description}
            </p>
          </motion.div>

          {/* Grille principale */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Informations Festival */}
            <div className="space-y-12">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(festivalInfo.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-light text-white mb-2">
                      {value}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Informations pratiques */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-zinc-400">{festivalInfo.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="text-zinc-400">{festivalInfo.location}</span>
                </div>
              </div>

              {/* Line-up */}
              <div className="space-y-6">
                <h3 className="text-white text-xl">LINE-UP</h3>
                <div className="space-y-4">
                  {/* Headliners */}
                  <div>
                    <h4 className="text-zinc-500 text-sm mb-2">TÊTES D'AFFICHE</h4>
                    <div className="flex flex-wrap gap-2">
                      {festivalInfo.lineup.headliners.map((artist) => (
                        <span
                          key={artist}
                          className="px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Stage */}
                  <div>
                    <h4 className="text-zinc-500 text-sm mb-2">MAIN STAGE</h4>
                    <div className="flex flex-wrap gap-2">
                      {festivalInfo.lineup.mainStage.map((artist) => (
                        <span
                          key={artist}
                          className="px-4 py-2 rounded-full bg-zinc-900 text-zinc-400 text-sm"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Discovery */}
                  <div className="flex flex-wrap gap-2">
                    {festivalInfo.lineup.discovery.map((text) => (
                      <span
                        key={text}
                        className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="group flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors">
                <Play className="w-5 h-5" />
                <span>Découvrir le festival</span>
                <ArrowUpRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>

            {/* Galerie d'images */}
            <div className="relative aspect-[3/4] md:aspect-square">
              <AnimatePresence mode="wait">
                {festivalInfo.images.map((image, index) => (
                  index === activeImage && (
                    <motion.div
                    key={image.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay avec dégradé */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                    </div>
                    
                    {/* Indicateurs de navigation */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {festivalInfo.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`
                            h-1 rounded-full transition-all duration-300
                            ${idx === activeImage 
                              ? 'w-8 bg-red-500' 
                              : 'w-4 bg-white/50 hover:bg-white/75'
                            }
                          `}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>
)
}

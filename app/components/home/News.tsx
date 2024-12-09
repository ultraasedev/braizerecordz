"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Tag, Eye } from "lucide-react"

// Types pour la gestion des actualités
type NewsCategory = "Actualités" | "Sorties" | "Events" | "Interviews" | "Annonces"

interface NewsArticle {
  id: number
  title: string
  slug: string
  category: NewsCategory
  image: string
  date: string
  readTime: string
  views: string
  excerpt: string
  featured?: boolean
}

// Données des actualités
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "MAES enflamme le Red Bull Sound Tour devant 15 000 personnes",
    slug: "maes-red-bull-sound-tour",
    category: "Events",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    date: "20 Mars 2024",
    readTime: "3 min",
    views: "1.2K",
    excerpt: "Retour sur la performance explosive de MAES lors de sa tournée événement...",
    featured: true
  },
  {
    id: 2,
    title: "LASHKA dévoile les coulisses de son prochain album",
    slug: "lashka-coulisses-album",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    date: "18 Mars 2024",
    readTime: "5 min",
    views: "856",
    excerpt: "Interview exclusive : LASHKA nous parle de son processus créatif..."
  },
  {
    id: 3,
    title: "Le label signe un partenariat majeur avec Spotify",
    slug: "partenariat-spotify",
    category: "Annonces",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41",
    date: "15 Mars 2024",
    readTime: "4 min",
    views: "2.3K",
    excerpt: "Une collaboration stratégique pour promouvoir les artistes émergents..."
  },
  {
    id: 4,
    title: "'Atmosphère' de NORAJ certifié disque d'or",
    slug: "noraj-disque-or",
    category: "Actualités",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    date: "12 Mars 2024",
    readTime: "2 min",
    views: "1.5K",
    excerpt: "L'album phénomène franchit la barre des 50 000 ventes..."
  },
  {
    id: 5,
    title: "KEYZAH annonce son EP surprise 'Eclipse'",
    slug: "keyzah-ep-surprise",
    category: "Sorties",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
    date: "10 Mars 2024",
    readTime: "3 min",
    views: "945",
    excerpt: "L'artiste révèle un projet inattendu prévu pour la fin du mois..."
  },
  {
    id: 6,
    title: "Le Festival Urban Wave dévoile sa programmation",
    slug: "festival-urban-wave-programmation",
    category: "Events",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    date: "8 Mars 2024",
    readTime: "4 min",
    views: "3.1K",
    excerpt: "Découvrez les artistes qui enflammeront la scène cet été..."
  }
]

export default function News() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<"Tous" | NewsCategory>("Tous")
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Liste des catégories disponibles
  const categories = ["Tous", "Actualités", "Sorties", "Events", "Interviews", "Annonces"]

  // Filtrage des articles
  const filteredArticles = newsArticles
    .filter(article => selectedCategory === "Tous" || article.category === selectedCategory)

  if (!isMounted) return null

  return (
    <section className="relative bg-black py-4 sm:py-6 md:py-12 lg:py-24">
      {/* Arrière-plan avec effet de dégradé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF0000,transparent_70%)] opacity-[0.02]" />
      </div>
  
      <div className="container relative mx-auto px-2 sm:px-4">
        {/* En-tête de section */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <span className="inline-block text-red-500 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Actualités
            </span>
            <h2 className="text-center text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white px-2">
              LES <span className="text-red-500">NEWS</span>
            </h2>
          </motion.div>
        </div>
  
        {/* Bouton filtres version mobile */}
        <div className="md:hidden mb-4 px-2">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="w-full rounded-lg bg-zinc-900/80 backdrop-blur-sm px-4 py-2.5 text-sm text-white border border-zinc-800"
          >
            Filtrer par catégorie {isFilterVisible ? '▼' : '▲'}
          </button>
        </div>
  
        {/* Filtres par catégories */}
        <div className={`mb-6 sm:mb-8 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
          <div className="flex overflow-x-auto md:justify-center pb-2 md:pb-0">
            <div className="flex gap-2 px-2 md:px-0 min-w-min">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as "Tous" | NewsCategory)}
                  className={`
                    whitespace-nowrap rounded-md border px-4 py-2 text-xs md:text-sm
                    transition-all duration-300
                    ${selectedCategory === category
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Grille d'articles */}
        <div className="px-2 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* 4 premiers articles */}
            {filteredArticles.slice(0, 4).map((article, index) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="
                  relative overflow-hidden rounded-xl 
                  aspect-[4/5]
                  bg-zinc-900/30 backdrop-blur-sm
                  border border-zinc-800/50 
                  transition-all duration-300 
                  hover:border-zinc-700
                  group
                "
              >
                <Link href={`/actualites/${article.slug}`} className="block h-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index <= 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
  
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <span className="inline-flex items-center self-start rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500 backdrop-blur-sm">
                        {article.category}
                      </span>
  
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-white line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 hidden sm:block">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{article.readTime}</span>
                          </div>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
  
            {/* Article principal */}
            {filteredArticles.slice(4, 5).map((article) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="
                  relative overflow-hidden rounded-xl 
                  aspect-[16/9] md:aspect-[4/5] lg:aspect-[16/9]
                  bg-zinc-900/30 backdrop-blur-sm
                  border border-zinc-800/50 
                  transition-all duration-300 
                  hover:border-zinc-700
                  group
                  md:col-span-2 lg:col-span-4
                "
              >
                <Link href={`/actualites/${article.slug}`} className="block h-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
  
                    <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs md:text-sm font-medium text-red-500 backdrop-blur-sm">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{article.views} vues</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
  
                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white">
                          {article.title}
                        </h3>
                        <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-500">{article.date}</span>
                          <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:text-red-500 transition-colors">
                            Lire l'article
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
  
        {/* Bouton voir plus */}
        <div className="mt-8 md:mt-12 px-4 sm:px-0">
          <Link
            href="/actualites"
            className="group flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-black/50 px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium text-white transition-all hover:bg-black hover:border-zinc-700 mx-auto max-w-[240px] w-full md:w-auto"
          >
            <span>Voir toutes les actualités</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
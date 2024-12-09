"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Artist } from "@/app/types/artist"
import { SiSpotify, SiApplemusic, SiInstagram, SiYoutube } from "react-icons/si"
import { BiLogoDeezer } from "react-icons/bi"

interface ArtistCardProps {
  artist: Artist
}

const SocialIcon = ({
  platform,
  link,
  size = 14
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
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(link, "_blank")
      }}
    >
      <Icon size={size} />
    </a>
  )
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group relative h-[160px] md:h-auto md:aspect-square overflow-hidden rounded-lg"
    >
      <Link href={`/artistes/${artist.slug}`} className="block h-full w-full relative">
        <Image
          src={artist.images.cover}
          alt={artist.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 sm:opacity-60" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
              <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] xs:text-xs font-light text-red-500 backdrop-blur-sm">
                {artist.genre}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] xs:text-xs font-light text-white backdrop-blur-sm">
                {artist.contract}
              </span>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="rounded-full bg-white/10 p-1.5 sm:p-2 backdrop-blur-sm"
            >
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </motion.div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-light text-white mb-0.5">
              {artist.name}
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400">
              {artist.latestRelease?.title} 
            </p>

            <div className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {Object.entries(artist.socials).map(([platform, link]) => (
                <SocialIcon 
                  key={platform} 
                  platform={platform} 
                  link={link}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { artists } from "../../../app/data/artist"
import ArtistCard from "./ArtistCard"
import { Artist } from "@/app/types/artist"

export default function ArtistsPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("Tous")
  const [selectedContract, setSelectedContract] = useState<string>("Tous")

  const availableGenres = ["Tous", ...Array.from(
    new Set(artists.map((artist: { genre: any }) => artist.genre))
  )]

  const availableContracts = ["Tous", ...Array.from(
    new Set(artists.map((artist: { contract: any }) => artist.contract))
  )]

  const filteredArtists = artists.filter((artist: { genre: string; contract: string }) => {
    const genreMatch = selectedGenre === "Tous" || artist.genre === selectedGenre
    const contractMatch = selectedContract === "Tous" || artist.contract === selectedContract
    return genreMatch && contractMatch
  })

  return (
    <section className="relative min-h-screen bg-black py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#FF0000,transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white">
            NOS <span className="text-red-500">ARTISTES</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Découvrez tous les talents du label BraizeRecords,
            des artistes émergents aux plus confirmés.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Genre Filter */}
          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center pb-2 sm:pb-0">
            <div className="flex sm:flex-wrap gap-2 px-2 sm:px-0 min-w-min">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-4 sm:px-6 py-2 text-sm whitespace-nowrap transition-all ${
                    selectedGenre === genre
                      ? "bg-red-500 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Contract Filter */}
          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center pb-2 sm:pb-0">
            <div className="flex sm:flex-wrap gap-2 px-2 sm:px-0 min-w-min">
              {availableContracts.map((contract) => (
                <button
                  key={contract}
                  onClick={() => setSelectedContract(contract)}
                  className={`rounded-full border px-4 sm:px-6 py-2 text-sm whitespace-nowrap transition-all ${
                    selectedContract === contract
                      ? "border-red-500 text-white"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {contract}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArtists.map((artist: Artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  )
}

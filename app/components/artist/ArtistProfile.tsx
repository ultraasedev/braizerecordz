// components/artist/ArtistProfile.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Artist, SocialMedia, StreamingPlatform } from "@/app/types/artist";
import {
  CalendarDays,
  Download,
  Play,
  Pause,
  ChevronDown,
  Clock,
  Share2,
  ExternalLink,
} from "lucide-react";
import {
  SiSpotify,
  SiApplemusic,
  SiNapster,
  SiYoutubemusic,
  SiTidal,
  SiFacebook,
  SiInstagram,
  SiX,
  SiTiktok,
} from "react-icons/si";
import { BiLogoDeezer } from "react-icons/bi";
import { toast } from "sonner";

type StreamingIconType = {
  [K in keyof Required<StreamingPlatform>]:
    | typeof SiSpotify
    | typeof BiLogoDeezer;
};

type SocialIconType = {
  [K in keyof Required<SocialMedia>]: typeof SiFacebook;
};

interface ArtistProfileProps {
  artist: Artist;
}

export default function ArtistProfile({ artist }: ArtistProfileProps) {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(artist.latestRelease?.id);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mappings des icônes avec types corrects
  const streamingIcons: StreamingIconType = {
    spotify: SiSpotify,
    appleMusic: SiApplemusic,
    deezer: BiLogoDeezer,
    napster: SiNapster,
    youtubeMusic: SiYoutubemusic,
    tidal: SiTidal,
  };

  const socialIcons: SocialIconType = {
    facebook: SiFacebook,
    instagram: SiInstagram,
    x: SiX,
    tiktok: SiTiktok,
  };
  // Ajoutez la fonction handleShare ici
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${artist.name} - BraizeRecords`,
          text: artist.biography.short,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse-papier");
      }
    } catch (error) {
      toast.error("Erreur lors du partage");
    }
  };

  // Ajoutez l'useEffect ici
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isPlaying && activeTrack) {
        audioRef.current.play();
      }
    }
  }, [isPlaying, activeTrack]);

  // Événements à venir uniquement
  const upcomingEvents = artist.events.filter(
    (event) => event.status === "upcoming"
  );

  // Album actuellement sélectionné
  const currentAlbum = artist.discography.find(
    (album) => album.id === selectedAlbum
  );

  const currentTrack = currentAlbum?.tracks?.find(
    (track) => track.id === activeTrack
  );

  return (
    <div className="relative min-h-screen bg-black">
      <audio
        ref={audioRef}
        src={currentTrack?.preview}
        onEnded={() => {
          setIsPlaying(false);
          setActiveTrack(null);
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src={artist.images.cover}
            alt={artist.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        {/* Contenu Hero */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-lg overflow-hidden">
                <Image
                  src={artist.images.profile}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-500">
                    {artist.genre}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white">
                    {artist.contract}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {artist.name}
                </h1>

                <div className="flex flex-wrap gap-6 text-zinc-400 text-sm">
                  {artist.stats.monthlyListeners && (
                    <div>
                      <span className="block text-lg sm:text-xl text-white">
                        {artist.stats.monthlyListeners}
                      </span>
                      <span>Auditeurs mensuels</span>
                    </div>
                  )}
                  {artist.stats.followers && (
                    <div>
                      <span className="block text-lg sm:text-xl text-white">
                        {artist.stats.followers}
                      </span>
                      <span>Followers</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                {currentAlbum?.streamingLinks.spotify && (
                  <a
                    href={currentAlbum.streamingLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors text-center"
                  >
                    Écouter
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors"
                  aria-label="Partager"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Principale */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section Biographie */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Biographie
              </h2>
              <div className="relative">
                <div
                  className={`text-zinc-300 space-y-4 overflow-hidden transition-all duration-300 ${
                    showFullBio ? "" : "max-h-48"
                  }`}
                >
                  <p className="text-sm sm:text-base">
                    {artist.biography.full}
                  </p>
                </div>
                {!showFullBio && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
                )}
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-sm"
                >
                  <span>{showFullBio ? "Voir moins" : "Voir plus"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      showFullBio ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </section>

            {/* Section Discographie */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Discographie
              </h2>
              <div className="flex gap-4 mb-8 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
                {artist.discography.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => setSelectedAlbum(album.id)}
                    className={`flex-shrink-0 relative group ${
                      selectedAlbum === album.id ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
                      <Image
                        src={album.coverArt}
                        alt={album.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm sm:text-base text-white font-medium truncate">
                        {album.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {album.releaseDate}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {currentAlbum?.tracks && (
                <div className="space-y-2">
                  {currentAlbum.tracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors group"
                    >
                    <button
                onClick={() => {
                  const newTrackId = activeTrack === track.id ? null : track.id;
                  setActiveTrack(newTrackId);
                  setIsPlaying(newTrackId !== null);
                }}
                className="flex-shrink-0 p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label={isPlaying && activeTrack === track.id ? "Pause" : "Play"}
              >
                        {isPlaying && activeTrack === track.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {track.title}
                          {track.featuring && (
                            <span className="text-zinc-400 text-sm ml-2">
                              feat. {track.featuring.join(", ")}
                            </span>
                          )}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-500 hidden sm:block">
                          {track.duration}
                        </span>
                        <div className="flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          {Object.entries(track.streamingLinks).map(
                            ([platform, url]) => {
                              const Icon =
                                streamingIcons[
                                  platform as keyof typeof streamingIcons
                                ];
                              if (!url || !Icon) return null;
                              return (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                  aria-label={`Écouter sur ${platform}`}
                                >
                                  <Icon className="w-4 h-4 text-white" />
                                </a>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Section Événements */}
            {upcomingEvents.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Prochaines dates
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 sm:p-6 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-medium text-white">
                            {event.title}
                          </h3>
                          <p className="text-zinc-400 text-sm sm:text-base mt-1">
                            {event.venue} - {event.city}, {event.country}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-1">
                          <p className="text-red-500 font-medium order-2 sm:order-1">
                            {event.date}
                          </p>
                          <p className="text-sm text-zinc-500 order-1 sm:order-2">
                            {event.type}
                          </p>
                        </div>
                      </div>
                      {event.ticketUrl && (
                        <div className="mt-4">
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                          >
                            <span>Réserver</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                      {event.price && (
                        <p className="mt-2 text-sm text-zinc-400">
                          À partir de {event.price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {/* Réseaux sociaux */}
            <div className="p-4 sm:p-6 rounded-lg bg-zinc-900/50">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Suivre
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(artist.socials).map(([platform, url]) => {
                  const Icon =
                    socialIcons[platform as keyof typeof socialIcons];
                  if (!url || !Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-sm text-white group-hover:text-red-500 transition-colors">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Kit de presse */}
            <div className="p-4 sm:p-6 rounded-lg bg-zinc-900/50">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Kit de presse
              </h3>
              <div className="space-y-3">
                <a
                  href={artist.pressKit.bioFr}
                  download
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                >
                  <span className="text-sm text-white group-hover:text-red-500 transition-colors">
                    Biographie FR
                  </span>
                  <Download className="w-4 h-4 text-red-500" />
                </a>
                {artist.pressKit.bioEn && (
                  <a
                    href={artist.pressKit.bioEn}
                    download
                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                  >
                    <span className="text-sm text-white group-hover:text-red-500 transition-colors">
                      Biography EN
                    </span>
                    <Download className="w-4 h-4 text-red-500" />
                  </a>
                )}

                <a
                  href={artist.pressKit.technicalRider}
                  download
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                >
                  <span className="text-sm text-white group-hover:text-red-500 transition-colors">
                    Fiche technique
                  </span>
                  <Download className="w-4 h-4 text-red-500" />
                </a>

                {/* Photos de presse */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {artist.pressKit.photos.map((photo, index) => (
                    <a
                      key={index}
                      href={photo}
                      download
                      className="aspect-square relative rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={photo}
                        alt={`${artist.name} - Photo presse ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Récompenses */}
            {artist.awards && artist.awards.length > 0 && (
              <div className="p-4 sm:p-6 rounded-lg bg-zinc-900/50">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Récompenses
                </h3>
                <div className="space-y-4">
                  {artist.awards.map((award, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-base text-white font-medium">
                        {award.title}
                      </div>
                      {award.category && (
                        <div className="text-sm text-zinc-400">
                          {award.category}
                        </div>
                      )}
                      <div className="text-xs text-zinc-500">{award.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles et interviews */}
            {artist.features && artist.features.length > 0 && (
              <div className="p-4 sm:p-6 rounded-lg bg-zinc-900/50">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Dans les médias
                </h3>
                <div className="space-y-4">
                  {artist.features.map((feature, index) => (
                    <a
                      key={index}
                      href={feature.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block space-y-1 group"
                    >
                      <div className="text-white group-hover:text-red-500 transition-colors">
                        {feature.title}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {feature.media}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {feature.date}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

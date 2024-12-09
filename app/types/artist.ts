// app/types/artist.ts
export type Genre = "Rap" | "Pop Urbaine" | "Shatta"
export type ContractType = "Label" | "Distribution" | "Licence" | "Edition" | "Management"

export interface StreamingPlatform {
  spotify?: string
  appleMusic?: string
  deezer?: string
  napster?: string
  youtubeMusic?: string
  tidal?: string
}

export interface SocialMedia {
  facebook?: string
  instagram?: string
  x?: string
  tiktok?: string
}

export interface Track {
  id: number
  title: string
  duration: string
  featuring?: string[]
  preview?: string
  streamingLinks: StreamingPlatform
}

export interface Album {
  id: number
  title: string
  releaseDate: string
  type: "Album" | "EP" | "Single"
  coverArt: string
  tracks?: Track[]
  streamingLinks: StreamingPlatform
}

export interface Event {
  id: number
  title: string
  date: string
  venue: string
  city: string
  country: string
  type: "Concert" | "Festival" | "Showcase"
  ticketUrl?: string
  price?: string
  status: "upcoming" | "past"
}

export interface PressKit {
  bioFr: string
  bioEn?: string
  photos: string[]
  logos: {
    light: string
    dark: string
  }
  technicalRider: string
  pressRelease?: string
}

export interface Artist {
  id: number
  name: string
  slug: string
  genre: Genre
  contract: ContractType
  images: {
    profile: string
    cover: string
    gallery: string[]
  }
  biography: {
    short: string
    full: string
  }
  discography: Album[]
  stats: {
    monthlyListeners?: string
    followers?: string
    views?: string
  }
  streaming: StreamingPlatform
  socials: SocialMedia
  pressKit: PressKit
  events: Event[]
  awards?: {
    year: number
    title: string
    category?: string
  }[]
  features?: {
    date: string
    title: string
    media: string
    url: string
  }[]
  latestRelease?: Album
}
import { notFound } from "next/navigation"
import ArtistProfile from "../../components/artist/ArtistProfile"
import { artists } from '../../../app/data/artist'
import type { Metadata } from 'next'
import Navbar from "@/app/components/layout/navbar"
import Footer from "@/app/components/layout/footer"

interface Props {
    params: {
      slug: string
    }
  }
  
  export function generateMetadata({ params }: Props): Metadata {
    const artist = artists.find((a) => a.slug === params.slug)
    if (!artist) return { title: 'Artiste non trouvé' }
  
    return {
      title: `${artist.name} - BraizeRecords`,
      description: `Découvrez ${artist.name} sur BraizeRecords - ${artist.genre}`,
    }
  }
  
  export function generateStaticParams() {
    return artists.map((artist) => ({
      slug: artist.slug,
    }))
  }
  
  export default function ArtistPage({ params }: Props) {
    const artist = artists.find((a) => a.slug === params.slug)
    
    if (!artist) {
      notFound()
    }
  
    return (
      <>
      <Navbar/>
       <ArtistProfile artist={artist} />
       <Footer/>
      </>
    )
   
  }